import db from '../../data/db_config.js';

export const findAll = async () => await db('devices');

export const findById = async id =>
  await db('devices').where({ _id: id }).first();

export const add = async data => {
  const [id] = await db('devices').insert(data, '_id');
  return findById(id);
};

export const update = async (id, update) => {
  const device = await db('devices').where('_id', id).update(update);
  return findById(device._id);
};

export const remove = async id => await db('users').where('_id', id).del();
