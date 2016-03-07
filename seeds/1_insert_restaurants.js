
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('restaurants').del(),

    // Inserts seed entries
    knex('restaurants').insert({
      name: 'Los Tacos',
      cuisine: 'Mexican',
      city: 'Denver',
      state: 'CO',
      image: '/images/mexican.png',
      rating: 5,
      descrip: 'Busy and easygoing outpost for Mexican comfort food such as carnitas paired with potent margaritas. Known for mexican meals with a side of spicy green chili.'}),
    knex('restaurants').insert({
      name: 'Burger Bar',
      cuisine: 'American',
      city: 'Seattle',
      state: 'WA',
      image: '/images/burger.png',
      rating: 5,
      descrip: 'In 2007 we opened the first Burger Bar with one simple notion in mind: despite the overwhelming number of restaurants serving burgers, Americans were starving for something better. And we could deliver. Our vision is to connect with America’s passion for its favorite food on a local level and in a space where “Smashed Fresh, Served Delicious” means dedication to crafting the best-tasting burger around. Our smashed burgers are always made-to-order, never frozen, smashed and seared to perfection on our grill. Our menu is also kid-friendly, vegetarian-approved and topped off with frosty milkshakes.'}),
    knex('restaurants').insert({
      name: 'Pasta Freddys',
      cuisine: 'Italian',
      city: 'Sacramento',
      state: 'CA',
      image: '/images/italian.png',
      rating: 3,
      descrip: 'Inspired by Italian trattoria cuisine, culture, and conversation, Pasta Freddys has been proudly serving unforgettable meals that leave a lasting impression to our deserving guests since 1988 – with knowledge, care and Italian charisma infused in everything we do.'}),
    knex('restaurants').insert({
      name: 'Bangkok Grill',
      cuisine: 'Thai',
      city: 'Brooklyn',
      state: 'NY',
      image: '/images/thai.jpg',
      rating: 2,
      descrip: 'At Bangkok Grill, the curries are what shine, made by Surin Thanon, a native of Chiang Mai in northern Thailand, and served in a no-frills Aurora dining room. The star of the show is the panang curry--creamy with coconut milk and laced with the heat of chili peppers, tempered with fresh lime, garlic, and herbs, and dotted with tender cuts of meat.'}),
    knex('restaurants').insert({
      name: 'Pho Mazing',
      cuisine: 'Vietnamese',
      city: 'Boulder',
      state: 'CO',
      image: '/images/pho.jpg',
      rating: 2,
      descrip: 'Pho Mazing is another contender for the best pho-maker in town. We are suckers for the brimming bowls of rich beef broth filled with tendon, tripe or rare steak and noodles, sided by heaps of bean sprouts, cilantro and saw-leaf herb. But we also love almost everything else on Pho Mazings menu, including bun (noodle bowls), spring rolls, egg rolls and a plate of thin pork chops, coated in a sweet-savory marinade and grilled crispy.'}),
    knex('restaurants').insert({
      name: 'Fiestaritos',
      cuisine: 'Mexican',
      city: 'Lincoln',
      state: 'NE',
      image: '/images/mexican.png',
      rating: 1,
      descrip: 'Drop into Fiestaritos in Lincoln and you’re likely to receive a serviceable plate of roast pork, but the tastiness seems to stop there. "I truly feel as though I wasted $16 on mofongo, which was dry and oily at the same time," wrote a Yelp reviewer. "Hard to do if you ask me, and the steak sandwich which was just a slab of ill tasting beef covered with spaghetti sauce and cheese. Again terrible." The real horror show, however, appears to be taking place in the kitchen. On Aug. 22 of this year, the restaurant racked up 70 violations, including live flies, a warm walk-in cooler, 75 live roaches behind the sink and 15 under the cook’s line, rodents, mold in the ice machine, and no soap at the hand-washing station. When a news crew arrived a week later to see if they’d cleaned up, they were left waiting for an hour and weren’t allowed to see the kitchen, but did spot a dead lizard in the dining room.'})
  );
};
