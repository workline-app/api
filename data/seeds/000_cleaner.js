import cleaner from 'knex-cleaner';

export async function seed(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate', // resets ids
    ignoreTables: ['knex_migrations', 'knex_migrations_lock']
  });
}
