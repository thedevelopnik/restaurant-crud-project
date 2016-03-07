
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments();
    table.integer('res_id').references('restaurants.id');
    table.string('rev_name');
    table.date('rev_date');
    table.decimal('rating', 3, 1);
    table.string('review', 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
