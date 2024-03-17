import React from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";

const StockListDetailsItem = ({ tickerCurrent }) => {
  // Destructuring the stock object
  console.log(tickerCurrent)
 

  // Find the stock data based on the ticker
  
 

  return (
    <div className="stock-item">
      <div className="header">
        <h2>{tickerCurrent}</h2>
       
      </div>
      {/* Button to view details */}
      
    </div>
  );
};



export default StockListDetailsItem;
