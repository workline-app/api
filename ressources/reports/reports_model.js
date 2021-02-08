import db from '../../data/db_config.js';

export const findAll = async () => await db('reports');

export const findById = async id =>
  await db('reports').where({ _id: id }).first();

export const add = async data => {
  const [id] = await db('reports').insert(data, '_id');
  return findById(id);
};

export const update = async (id, update) => {
  const updatedReport = await db('reports').where('_id', id).update(update);
  return findById(updatedReport._id);
};

export const remove = async id => await db('reports').where('_id', id).del();
