/* ------------------------------------------------------------------
   Clyde Kebab & Grill — menu data
   Transcribed from the in-store menu boards (images/boards/).
   Edit prices / names / descriptions here. The page renders from this.
   no    = item number on the menu board
   price = single price, or sizes = [["SML", 14], ["MED", 17], ...]
   img   = photo in images/dishes/ (optional)
   tags: v = vegetarian, gf = gluten free, hot = spicy, fav = popular
------------------------------------------------------------------- */
window.MENU = [
  {
    id: "kebabs",
    name: "Kebabs & Rolls",
    blurb: "Wrapped fresh to order. Kebabs are $12 each, any filling.",
    items: [
      { no: 1, name: "Kebab", price: 12, desc: "Chicken, lamb, mix or falafel. $12 each.", tags: ["fav"], img: "kebab" },
      { no: 2, name: "Samosa", price: 3, desc: "Fried pastry with a savoury filling.", tags: [], img: "samosa" },
      { no: 3, name: "Chicken Shish Roll", price: 15, desc: "Grilled chicken shish with salad, rolled up.", tags: [], img: "roll-chicken" },
      { no: 4, name: "Lamb Shish Roll", price: 16, desc: "Grilled lamb shish with salad, rolled up.", tags: [], img: "roll-lamb" },
      { no: 5, name: "Adana Shish Roll", price: 15, desc: "Adana skewer with salad, rolled up.", tags: [], img: "roll-adana" },
      { no: 6, name: "Chicken Paratha Roll", price: 18, desc: "Chicken rolled in a paratha with salad.", tags: [], img: "roll-paratha" }
    ]
  },
  {
    id: "deals",
    name: "Meal Deals",
    blurb: "Kebabs, chips and drinks for one to four.",
    items: [
      { name: "Deal 1", price: 17, desc: "1 kebab, 1 chips & 1 drink.", tags: [], img: "deal-1" },
      { name: "Deal 2", price: 30, desc: "2 kebabs, 1 chips & 2 drinks.", tags: [], img: "deal-2" },
      { name: "Deal 3", price: 42, desc: "3 kebabs, 1 chips & 3 drinks.", tags: [], img: "deal-3" },
      { name: "Deal 4", price: 58, desc: "4 kebabs, 1 chips & 4 drinks.", tags: ["fav"], img: "deal-4" }
    ]
  },
  {
    id: "hsp",
    name: "HSP, Chips & Boxes",
    blurb: "Loaded with flavours. Pick your size.",
    items: [
      { no: 7, name: "HSP", sizes: [["SML", 14], ["MED", 17], ["LRG", 24]], desc: "Chicken, lamb or mix over chips with cheese and sauces.", tags: ["fav"], img: "hsp" },
      { no: 8, name: "Chips", sizes: [["SML", 6], ["MED", 8], ["LRG", 10], ["XLRG", 14]], desc: "Hot, golden chips.", tags: [], img: "chips" },
      { no: 9, name: "Chicken with Rice Mix", sizes: [["SML", 12], ["MED", 14], ["LRG", 16]], desc: "Kebab chicken served over rice.", tags: [], img: "rice-mix" },
      { no: 10, name: "Escalope Potato", sizes: [["SML", 6.5], ["MED", 8.5], ["LRG", 10.5]], desc: "", tags: [], img: "escalope" }
    ]
  },
  {
    id: "shish",
    name: "Shish Plates",
    blurb: "Skewers off the grill with salad or rice, bread and sauce.",
    items: [
      { no: 11, name: "Shish Plate 1", price: 28, desc: "Shish plate with salad and 2 skewers, with drinks, chips & sauce.", tags: ["fav"], img: "shish-1" },
      { no: 12, name: "Shish Plate 2", price: 38, desc: "Shish plate with salad and 3 skewers, with drinks, chips & sauce.", tags: [], img: "shish-2" },
      { no: 13, name: "Shish Plate 3", price: 40, desc: "Shish plate with rice and 3 skewers, with drinks, chips & sauce.", tags: [], img: "shish-3" },
      { no: 14, name: "Shish Plate 4", price: 30, desc: "Shish plate with rice and 3 skewers, with sauce.", tags: [], img: "shish-4" }
    ]
  },
  {
    id: "plates",
    name: "Plates, Gozleme & Burgers",
    blurb: "Plates, breads and burgers made to order.",
    items: [
      { no: 15, name: "Falafel Plate", price: 17, desc: "Falafel with salad, lemon and bread.", tags: ["v"], img: "falafel-plate" },
      { no: 16, name: "Chicken Bread", price: 12, desc: "Baked bread filled with chicken.", tags: [], img: "chicken-bread" },
      { no: 17, name: "Gozleme Combo", price: 17, desc: "Gozleme with chips and a drink.", tags: [], img: "gozleme-combo" },
      { no: 18, name: "Schnitzel Plate", price: 18, desc: "Chicken schnitzel with chips and salad.", tags: [], img: "schnitzel-plate" },
      { no: 19, name: "Schnitzel Burger", price: 14, desc: "Crumbed chicken schnitzel, cheese and salad in a sesame bun.", tags: [], img: "schnitzel-burger" },
      { no: 20, name: "Gozleme", price: 12, desc: "Grilled Turkish flatbread.", tags: [], img: "gozleme" },
      { no: 20, name: "Bolani", price: 10, desc: "Stuffed Afghan flatbread.", tags: [], img: "gozleme" }
    ]
  },
  {
    id: "hot",
    name: "Hot Dishes",
    blurb: "Fish-and-chip shop favourites, priced per piece.",
    items: [
      { no: 21, name: "Dim Sim", price: 2.8, desc: "", tags: [] },
      { no: 22, name: "Nuggets", price: 1.5, desc: "", tags: [] },
      { no: 23, name: "Pineapple Fritters", price: 2.5, desc: "", tags: [] },
      { no: 24, name: "Potato Cakes", price: 1.5, desc: "", tags: [] },
      { no: 25, name: "Chicken Strips", price: 2.5, desc: "", tags: [] },
      { no: 26, name: "Roasted Potato", price: 1.8, desc: "", tags: [] },
      { no: 27, name: "Roasted Pumpkin", price: 2.5, desc: "", tags: [] },
      { no: 28, name: "Chicken Roll", price: 10.5, desc: "", tags: [] },
      { no: 29, name: "Salad & Chips", price: 14.5, desc: "", tags: [] },
      { no: 30, name: "5 Nuggets & Chips", price: 12.5, desc: "", tags: [] },
      { no: 31, name: "3 Chicken Strips & Chips", price: 14, desc: "", tags: [] }
    ]
  },
  {
    id: "chicken",
    name: "Grilled Chicken",
    blurb: "Made with perfection. Whole, half or quarter.",
    items: [
      { no: 32, name: "Whole Grill Chicken", price: 20, desc: "A whole grilled chicken.", tags: ["fav"], img: "chicken-whole" },
      { no: 33, name: "Half Grill Chicken", price: 12, desc: "Half a grilled chicken.", tags: [], img: "chicken-half" },
      { no: 34, name: "Quarter Grill Chicken", price: 8, desc: "A quarter grilled chicken.", tags: [], img: "chicken-quarter" },
      { no: 35, name: "Quarter Grill Chicken with Rice", price: 13, desc: "A quarter grilled chicken on rice.", tags: [], img: "chicken-quarter-rice" },
      { no: 36, name: "Half Grill Chicken with Rice", price: 18, desc: "Half a grilled chicken on rice.", tags: [], img: "chicken-half-rice" },
      { no: 37, name: "Grill Chicken Family Deal 1", price: 52, desc: "Whole chicken with 2 cans, 1 large chips, salad, rice & large gravy.", tags: ["fav"], img: "chicken-whole" },
      { no: 38, name: "Grill Chicken Family Deal 2", price: 30, desc: "Half chicken with 1 can, 1 medium chips, salad, rice & medium gravy.", tags: [], img: "chicken-half" }
    ]
  },
  {
    id: "salads",
    name: "Salads",
    blurb: "Every salad comes in small ($7), medium ($9) or large ($11).",
    items: [
      { no: 39, name: "Greek Salad", sizes: [["S", 7], ["M", 9], ["L", 11]], desc: "", tags: [] },
      { no: 40, name: "Seafood Salad", sizes: [["S", 7], ["M", 9], ["L", 11]], desc: "", tags: [] },
      { no: 41, name: "Egg Salad", sizes: [["S", 7], ["M", 9], ["L", 11]], desc: "", tags: [] },
      { no: 42, name: "Tabouli Salad", sizes: [["S", 7], ["M", 9], ["L", 11]], desc: "", tags: [] },
      { no: 43, name: "Macaroni Salad", sizes: [["S", 7], ["M", 9], ["L", 11]], desc: "", tags: [] },
      { no: 44, name: "Potato Salad", sizes: [["S", 7], ["M", 9], ["L", 11]], desc: "", tags: [] },
      { no: 45, name: "Coleslaw Salad", sizes: [["S", 7], ["M", 9], ["L", 11]], desc: "", tags: [] }
    ]
  }
];
