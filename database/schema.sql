-- 凭证主表
CREATE TABLE voucher (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voucher_date DATE NOT NULL,
    voucher_number VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 凭证明细表
CREATE TABLE voucher_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voucher_id INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    summary VARCHAR(255) NOT NULL,
    debit_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    credit_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    FOREIGN KEY (voucher_id) REFERENCES voucher(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- 科目表
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_code VARCHAR(255) NOT NULL UNIQUE,
    account_name VARCHAR(255) NOT NULL,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES accounts(id)
);

-- 客户/供应商表
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL -- 'customer' or 'supplier'
);

-- 系统配置表
CREATE TABLE config (
    key VARCHAR(255) PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);
