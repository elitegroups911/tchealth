import sqlite3
from flask import Flask, request, g

DATABASE = 'database.db'

app = Flask(__name__)

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            DATABASE,
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

@app.teardown_appcontext
def close_connection(exception):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with app.open_resource('database/schema.sql', mode='r') as f:
        db.executescript(f.read())

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')

@app.route('/vouchers', methods=['POST'])
def add_voucher():
    # Basic implementation for adding a voucher
    # In a real application, you would get this data from the request
    # and perform validation.
    voucher_data = request.get_json()

    # Basic validation
    if not voucher_data or 'voucher_date' not in voucher_data or 'items' not in voucher_data:
        return {'error': 'Invalid voucher data'}, 400

    # Debit and credit balancing validation
    total_debit = sum(item.get('debit_amount', 0) for item in voucher_data['items'])
    total_credit = sum(item.get('credit_amount', 0) for item in voucher_data['items'])

    if total_debit != total_credit:
        return {'error': 'Debit and credit amounts do not balance'}, 400

    # In a real application, you would also perform automatic numbering,
    # date setting, and subject selection.

    # For now, just a success message
    return {'message': 'Voucher added successfully'}, 201

@app.route('/accounts', methods=['POST'])
def add_account():
    account_data = request.get_json()
    if not account_data or 'account_code' not in account_data or 'account_name' not in account_data:
        return {'error': 'Invalid account data'}, 400

    db = get_db()
    try:
        db.execute(
            "INSERT INTO accounts (account_code, account_name, parent_id) VALUES (?, ?, ?)",
            (account_data['account_code'], account_data['account_name'], account_data.get('parent_id'))
        )
        db.commit()
    except sqlite3.IntegrityError:
        return {'error': 'Account code already exists'}, 400

    return {'message': 'Account created successfully'}, 201

@app.route('/accounts', methods=['GET'])
def get_accounts():
    db = get_db()
    cursor = db.execute("SELECT * FROM accounts")
    accounts = cursor.fetchall()
    return {'accounts': [dict(row) for row in accounts]}

@app.route('/customers', methods=['POST'])
def add_customer():
    customer_data = request.get_json()
    if not customer_data or 'name' not in customer_data or 'type' not in customer_data:
        return {'error': 'Invalid customer data'}, 400

    db = get_db()
    try:
        db.execute(
            "INSERT INTO customers (name, type) VALUES (?, ?)",
            (customer_data['name'], customer_data['type'])
        )
        db.commit()
    except sqlite3.IntegrityError:
        return {'error': 'Customer name already exists'}, 400

    return {'message': 'Customer created successfully'}, 201

@app.route('/customers', methods=['GET'])
def get_customers():
    db = get_db()
    cursor = db.execute("SELECT * FROM customers")
    customers = cursor.fetchall()
    return {'customers': [dict(row) for row in customers]}


if __name__ == '__main__':
    app.run(debug=True)
