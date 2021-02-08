import knex from 'knex';
import knexfile from '../knexfile.js';
const enviroment = process.env.DB_ENV || 'development';
const knexConfig = knexfile[enviroment];
export default knex(knexConfig);
