import db from '../../data/db_config.js';

export const findAll = async () => await db('requests');

export const findById = async id => {
  return db('requests').where({ _id: id }).first();
};

export const add = async data => {
  const [id] = await db('requests').insert(data, '_id');
  return findById(id);
};

export const update = async (id, update) => {
  const upadtedRequest = await db('requests').where('_id', id).update(update);
  return findById(upadtedRequest._id);
};

export const remove = async id => await db('requests').where('_id', id).del();
