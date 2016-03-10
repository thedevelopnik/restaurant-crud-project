
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({username: 'dsudia', first_name: 'David', last_name: 'Sudia', password: 'abc123', email: 'dsudia@gmail.com', admin: 'true'}),
    knex('users').insert({username: 'nsudia', first_name: 'Natalie', last_name: 'Sudia', password: 'abc123', email: 'n.sudia@gmail.com', admin: 'false'})
  );
};
