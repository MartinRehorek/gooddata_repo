'use strict';

const {client} = require('../utils/connect-db')
const { ConflictError } = require('../utils/errors');

const createUser = async (data) => {
  const query = 'INSERT INTO users (login, password, email) VALUES ($1, $2, $3) RETURNING login';
  const values = [data.login, data.password, data.email];
  try {
    const result = await client.query(query, values);
    const userId = result.rows[0].login;
    return userId;
  } catch (error) {
    if (error.code === '23505') {
      throw new ConflictError('A user with this login or email already exists');
    } else {
      throw error;
    }
  }
};

module.exports = { createUser };
