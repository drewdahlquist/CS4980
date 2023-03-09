const config = require("config");

const { Pool } = require("pg");

const pool = new Pool({
  host: config.get("RDS_HOSTNAME"),
  port: config.get("RDS_PORT"),
  user: config.get("RDS_USERNAME"),
  password: config.get("RDS_PASSWORD"),
  database: config.get("RDS_DB_NAME"),
});

module.exports = pool;
