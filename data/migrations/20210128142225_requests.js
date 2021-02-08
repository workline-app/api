export function up(knex) {
  return knex.schema.createTable('requests', t => {
    t.string('_id', 128).unique().notNullable().primary();
    t.string('deviceModel', 128).notNullable();
    t.string('deviceCategory', 128).notNullable();
    t.string('description', 255);
    t.integer('status').defaultTo(0).notNullable();
    t.boolean('isClosed').defaultTo(false);
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.string('FK_userID')
      .references('_id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
      .notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('requests');
}
