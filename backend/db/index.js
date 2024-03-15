// load .env data into process.env
require('dotenv').config();

// Other dependencies
const fs = require('fs');
const chalk = require('chalk');
const { Pool } = require('pg');

// PG connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`
});

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await pool.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const seedFilenames = fs.readdirSync('./db/seeds');

  for (const fn of seedFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await pool.query(sql);
  }
};

(async () => {
  try {
    console.log(`-> Connecting to PG using ${pool.options.connectionString} ...`);
    await pool.connect();
    await runSchemaFiles();
    await runSeedFiles();
    pool.end();
    console.log(`-> Database setup completed successfully.`);
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    pool.end();
  }
})();