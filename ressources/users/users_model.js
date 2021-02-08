import db from '../../data/db_config.js';

export const findAll = async () => await db('users');

export const findById = async id =>
  await db('users').where({ _id: id }).first();

export const add = async data => {
  const [id] = await db('users').insert(data, '_id');
  return findById(id);
};

export const update = async (id, update) => {
  const user = await db('users').where('_id', id).update(update);
  return findById(id);
};

export const remove = async id => await db('users').where('_id', id).del();
