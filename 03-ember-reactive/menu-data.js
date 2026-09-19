/* ------------------------------------------------------------------
   Clyde Kebab & Grill — menu data
   Edit prices / names / descriptions here. The page renders from this.
   tags: v = vegetarian, gf = gluten free, hot = spicy, fav = popular
------------------------------------------------------------------- */
window.MENU = [
  {
    id: "kebabs",
    name: "Kebabs & Wraps",
    blurb: "Fresh Turkish bread, charcoal meat, crisp salad and our sauces.",
    items: [
      { name: "Lamb Kebab", price: 16, desc: "Charcoal lamb, lettuce, tomato, onion, garlic & chilli sauce.", tags: ["fav"] },
      { name: "Chicken Kebab", price: 15, desc: "Marinated chicken, salad, garlic yoghurt, hot sauce optional.", tags: ["fav"] },
      { name: "Mixed Kebab", price: 17, desc: "Lamb and chicken together, the way regulars order it.", tags: [] },
      { name: "Beef Doner", price: 16, desc: "Shaved beef off the spit, tabouli, hummus, tomato.", tags: [] },
      { name: "Chicken Shish Wrap", price: 17, desc: "Skewered chicken thigh, grilled peppers, garlic sauce.", tags: [] },
      { name: "Falafel Wrap", price: 14, desc: "House falafel, hummus, tabouli, pickled turnip, tahini.", tags: ["v"] }
    ]
  },
  {
    id: "grill",
    name: "Charcoal Grill Plates",
    blurb: "Served with saffron rice, shepherd salad, grilled tomato and bread.",
    items: [
      { name: "Lamb Shish", price: 28, desc: "Cubed lamb marinated overnight, charred over real charcoal.", tags: ["fav", "gf"] },
      { name: "Chicken Shish", price: 26, desc: "Thigh fillet, lemon, garlic, oregano. Juicy every time.", tags: ["gf"] },
      { name: "Adana Kebab", price: 27, desc: "Hand-minced lamb on the flat skewer, red pepper, sumac onion.", tags: ["hot"] },
      { name: "Kofte Plate", price: 26, desc: "Spiced lamb & beef patties, grilled hot and served fast.", tags: [] },
      { name: "Lamb Cutlets", price: 34, desc: "Four cutlets, salted hard, flame-kissed. Our proudest plate.", tags: ["fav", "gf"] },
      { name: "Mixed Grill", price: 36, desc: "Lamb shish, chicken shish, adana and a cutlet. Bring an appetite.", tags: ["fav"] }
    ]
  },
  {
    id: "hsp",
    name: "HSP & Boxes",
    blurb: "Melbourne's favourite. Chips, meat, cheese, three sauces.",
    items: [
      { name: "Small HSP", price: 15, desc: "Chips, your choice of meat, melted cheese, garlic / chilli / BBQ.", tags: ["fav"] },
      { name: "Large HSP", price: 19, desc: "Same, but serious. Feeds one hungry person or two sensible ones.", tags: ["fav"] },
      { name: "Chicken Box", price: 18, desc: "Chicken shish, chips, salad and bread in a box.", tags: [] },
      { name: "Loaded Chips", price: 12, desc: "Chips, cheese, jalapeños, garlic sauce and sumac.", tags: ["v", "hot"] },
      { name: "Family Snack Pack", price: 39, desc: "Tray-sized HSP with mixed meat, for the whole couch.", tags: [] }
    ]
  },
  {
    id: "sides",
    name: "Sides & Dips",
    blurb: "Everything is made in-house each morning.",
    items: [
      { name: "Hummus", price: 8, desc: "Chickpea, tahini, lemon, olive oil. With warm bread.", tags: ["v", "gf"] },
      { name: "Garlic Yoghurt", price: 5, desc: "Thick, sharp, cold.", tags: ["v", "gf"] },
      { name: "Tabouli", price: 8, desc: "Parsley, burghul, tomato, lemon.", tags: ["v"] },
      { name: "Turkish Bread", price: 4, desc: "Baked fresh daily.", tags: ["v"] },
      { name: "Chips", price: 7, desc: "With chicken salt, of course.", tags: ["v"] },
      { name: "Sigara Boregi", price: 10, desc: "Crispy feta & parsley pastry cigars, four pieces.", tags: ["v"] },
      { name: "Grilled Halloumi", price: 11, desc: "Golden, squeaky, drizzled with honey.", tags: ["v", "gf"] }
    ]
  },
  {
    id: "family",
    name: "Family Feasts",
    blurb: "Order ahead for pick-up. Ready in 20 minutes.",
    items: [
      { name: "Feast for Two", price: 59, desc: "Lamb & chicken shish, rice, salad, hummus, bread, two drinks.", tags: [] },
      { name: "Family Feast (4)", price: 99, desc: "Mixed grill platter, two rice, two salads, dips, bread, 1.25L drink.", tags: ["fav"] },
      { name: "Party Platter (8–10)", price: 189, desc: "Skewers by the dozen, kofte, cutlets, all the sides. 24h notice.", tags: [] }
    ]
  },
  {
    id: "sweets",
    name: "Sweets & Drinks",
    blurb: "Finish properly.",
    items: [
      { name: "Baklava (3 pc)", price: 8, desc: "Pistachio, honey syrup, flaky pastry.", tags: ["v"] },
      { name: "Künefe", price: 12, desc: "Shredded pastry, stretchy cheese, syrup. Served hot.", tags: ["v", "fav"] },
      { name: "Turkish Delight", price: 5, desc: "Rose and pistachio.", tags: ["v", "gf"] },
      { name: "Ayran", price: 4, desc: "Salted yoghurt drink, ice cold.", tags: ["v", "gf"] },
      { name: "Turkish Tea / Coffee", price: 4, desc: "Tea in a tulip glass, coffee in a copper cezve.", tags: ["v", "gf"] },
      { name: "Soft Drinks", price: 3.5, desc: "Cans and bottles.", tags: ["v", "gf"] }
    ]
  }
];
