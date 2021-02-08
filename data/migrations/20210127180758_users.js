export function up(knex) {
  return knex.schema.createTable('users', t => {
    t.string('_id', 128).unique().primary();
    t.string('firstname', 128).notNullable();
    t.string('lastname', 128).notNullable();
    t.varchar('email', 255).unique().notNullable();
    t.string('title', 128);
    t.boolean('isEmployed').defaultTo(true);
    t.boolean('isCompleted').defaultTo(false);
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists('reports')
    .dropTableIfExists('requests')
    .dropTableIfExists('devices')
    .dropTableIfExists('users');
}
