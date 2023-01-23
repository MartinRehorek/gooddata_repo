'use strict';

const logger = require('./logger');
const { InternalServerError } = require('./errors');
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'gooddata_db',
  password: 'postgres',
  port: 5432,
});

const connectDb = async () => {
  try {
    await client.connect();
    await initDb();
  } catch (error) {
    logger.error(`ERROR Connection to DB: ${error.message ?? error}`);
    throw new InternalServerError('Error connecting to database');
  }
  };

  const initDb = async () => {
  try {
  const text = `DROP TABLE IF EXISTS Orders, Machines, Users; CREATE TABLE Orders ( order_id SERIAL, user_id VARCHAR NOT NULL, machine_id integer NOT NULL, coffee_timestamp timestamp NOT NULL ); CREATE TABLE Users ( login VARCHAR(20) NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE(login) ); CREATE TABLE Machines ( machine_id SERIAL, name VARCHAR(25) NOT NULL, caffeine INTEGER NOT NULL ); ;`
  const execute = async (query) => {
    try {
      await client.query(query);
    } catch (error) {
    }
  };

  await execute(text);
} catch (error) {
  logger.error(`ERROR : ${error.message ?? error}`);
  }
  };

  const closeDb = async () => {
  try {
  await client.end();
  } catch (error) {
  logger.error(`ERROR: ${error.message ?? error}`);
  }
  };

  module.exports = {
  connectDb, closeDb, client
  };

