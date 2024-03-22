const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const indices = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetch = require('node-fetch'); // Import node-fetch to make HTTP requests

async function fetchData(symbol, formattedDate) {
  const apiKey = process.env.POLY_KEY;
  const url = `https://api.polygon.io/v1/open-close/I:${symbol}/${formattedDate}?apiKey=${apiKey}`;
  console.log('Fetching data from URL:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data for ${symbol}: ${response.statusText}`);
  }
  const data = await response.json();
  console.log('Data received:', data);
  return data;
}

indices.get('/', async (req, res) => {
  try {
    const today = new Date();
    // Calculate yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);


    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [compData, xauData, ndxData] = await Promise.all([
      fetchData('NDX', formattedDate),

    ]);

    console.log('COMP data:', compData);
    console.log('XAU data:', xauData);
    console.log('NDX data:', ndxData);

    res.json({ compData, xauData, ndxData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = indices;