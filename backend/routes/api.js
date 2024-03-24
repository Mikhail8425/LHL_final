const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const api = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');
require('dotenv').config();
const apiKey = process.env.POLY_KEY;

    const chartBaseUrl = 'https://api.polygon.io/v2/aggs/ticker/';
    const statementBaseUrl = 'https://api.polygon.io/vX';
    const financialsBaseUrl = 'https://api.polygon.io/v3';



const fetch = require('node-fetch'); // Import node-fetch to make HTTP requests






api.get('/stocks', async (req, res) => {
  try {
    const apiKey = process.env.POLY_KEY;

    const baseUrl = 'https://api.polygon.io/v2';

    // Define the limit for the number of stocks
    const limit = 100;

    // Extract query parameters from the request
    const { submittedQuery } = req.query;

    // Construct the API endpoint based on the submitted query
    const apiEndpoint = submittedQuery
      ? `/snapshot/locale/us/markets/stocks/tickers/${submittedQuery}?`
      : '/snapshot/locale/us/markets/stocks/tickers?';

    
    const apiUrl = `${baseUrl}${apiEndpoint}apiKey=${apiKey}&limit=${limit}`;

    

  
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response data
    let data = await response.json();

    // Slice the data to limit the number of stocks to 100
    if (data.tickers && data.tickers.length > limit) {
      data.tickers = data.tickers.slice(0, limit);
    }

    // Return the sliced data to the frontend
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


api.get('/chart', async (req, res) => {
  try {
    const { endpoint } = req.query;
    const response = await fetch(`${chartBaseUrl}${endpoint}&apiKey=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Polygon API');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


api.get('/statement', async (req, res) => {
  try {
    const { endpoint } = req.query;
    const response = await fetch(`${statementBaseUrl}${endpoint}&apiKey=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Polygon API');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

api.get('/financials', async (req, res) => {
  try {
    const { endpoint } = req.query;
    const response = await fetch(`${financialsBaseUrl}${endpoint}&apiKey=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Polygon API');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = api;

