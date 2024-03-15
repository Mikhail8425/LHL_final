import StockListItem from '../components/component/StockListItem';
// Filename - pages/blogs.js
 
import React from "react";
 
const StockList = (props) => {
  const stockItems = props.stocks.map((stock) => (
    <StockListItem
      key={stock.id}
      stock={stock}
      
      
    />
  ));

  return (
    <ul className="photo-list">
      {stockItems}
    </ul>
  );
};
 
export default StockList;