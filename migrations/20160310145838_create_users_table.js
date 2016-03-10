
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('username').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password');
    table.string('email');
    table.boolean('admin').notNullable().defaultTo('false');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
