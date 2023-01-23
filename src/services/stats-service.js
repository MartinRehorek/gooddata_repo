'use strict';

const {client} = require('../utils/connect-db');
const { NotFoundError } = require('../utils/errors');
const logger = require('../utils/logger');

const getUserStats = async (userId) => {
  try {
    const userExistsQuery = 'SELECT EXISTS(SELECT 1 FROM users WHERE login = $1)';
    const userExists = (await client.query(userExistsQuery, [userId])).rows[0].exists;
    if (!userExists) {
      throw new NotFoundError(`User with id ${data.userId} does not exist`);
    }
    const query = 'SELECT * FROM orders WHERE user_id = $1';
    const values = [userId];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    throw new NotFoundError(`No transactions found for user with id: ${userId}`);
  }
};

const getCoffeeStats = async () => {
  try {
    const query = 'SELECT * FROM orders';
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    throw new NotFoundError(`No transactions found`);
  }
};

const getMachineStats = async (machineId) => {
  try {
    const query = 'SELECT * FROM orders WHERE machine_id = $1';
    const values = [machineId];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    throw new NotFoundError(`No transactions found for machine with id: ${machineId}`);
  }
};

const getCaffeineLevel = async (userId) => {
  // TODO: Finish this endpoint
  let logs = await getUserStats(userId)

  const levels = [];
  logs.sort((a, b) => a.coffee_timestamp - b.coffee_timestamp);
  logger.info(`LOGS : ${logs}`)
  const current_time = new Date();
  for (let i = 0; i < 24; i++) {
      const hourAgo = new Date(current_time - i * 60 * 60 * 1000);
      let level = 0;
      logs.forEach(async (log) => {
          if (log.coffee_timestamp > hourAgo) {
            // TODO: Optimize it by storing it in a hash before loop
              const intake = await client.query('SELECT caffeine FROM machines WHERE machine_id = $1;', [log['machine_id']]);
              logger.info(`INTAKE : ${intake.rows[0].caffeine}`)
              level += Number(intake.rows[0].caffeine)
              logger.info(`LEVEL : ${level}`)
              if (i % 5 === 0) {
                  level = level / 2;
              }
          }
      });
      logger.info(`LEVEL : ${level}`)
      levels.push({ timestamp: hourAgo, level: level });
  }
  return levels
}
module.exports = {
  getMachineStats, getCoffeeStats,getUserStats, getCaffeineLevel
};
