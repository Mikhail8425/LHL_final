DROP TABLE IF EXISTS stocks CASCADE;
CREATE TABLE stocks(
    id SERIAL PRIMARY KEY NOT NULL,
    ticker_symbol VARCHAR(255) NOT NULL,
    stock_name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    price_change_percentage INTEGER NOT NULL,
    price_change_dollar INTEGER NOT NULL,
    change BOOLEAN NOT NULL,
    category TEXT
);