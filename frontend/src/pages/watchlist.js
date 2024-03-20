import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

const Watchlist = (props) => {
  console.log(props);
  const user_id = cookies.get("user_id");

  if (user_id) {
    const getWatchlist = async () => {
      console.log('getWatchlist');
      console.log('user_id', user_id);
      try {
        const response = await axios.get(`http://localhost:3001/watchlists/${user_id}`);
        console.log(response.data);
      } catch (error) {
        console.error("Error getting watchlist:", error);
      }
    }

    getWatchlist();
    return (
      <div>
        <h1>Watchlist</h1>
        <p>Here are the stocks you are watching</p>
        <ul>
 
        </ul>
      </div>
    );
  }
  else {
    return (
      <div>
        <h1>Watchlist</h1>
        <p>Please log in to view your watchlist</p>
      </div>
    );
  }
};



export default Watchlist;