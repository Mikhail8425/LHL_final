INSERT INTO stocks (ticker_symbol, stock_name, price, price_change_percentage, price_change_dollar, change, category) 
VALUES
  ('AAPL', 'Apple Inc.', 150, 2, 3, true, 'TECH'),
  ('GOOGL', 'Alphabet Inc.', 2800, 1, 30, false, 'TECH'),
  ('MSFT', 'Microsoft Corporation', 300, -1, -5, true, 'TECH'),
  ('AMZN', 'Amazon.com Inc.', 3300, 3, 100, false, 'TECH'),
  ('NVDA', 'NVIDIA Corporation', 700, 2, 10, true, 'TECH'),
  ('PYPL', 'PayPal Holdings Inc.', 250, 3, 8, false, 'TECH'),
  ('INTC', 'Intel Corporation', 60, 1, 1, true, 'TECH'),
  ('CRM', 'Salesforce.com Inc.', 250, 4, 10, false, 'TECH'),
  ('WMT', 'Walmart Inc.', 150, 1, 2, true, 'RETAIL'),
  ('TSLA', 'Tesla Inc.', 700, 5, 35, true, 'TECH');