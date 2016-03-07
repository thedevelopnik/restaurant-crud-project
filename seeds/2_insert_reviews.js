
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('reviews').del(),

    // Inserts seed entries
    knex('reviews').insert({res_id: 1,
      rev_name: 'Jane Smith',
      rev_date: '2016-02-27',
      rating: 5,
      review: 'I loved this place! Best mexican food ever! Get the chimichangas.'}),
    knex('reviews').insert({res_id: 2,
      rev_name: 'Joe Schmoe',
      rev_date: '2016-02-26',
      rating: 5,
      review: 'The burgers at Burger Bar are the best! For the best burger get the bison burger.'}),
    knex('reviews').insert({res_id: 3,
      rev_name: 'Jose Canseco',
      rev_date: '2016-03-01',
      rating: 3,
      review: 'Pasta Freddy\'s is ok. The pasta is great, but don\'t get the pizza because the crust is always dry.'}),
    knex('reviews').insert({res_id: 4,
      rev_name: 'Henry Preston',
      rev_date: '2016-02-12',
      rating: 2,
      review: 'Bangkok Grill is my least favorite Thai place around. If you really want good Thai, hit up Thai Basil.'}),
    knex('reviews').insert({res_id: 5,
      rev_name: 'Max Jackson',
      rev_date: '2016-01-01',
      rating: 2,
      review: 'Came here for a hangover cure after New Year\'s Eve, got nothing but some grody soup.'}),
    knex('reviews').insert({res_id: 6,
      rev_name: 'Peter Nguyen',
      rev_date: '2016-03-02',
      rating: 1,
      review: 'The description says it all. DON\'T EAT HERE'})
  );
};
