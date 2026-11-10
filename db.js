const { Pool, types } = require('pg');

types.setTypeParser(1700, (val) => parseFloat(val));

const pool = new Pool();

module.exports = pool;
