\c gTables

insert into restaurants
  (name, cuisine, city, state, image, rating, descrip)
  values
  ('Los Tacos',
    'Mexican',
    'Denver',
    'CO',
    '/images/mexican.png',
    5,
    'Busy and easygoing outpost for Mexican comfort food such as carnitas paired with potent margaritas. Known for mexican meals with a side of spicy green chili.'),
    ('Burger Bar',
    'American',
    'Seattle',
    'WA',
    '/images/burger.png',
    5,
    'In 2007 we opened the first Burger Bar with one simple notion in mind: despite the overwhelming number of restaurants serving burgers, Americans were starving for something better. And we could deliver. Our vision is to connect with America’s passion for its favorite food on a local level and in a space where “Smashed Fresh, Served Delicious” means dedication to crafting the best-tasting burger around. Our smashed burgers are always made-to-order, never frozen, smashed and seared to perfection on our grill. Our menu is also kid-friendly, vegetarian-approved and topped off with frosty milkshakes.'),
    ('Pasta Freddys',
    'Italian',
    'Sacramento',
    'CA',
    '/images/italian.png',
    3,
    'Inspired by Italian trattoria cuisine, culture, and conversation, Pasta Freddys has been proudly serving unforgettable meals that leave a lasting impression to our deserving guests since 1988 – with knowledge, care and Italian charisma infused in everything we do.'),
    ('Bangkok Grill',
    'Thai',
    'Brooklyn',
    'NY',
    '/images/thai.jpg',
    2,
    'At Bangkok Grill, the curries are what shine, made by Surin Thanon, a native of Chiang Mai in northern Thailand, and served in a no-frills Aurora dining room. The star of the show is the panang curry--creamy with coconut milk and laced with the heat of chili peppers, tempered with fresh lime, garlic, and herbs, and dotted with tender cuts of meat.'),
    ('Pho Mazing',
    'Vietnamese',
    'Boulder',
    'CO',
    '/images/pho.jpg',
    2,
    'Pho Mazing is another contender for the best pho-maker in town. We are suckers for the brimming bowls of rich beef broth filled with tendon, tripe or rare steak and noodles, sided by heaps of bean sprouts, cilantro and saw-leaf herb. But we also love almost everything else on Pho Mazings menu, including bun (noodle bowls), spring rolls, egg rolls and a plate of thin pork chops, coated in a sweet-savory marinade and grilled crispy.'),
    ('Fiestaritos',
    'Mexican',
    'Lincoln',
    'NE',
    '/images/mexican.png',
    1,
    'Drop into Fiestaritos in Lincoln and you’re likely to receive a serviceable plate of roast pork, but the tastiness seems to stop there. "I truly feel as though I wasted $16 on mofongo, which was dry and oily at the same time," wrote a Yelp reviewer. "Hard to do if you ask me, and the steak sandwich which was just a slab of ill tasting beef covered with spaghetti sauce and cheese. Again terrible." The real horror show, however, appears to be taking place in the kitchen. On Aug. 22 of this year, the restaurant racked up 70 violations, including live flies, a warm walk-in cooler, 75 live roaches behind the sink and 15 under the cook’s line, rodents, mold in the ice machine, and no soap at the hand-washing station. When a news crew arrived a week later to see if they’d cleaned up, they were left waiting for an hour and weren’t allowed to see the kitchen, but did spot a dead lizard in the dining room.');

insert into reviews (res_id, rev_name, rev_date, rating, review)
  values
  (1, 'Jane Smith', '2016-02-27', 5, 'I loved this place!'), (1, 'Joe Schmoe', '2016-02-26', 3, 'It was alright. The rice was dry.')
