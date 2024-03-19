INSERT INTO watchlists (user_id, ticker_symbol, created_at, updated_at, email_frequency) 
VALUES
  (1, 'AAPL', NOW(), NOW(), 'daily'),
  (1, 'MSFT', NOW(), NOW(), 'weekly'),
  (2, 'TSLA', NOW(), NOW(), 'monthly'),
  (3, 'WMT', NOW(), NOW(), 'weekly'),
  (3, 'CRM', NOW(), NOW(), 'monthly'),
  (4, 'INTC', NOW(), NOW(), 'daily'),
  (4, 'PYPL', NOW(), NOW(), 'monthly'),
  (5, 'NVDA', NOW(), NOW(), 'daily'),
  (5, 'AMZN', NOW(), NOW(), 'weekly'),
  (5,'MSFT', NOW(), NOW(), 'weekly');
