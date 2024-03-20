
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

const Watchlist = (props) => {
  const [watchlist, setWatchlist] = useState([]);
  const user_id = cookies.get("user_id");

  useEffect(() => {
    const getWatchlist = async () => {
      console.log('getWatchlist is getting the list for user_id', user_id);
      try {
        const response = await axios.get(`http://localhost:3001/watchlists/${user_id}`);
        console.log(response.data);
        setWatchlist(response.data);
      } catch (error) {
        console.error("Error getting watchlist:", error);
      }
    };

    if (user_id) {
      getWatchlist();
    }
  }, [user_id]);

  return (
    <div>
      <h1>Watchlist</h1>
      {user_id ? (
        <div>
          <p>Here are the stocks you are watching:</p>
          <ul>
            {watchlist.map((item, index) => (
              <li key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </li>
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