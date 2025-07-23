import os
import tempfile
import unittest
import json
import sqlite3
from app import app, init_db

class AppTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, self.db_path = tempfile.mkstemp()
        app.config['DATABASE'] = self.db_path
        app.config['TESTING'] = True
        self.client = app.test_client()
        with app.app_context():
            init_db()

    def tearDown(self):
        with app.app_context():
            sqlite3.connect(self.db_path).close()
        os.close(self.db_fd)
        os.unlink(self.db_path)

    def test_add_voucher_success(self):
        # Need to add accounts first
        self.client.post('/accounts', data=json.dumps({"account_code": "1001", "account_name": "Cash"}), content_type='application/json')
        self.client.post('/accounts', data=json.dumps({"account_code": "2001", "account_name": "Accounts Payable"}), content_type='application/json')

        voucher_data = {
            "voucher_date": "2024-07-22",
            "items": [
                {"account_id": 1, "summary": "Test", "debit_amount": 100, "credit_amount": 0},
                {"account_id": 2, "summary": "Test", "debit_amount": 0, "credit_amount": 100}
            ]
        }
        response = self.client.post('/vouchers', data=json.dumps(voucher_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Voucher added successfully', response.data)

    def test_add_voucher_unbalanced(self):
        voucher_data = {
            "voucher_date": "2024-07-22",
            "items": [
                {"account_id": 1, "summary": "Test", "debit_amount": 100, "credit_amount": 0},
                {"account_id": 2, "summary": "Test", "debit_amount": 0, "credit_amount": 50}
            ]
        }
        response = self.client.post('/vouchers', data=json.dumps(voucher_data), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Debit and credit amounts do not balance', response.data)

    def test_add_account(self):
        account_data = {"account_code": "1001", "account_name": "Cash"}
        response = self.client.post('/accounts', data=json.dumps(account_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Account created successfully', response.data)

    def test_get_accounts(self):
        # Add an account to get
        self.client.post('/accounts', data=json.dumps({"account_code": "1001", "account_name": "Cash"}), content_type='application/json')
        response = self.client.get('/accounts')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data['accounts']), 1)

    def test_add_customer(self):
        customer_data = {"name": "Test Customer", "type": "customer"}
        response = self.client.post('/customers', data=json.dumps(customer_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'Customer created successfully', response.data)

    def test_get_customers(self):
        # Add a customer to get
        self.client.post('/customers', data=json.dumps({"name": "Test Customer", "type": "customer"}), content_type='application/json')
        response = self.client.get('/customers')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data['customers']), 1)

if __name__ == '__main__':
    unittest.main()
