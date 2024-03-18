import React from "react"
import Addicon from "./Addicon"
import "../styles/stockinfo.scss"

const Stockinfo = ( { stock }) => {
  
  let priceChangeArrow;
  let priceChangeStatus;
  if (stock.price_change_percentage > 0 || stock.price_change_dollar > 0) {
    priceChangeArrow = "\u25B2";
    priceChangeStatus = "increase"
  } else if (stock.price_change_percentage < 0 || stock.price_change_dollar < 0) {
    priceChangeArrow = "\u25BC";
    priceChangeStatus = "decrease"
  } else {
    priceChangeArrow = "No change";
  }

  return (
    <div className="stock-info">
      <div className="stock-symbol">
        <p>{stock.ticker_symbol}</p>
        <Addicon />
      </div>
      <div className="stock-price"> 
        <p>${stock.price}</p>
      </div>
      <div className="price-change">
        <span>Updated: </span>
        <div className="price-dollar">
          <p className={stock.price_change_dollar > 0 || stock.price_change_percentage > 0 ? "positive" : "negative"}>
             {priceChangeArrow} <span>Today's Change:</span> ${stock.price_change_dollar} {priceChangeStatus}
          </p>
        </div>
        <div lassName="price-percentage">
          <p className={stock.price_change_dollar > 0 || stock.price_change_percentage > 0 ? "positive" : "negative"}>
            {priceChangeArrow} <span>Today's Change:</span> {stock.price_change_percentage}% {priceChangeStatus}
          </p>
        </div>
        <span>Volume: </span>
      </div>
    </div>
  );
}

export default Stockinfo;