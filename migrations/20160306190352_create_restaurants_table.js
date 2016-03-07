
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table) {
    table.increments();
    table.string('name').unique();
    table.string('cuisine');
    table.string('city');
    table.string('state', 2);
    table.decimal('rating', 3, 1);
    table.string('image');
    table.string('descrip', 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
