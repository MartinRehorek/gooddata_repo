'use strict';

const {client} = require('../utils/connect-db');
const { NotFoundError } = require('../utils/errors');

const registerCoffee = async (data) => {
  const userExistsQuery = 'SELECT EXISTS(SELECT 1 FROM users WHERE login = $1)';
  const machineExistsQuery = 'SELECT EXISTS(SELECT 1 FROM machines WHERE machine_id = $1)';

  const userExists = (await client.query(userExistsQuery, [data.userId])).rows[0].exists;
  const machineExists = (await client.query(machineExistsQuery, [data.machineId])).rows[0].exists;

  if (!userExists) {
    throw new NotFoundError(`User with id ${data.userId} does not exist`);
  }

  if (!machineExists) {
    throw new NotFoundError(`Machine with id ${data.machineId} does not exist`);
  }

  const query = 'INSERT INTO orders (user_id, machine_id, coffee_timestamp) VALUES ($1, $2, $3)';
  await client.query(query, [data.userId, data.machineId, data.coffeeTimestamp]);
};



module.exports = { registerCoffee };
