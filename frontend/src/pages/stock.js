import React from "react";
import StockListItem from '../components/component/StockListItem';

const StockList = (props) => {
  // Render a single StockListItem using props.stocks
  return (
    <ul className="photo-list">
      <StockListItem
        key={props.stocks.symbol} // Assuming symbol is unique for each stock
        stock={props.stocks}
      />
    </ul>
  );
};

export default StockList;
