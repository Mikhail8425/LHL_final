import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import RemoveIcon from "../icon/Removeicon";
import "../../styles/stockinfo.scss";

const WatchListItem = ({ symbol, navigateToDetailsPage, addtoWatchList }) => {
  const [stockData, setStockData] = useState(null);
  const apiEndpoint = `/snapshot/locale/us/markets/stocks/tickers/${symbol}?`;
  const { data, loading, error } = useApi(apiEndpoint);
  const navigate = useNavigate();

  useEffect(() => {
    if (symbol) {
      setStockData(data);
      // console.log("Data received for", symbol, ":", data); // Log received data
    }
  }, [data, symbol]);

  const handleViewDetails = () => {
    // console.log("View Details for:", symbol);
    // Handle navigation to details page
    navigateToDetailsPage(symbol, navigate);
  };

  const handleAddToWatchlist = () => {
    // console.log("Add to Watchlist:", symbol);
    addtoWatchList(symbol);
    window.location.reload();
  };

  if (!symbol) {
    return <div>You have no stocks in your watchlist</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let priceChangeArrow;
  if (data.ticker.todaysChangePerc.toFixed(2) > 0 || data.ticker.todaysChange.toFixed(2) > 0) {
    priceChangeArrow = "\u25B2";
  } else if (data.ticker.todaysChangePerc.toFixed(2) < 0 || data.ticker.todaysChange.toFixed(2) < 0) {
    priceChangeArrow = "\u25BC";
  } else {
    priceChangeArrow = "";
  }

  return (
    <div className="stock-item">
      <div className="stock-info">
      <div className="stock-symbol">
        <p>{symbol}</p>
        <RemoveIcon onClick={handleAddToWatchlist}/>
      </div>
      <div className="stock-price">
        <p>${data.ticker.day.o.toFixed(2)}</p>
      </div>
      <div className="stock-change">
        <div className="price-change">
          <p className={(data.ticker.todaysChange.toFixed(2) > 0 || data.ticker.todaysChangePerc.toFixed(2) > 0) ? "positive" : (data.ticker.todaysChange.toFixed(2) < 0 || data.ticker.todaysChangePerc.toFixed(2) < 0) ? "negative" : "stock-detail"}>
          {priceChangeArrow} <span>Today's Change:</span> ${data.ticker.todaysChange.toFixed(2)}({data.ticker.todaysChangePerc.toFixed(2)}%) 
          </p>
        </div>
        <div className="stock-day-info">
          <div className="info-details"> 
            <p>High: <span>${data.ticker.day.h.toFixed(2)}</span></p>
          </div>
          <div className="info-details">
            <p>Low: <span>${data.ticker.day.l.toFixed(2)}</span></p>
          </div>
        </div>
        <div className="stock-day-info">
          <div className="info-details">
            <p>Volume: <span>{data.ticker.day.v}</span></p>
          </div>
          <div className="info-details"> 
            <p>Close: <span>${data.ticker.day.c.toFixed(2)}</span></p>
          </div>
        </div>
        <div className="updated-time">
          <p>Updated: <span>{new Date(data.ticker.updated / 1000000).toLocaleString()}</span></p>
        </div>
      </div>
      <div className="stock-details-button">
        {/* Button to view details */}
        <button className="button" onClick={handleViewDetails}>View Details &raquo; </button>
        {/* <button onClick={() =>  handleAddToWatchlist(ticker)}>Add to Watchlist</button> */}
      </div>

    </div>
    </div>
  );
};

WatchListItem.propTypes = {
  symbol: PropTypes.string.isRequired, // Prop validation for stock symbol
  navigateToDetailsPage: PropTypes.func.isRequired,
  addtoWatchList: PropTypes.func.isRequired
};

export default WatchListItem;
