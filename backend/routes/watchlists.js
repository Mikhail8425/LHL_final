const express = require('express');
const watchlist = express.Router();
const { query } = require('../db/db'); 


watchlist.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await query('SELECT * FROM watchlists WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});





watchlist.post("/", async (request, response) => {
  const { user_id, ticker_symbol } = request.body;
  console.log("Data being inserted:", { user_id, ticker_symbol });

  try {
    // Check if the entry already exists
    const checkExistingQuery = `
      SELECT * FROM watchlists 
      WHERE user_id = $1 AND ticker_symbol = $2
    `;
    const existingResult = await query(checkExistingQuery, [user_id, ticker_symbol]);

    // If the entry already exists, delete it
    if (existingResult.rows.length > 0) {
      console.log("Entry already exists. Deleting...");
      const deleteExistingQuery = `
        DELETE FROM watchlists 
        WHERE user_id = $1 AND ticker_symbol = $2
        RETURNING *
      `;
      const deletedResult = await query(deleteExistingQuery, [user_id, ticker_symbol]);
      console.log("Deleted entry:", deletedResult.rows[0]);
    } else {
      console.log("Entry does not exist. Proceeding with insertion...");

      // Insert the new entry
      const insertWatchList = `
        INSERT INTO watchlists (user_id, ticker_symbol, created_at, updated_at) 
        VALUES ($1, $2, NOW(), NOW()) 
        RETURNING *
      `;
      const result = await query(insertWatchList, [user_id, ticker_symbol]);
      response.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error inserting into watchlists:", error);
    response.status(500).send("Error inserting into watchlists");
  }
});



watchlist.delete("/", async (request, response) => {
  const { user_id, ticker_symbol } = request.body;

  try {
    // Check if the entry exists
    const checkExistingQuery = `
      SELECT * FROM watchlists 
      WHERE user_id = $1 AND ticker_symbol = $2
    `;
    const existingResult = await query(checkExistingQuery, [user_id, ticker_symbol]);
    
    // If the entry does not exist, return a message
    if (existingResult.rows.length === 0) {
      return response.status(404).json({ error: "Entry not found for this user and ticker symbol." });
    }

    // Remove the entry from the watchlists table
    const removeWatchListQuery = `
      DELETE FROM watchlists 
      WHERE user_id = $1 AND ticker_symbol = $2
      RETURNING *
    `;
    const removedResult = await query(removeWatchListQuery, [user_id, ticker_symbol]);

    // Return the removed data
    response.json(removedResult.rows[0]);
  } catch (error) {
    console.error("Error removing from watchlists:", error);
    response.status(500).send("Error removing from watchlists");
  }
});

// Define your route handler for updating watchlist entry
watchlist.put("/", async (request, response) => {
  const { user_id, old_ticker_symbol, new_ticker_symbol, email_frequency } = request.body;

  try {
    // Check if the entry exists
    const checkExistingQuery = `
      SELECT * FROM watchlists 
      WHERE user_id = $1 AND ticker_symbol = $2
    `;
    const existingResult = await query(checkExistingQuery, [user_id, old_ticker_symbol]);
    
    // If the entry does not exist, return a message
    if (existingResult.rows.length === 0) {
      return response.status(404).json({ error: "Entry not found for this user and ticker symbol." });
    }

    // Update the entry in the watchlists table
    const updateWatchListQuery = `
      UPDATE watchlists 
      SET ticker_symbol = $1, email_frequency = $2, updated_at = NOW() 
      WHERE user_id = $3 AND ticker_symbol = $4
      RETURNING *
    `;
    const updatedResult = await query(updateWatchListQuery, [new_ticker_symbol, email_frequency, user_id, old_ticker_symbol]);

    // Return the updated data
    response.json(updatedResult.rows[0]);
  } catch (error) {
    console.error("Error updating watchlist entry:", error);
    response.status(500).send("Error updating watchlist entry");
  }
});


module.exports = watchlist;
