'use strict';

const {client} = require('../utils/connect-db')

const createMachine = async (data) => {
  const query = 'INSERT INTO machines (name, caffeine) VALUES ($1, $2) RETURNING machine_id';
  const values = [data['name'], data['caffeine']];
  const result = await client.query(query, values);
  const machineId = result.rows[0].machine_id;

  return machineId
};

module.exports = {
  createMachine
};
