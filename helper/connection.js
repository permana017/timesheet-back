const { Client } = require("pg");
// require('dotenv').config()

// const { DB_USERNAME, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env

const db = new Client({
  user: "postgres.etlcpfodkmsiwkdvouqr",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  database: "postgres",
  password: "Supabase@123",
  port: "5432",
});

db.connect((err) => {
  if (err) {
    console.log("db connection error", err);
  } else {
    console.log("Database connected - PostgreSQL");
  }
});

module.exports = db;
