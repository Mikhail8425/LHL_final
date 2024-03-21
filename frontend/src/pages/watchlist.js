import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import WatchListItem from '../components/component/WatchListItem';

const Watchlist = (props) => {
  const [tickerSymbols, setTickerSymbols] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const cookies = new Cookies();
  const user_id = cookies.get("user_id");

  useEffect(() => {
    const getWatchlist = async () => {
      console.log('getWatchlist is getting the list for user_id', user_id);
      try {
        const response = await axios.get(`http://localhost:3001/watchlists/${user_id}`);
        console.log(response.data);
        const symbols = response.data.map(item => item.ticker_symbol);
        setTickerSymbols(symbols);
        setLoading(false); // Update loading state after fetching data
      } catch (error) {
        console.error("Error getting watchlist:", error);
        setLoading(false); // Update loading state even if there's an error
      }
    };

    if (user_id) {
      getWatchlist();
    }
  }, [user_id]);

  if (tickerSymbols.length === 0) {
    return <div>Your Watchlist is empty. Go to the Stocks page to add some...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Watchlist</h1>

      {user_id && tickerSymbols.length > 0 ? (
        <div>
          <p>Here are the stocks you are watching:</p>
          <ul>
            {tickerSymbols.map((symbol, index) => (
              <WatchListItem
                key={index}
                symbol={symbol}
                navigateToDetailsPage={props.navigateToDetailsPage}
                addtoWatchList={props.addtoWatchList}
                handleViewDetails={props.handleViewDetails}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to view your watchlist</p>
      )}
    </div>
  );
};

export default Watchlist;
