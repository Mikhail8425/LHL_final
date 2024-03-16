import React from "react";



const StockListItem = ({ stock }) => {
  return (
    <div className="stock-item">
      <h2>{stock.symbol}</h2>
      <p>Open: {stock.open}</p>
      <p>High: {stock.high}</p>
      <p>Low: {stock.low}</p>
      <p>Close: {stock.close}</p>
      <p>Volume: {stock.volume}</p>
      <p>From: {stock.from}</p>
      <p>preMarket: {stock.preMarket}</p>
      <p>Status: {stock.status}</p>
      <p>afterHours: {stock.afterHours}</p>
      {/* You can display other properties similarly */}
    </div>
  );
};

export default StockListItem;