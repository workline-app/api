export function up(knex) {
  return knex.schema.createTable('reports', t => {
    t.string('_id', 128).notNullable().unique().primary();
    t.string('description', 128).notNullable();
    t.string('body', 255).notNullable();
    t.boolean('isOpen').defaultTo(false);
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.string('FK_userID')
      .references('_id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
      .notNullable();
    t.string('FK_deviceID')
      .references('_id')
      .inTable('devices')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
      .notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('reports');
}
