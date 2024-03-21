import React, { useState, useEffect } from "react";
import "../styles/indices.scss";
import axios from "axios";

const Indiceslist = () => {
  const [indicesData, setIndicesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/indices");
        setIndicesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="indices">
      <div className="indices-title">
        <h3>INDICES</h3>
      </div>
      <div className="indices-info">
        <p>Name</p>
        <p>Price</p>
        <p>Range</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        indicesData && (
          <div className="indices-info">
            <p>{indicesData.compData.symbol}</p>
            <p>{indicesData.compData.open}</p>
            <p>{indicesData.compData.high - indicesData.compData.low}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Indiceslist;
