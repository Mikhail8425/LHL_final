import React from "react";



const StockListItem = (props) => {



  return (
    <section className="stock-list__item">
      
      
      <div className="photo-list__user-details"><div className="locationandinfo">
        
        
        <h1 className="photo-list__user-info">{props.stock.ticker_symbol}</h1>
        <h2 className="photo-list__user-info">{props.stock.stock_name}</h2>
        <h3 className="photo-list__user-info">{props.stock.price}</h3>
        <h3 className="photo-list__user-info">{props.stock.price_change_percentage}%</h3>
        <h3 className="photo-list__user-info">${props.stock.price_change_dollar}</h3>
        </div><hr className='photo-details-modal__hr'></hr>
        <h2 className="photo-list__user-location"></h2>
        
      </div>
    </section>
  )
};

export default StockListItem;