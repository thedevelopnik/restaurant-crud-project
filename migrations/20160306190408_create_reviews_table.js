
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments();
    table.integer('res_id').references('restaurants.id').onDelete('CASCADE');
    table.string('rev_name').unique();
    table.string('rev_date');
    table.decimal('rating', 3, 1);
    table.string('review', 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
