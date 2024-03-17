import React from "react";
import useApi from '../hooks/useApi'; // Import the useApi hook
import StockListItem from '../components/component/StockListItem'; // Import the StockListItem component

const StockList = () => {
    // Fetch data using useApi hook
    const { data, loading, error } = useApi('/snapshot/locale/us/markets/stocks/tickers?');

    // Add console.log statement here

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* Check if data exists and is an array before rendering */}
            {Array.isArray(data.tickers) && data.tickers.map((stock, index) => (
                <StockListItem key={index} stock={stock} />
            ))}
        </div>
    );
};

export default StockList;
