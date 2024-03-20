import React from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Watchlist = (props) => {
  console.log(props);
  const user_id = cookies.get("user_id");
  if (user_id) {
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