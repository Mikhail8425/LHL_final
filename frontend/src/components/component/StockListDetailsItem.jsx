import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFinancial from '../../hooks/useFinancialsApi';
import useChart from '../../hooks/useChart';
import Chart from "react-apexcharts";
import moment from "moment"
const StockListDetailsItem = ({ tickerCurrent }) => {
  const [multiplier, setMultiplier] = useState(1);
  const [timespan, setTimespan] = useState('day');
  const [start, setStart] = useState('2024-01-01');
  const [end, setEnd] = useState('2024-03-01');
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function(value, timestamp) {
          return moment(timestamp).format('YYYY-MM-DD');
        }
      }
    }
  });

  const [series, setSeries] = useState([]);
  const { data, loading, error } = useFinancial(`/reference/tickers/${tickerCurrent}?`);

  const { data2 } = useChart(`${tickerCurrent}/range/${multiplier}/${timespan}/${start}/${end}?adjusted=true&sort=asc&limit=120&`);

  const handleMultiplierChange = (event) => {
    setMultiplier(event.target.value);
  };

  const handleTimespanChange = (event) => {
    setTimespan(event.target.value);
  };

  const handleStartChange = (event) => {
    setStart(event.target.value);
  };

  const handleEndChange = (event) => {
    setEnd(event.target.value);
  };

  useEffect(() => {
    console.log("Data2:", data2); // Log the value of data2
    if (!data2 || !Array.isArray(data2.results)) return;
  
    
    const formattedData = data2.results.map(item => {
      return [item.t, [item.o, item.h, item.l, item.c]];
    });
  
    setSeries([{ data: formattedData }]);
    console.log("Series:", series);
  }, [data2]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const companyInfo = data.results;


  return (
    
    <div className="stock-item">
      <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="candlestick"
              width="500"
            /> <div className="controls">
            <label>Multiplier:</label>
            <input type="text" value={multiplier} onChange={handleMultiplierChange} />
    
            <label>Timespan:</label>
            <input type="text" value={timespan} onChange={handleTimespanChange} />
    
            <label>Start:</label>
            <input type="date" value={start} onChange={handleStartChange} />
    
            <label>End:</label>
            <input type="date" value={end} onChange={handleEndChange} />
          </div></div>
    
      <h1>Company Information</h1>
      <div id="company-info">
        <h2>Company Details</h2>
        <ul>
          <li><strong>Request ID:</strong> {data.request_id}</li>
          <li><strong>Status:</strong> {data.status}</li>
        </ul>
        <h3>Results:</h3>
        <ul>
          {companyInfo.ticker && <li><strong>Ticker:</strong> {companyInfo.ticker}</li>}
          {companyInfo.name && <li><strong>Name:</strong> {companyInfo.name}</li>}
          {companyInfo.market && <li><strong>Market:</strong> {companyInfo.market}</li>}
          {companyInfo.locale && <li><strong>Locale:</strong> {companyInfo.locale}</li>}
          {companyInfo.primary_exchange && <li><strong>Primary Exchange:</strong> {companyInfo.primary_exchange}</li>}
          {companyInfo.type && <li><strong>Type:</strong> {companyInfo.type}</li>}
          {companyInfo.active !== undefined && <li><strong>Active:</strong> {companyInfo.active.toString()}</li>}
          {companyInfo.currency_name && <li><strong>Currency Name:</strong> {companyInfo.currency_name}</li>}
          {companyInfo.cik && <li><strong>CIK:</strong> {companyInfo.cik}</li>}
          {companyInfo.composite_figi && <li><strong>Composite FIGI:</strong> {companyInfo.composite_figi}</li>}
          {companyInfo.share_class_figi && <li><strong>Share Class FIGI:</strong> {companyInfo.share_class_figi}</li>}
          {companyInfo.market_cap && <li><strong>Market Cap:</strong> ${companyInfo.market_cap}</li>}
          {companyInfo.phone_number && <li><strong>Phone Number:</strong> {companyInfo.phone_number}</li>}
          {companyInfo.address && <li><strong>Address:</strong> {companyInfo.address.address1}, {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.postal_code}</li>}
          {companyInfo.description && <li><strong>Description:</strong> {companyInfo.description}</li>}
          {companyInfo.sic_code && <li><strong>SIC Code:</strong> {companyInfo.sic_code}</li>}
          {companyInfo.sic_description && <li><strong>SIC Description:</strong> {companyInfo.sic_description}</li>}
          {companyInfo.homepage_url && <li><strong>Homepage URL:</strong> <a href={companyInfo.homepage_url}>{companyInfo.homepage_url}</a></li>}
          {companyInfo.total_employees && <li><strong>Total Employees:</strong> {companyInfo.total_employees}</li>}
          {companyInfo.list_date && <li><strong>List Date:</strong> {companyInfo.list_date}</li>}
          {companyInfo.branding && 
            <li>
              <strong>Branding:</strong>
              <ul>
                {companyInfo.branding.logo_url && <li><strong>Logo URL:</strong> <a href={companyInfo.branding.logo_url}>{companyInfo.branding.logo_url}</a></li>}
                {companyInfo.branding.icon_url && <li><strong>Icon URL:</strong> <a href={companyInfo.branding.icon_url}>{companyInfo.branding.icon_url}</a></li>}
              </ul>
            </li>
          }
          {companyInfo.share_class_shares_outstanding && <li><strong>Share Class Shares Outstanding:</strong> {companyInfo.share_class_shares_outstanding}</li>}
          {companyInfo.weighted_shares_outstanding && <li><strong>Weighted Shares Outstanding:</strong> {companyInfo.weighted_shares_outstanding}</li>}
          {companyInfo.round_lot && <li><strong>Round Lot:</strong> {companyInfo.round_lot}</li>}
        </ul>
      </div>
    </div>
  );
};

StockListDetailsItem.propTypes = {
  tickerCurrent: PropTypes.string.isRequired,
};

export default StockListDetailsItem;
