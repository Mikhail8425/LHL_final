import React, { useState } from "react";
import useApi from '../hooks/useApi'; 
import StockListItem from '../components/component/StockListItem'; 

const StockList = (props) => {
    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');
    

    // Define the API endpoint based on the presence of the search query
    const apiEndpoint = submittedQuery
        ? `/snapshot/locale/us/markets/stocks/tickers/${submittedQuery}?`
        : '/snapshot/locale/us/markets/stocks/tickers?';

    // Fetch data using useApi hook
    const { data, loading, error } = useApi(apiEndpoint);

    // Handle search form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedQuery(searchQuery.toUpperCase());;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const displayedTickers = data.tickers ? data.tickers.slice(0, 100) : [];

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
            {/* Check if data exists and is an array before rendering */}
            {Array.isArray(displayedTickers) && displayedTickers.map((stock, index) => (
                <StockListItem key={index} stock={stock} navigateToDetailsPage={props.navigateToDetailsPage} addtoWatchList={props.addtoWatchList} handleViewDetails={props.handleViewDetails} />
            ))}
            {/* Check if data.ticker exists and render */}
            {data.ticker && <StockListItem stock={data.ticker} navigateToDetailsPage={props.navigateToDetailsPage} handleViewDetails={props.handleViewDetails} addtoWatchList={props.addtoWatchList} />}
        </div>
    );
};

export default StockList;
