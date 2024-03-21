import React from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Addicon from "../Addicon"
import RemoveIcon from "../Removeicon";
import "../../styles/stockinfo.scss";

const StockListItem = ({ stock, onViewDetails, navigateToDetailsPage, addtoWatchList }) => {
  
  // Destructuring the stock object
  const { ticker, todaysChangePerc, todaysChange, updated, day, min, prevDay } = stock;
  const navigate = useNavigate();

  const handleViewDetails = (ticker) => {
    console.log("Ticker:", ticker);
    navigateToDetailsPage(ticker, navigate);
  };

  const handleAddToWatchlist = (ticker) => {
    console.log("Ticker:", ticker);
    addtoWatchList(ticker);
  }

  let priceChangeArrow;
  if (todaysChangePerc.toFixed(2) > 0 || todaysChange.toFixed(2) > 0) {
    priceChangeArrow = "\u25B2";
  } else if (todaysChangePerc.toFixed(2) < 0 || todaysChange.toFixed(2) < 0) {
    priceChangeArrow = "\u25BC";
  } else {
    priceChangeArrow = "";
  }
 

  return (
    <div className="stock-info">
      <div className="stock-symbol">
        <p>{ticker}</p>
        <Addicon onClick={() =>  handleAddToWatchlist(ticker)}/>
      </div>
      <div className="stock-price">
        <p>${day.o.toFixed(2)}</p>
      </div>
      <div className="stock-change">
        <div className="price-change">
          <p className={(todaysChange.toFixed(2) > 0 || todaysChangePerc.toFixed(2) > 0) ? "positive" : (todaysChange.toFixed(2) < 0 || todaysChangePerc.toFixed(2) < 0) ? "negative" : "stock-detail"}>
          {priceChangeArrow} <span>Today's Change:</span> ${todaysChange.toFixed(2)}({todaysChangePerc.toFixed(2)}%) 
          </p>
        </div>
        <div className="stock-day-info">
          <div className="info-details"> 
            <p>High: <span>${day.h.toFixed(2)}</span></p>
          </div>
          <div className="info-details">
            <p>Low: <span>${day.l.toFixed(2)}</span></p>
          </div>
        </div>
        <div className="stock-day-info">
          <div className="info-details">
            <p>Volume: <span>{day.v}</span></p>
          </div>
          <div className="info-details"> 
            <p>Close: <span>${day.c.toFixed(2)}</span></p>
          </div>
        </div>
        <div className="updated-time">
          <p>Updated: <span>{new Date(updated / 1000000).toLocaleString()}</span></p>
        </div>
      </div>
      <div className="stock-details-button">
        {/* Button to view details */}
        <button className="button" onClick={() => handleViewDetails(ticker)}>View Details &raquo; </button>
        {/* <button onClick={() =>  handleAddToWatchlist(ticker)}>Add to Watchlist</button> */}
      </div>

    </div>
  );
};

StockListItem.propTypes = {
  stock: PropTypes.object.isRequired, // Prop validation for stock object
  onViewDetails: PropTypes.func.isRequired // Prop validation for onViewDetails function
};

export default StockListItem;
