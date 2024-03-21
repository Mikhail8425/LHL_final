import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios for making HTTP requests
import StockListItem from '../components/component/StockListItem';

const StockList = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);

  // Function to fetch default data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/stocks');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch default data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('/api/stocks', {
        params: {
          submittedQuery: searchQuery.toUpperCase()
        }
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search bar */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by ticker..."
        />
        <button type="submit">Search</button>
      </form>
      
      {/* Check loading state */}
      {loading && <div>Loading...</div>}

      {/* Check error state */}
      {error && <div>Error: {error}</div>}

      {/* Render stock list items */}
      {data && data.tickers && data.tickers.map((stock, index) => (
        <StockListItem 
          key={index} 
          stock={stock} 
          navigateToDetailsPage={props.navigateToDetailsPage} 
          addtoWatchList={props.addtoWatchList} 
          handleViewDetails={props.handleViewDetails} 
        />
      ))}
      
      {/* Check if data.ticker exists and render */}
      {data && data.ticker && (
        <StockListItem 
          stock={data.ticker} 
          navigateToDetailsPage={props.navigateToDetailsPage} 
          handleViewDetails={props.handleViewDetails} 
          addtoWatchList={props.addtoWatchList} 
        />
      )}
    </div>
  );
};

export default StockList;


