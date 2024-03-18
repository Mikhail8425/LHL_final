import React from "react"
import Stockinfo from "./Stockinfo";
import "../styles/stock-list.scss"

const stockData = [
  {
    ticker_symbol: 'AAPL',
    stock_name: 'Apple Inc.',
    price: 150,
    price_change_percentage: 2,
    price_change_dollar: 3,
    change: true
  },
  {
    ticker_symbol: 'GOOGL',
    stock_name: 'Alphabet Inc.',
    price: 2800,
    price_change_percentage: 1,
    price_change_dollar: 30,
    change: false
  },
  {
    ticker_symbol: 'MSFT',
    stock_name: 'Microsoft Corporation',
    price: 300,
    price_change_percentage: -1,
    price_change_dollar: -5,
    change: true
  },
  {
    ticker_symbol: 'AMZN',
    stock_name: 'Amazon.com Inc.',
    price: 3300,
    price_change_percentage: 3,
    price_change_dollar: 100,
    change: false
  }
]

const Stocklist = () => {
  return (
    <ul className="stock-list">
      {stockData.map((stock, index) => (
        <Stockinfo key={index} stock={stock} />
      ))}
    </ul>
  );
};

export default Stocklist;