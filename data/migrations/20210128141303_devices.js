export function up(knex) {
  const date = new Date();
  return knex.schema.createTable('devices', t => {
    t.string('_id', 128).notNullable().unique().primary();
    t.string('model', 128).notNullable();
    t.string('OS', 128).notNullable();
    t.string('brand', 128).notNullable();
    t.integer('year').defaultTo(date.getFullYear());
    t.boolean('isAvailable').defaultTo(true);
    t.string('assignedTo')
      .references('_id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('devices');
}
