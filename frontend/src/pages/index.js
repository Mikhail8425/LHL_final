
// Filename - pages/index.js

import React from "react";
import "../styles/home.scss";

const Home = ({ darkMode }) => {
  return (
    <div className={`home${darkMode ? 'dark-mode' : ''}`}>
      <h1>Welcome to Stock Market Magnet! Please read this before using the app.  </h1>
      <h2> Overview contains a list of stocks that is dynamically rendered. You can view pricing details and search for a given stock. Select view details to see a page containing the chart for the stock, company details and financial details assuming they exist.</h2>
      <h3>Create an account to add stocks to your watchlist, which is an easier way to view any stocks you want to keep an eye on. You can also access the details or remove them from your watchlist page.</h3>
      <h4>Go to the blogs to see what other users are talking about. You can edit or delete your posts and like other users posts.</h4>


    </div>
  );
};

export default Home;