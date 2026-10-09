/* ------------------------------------------------------------------
   Clyde Kebab & Grill — menu data
   Copied exactly from the in-store menu boards (images/boards/):
   only the items, prices and wording on the boards, nothing added.
   The page renders from this file.
   no    = item number on the menu board
   price = single price, or sizes = [["SML", 14], ["MED", 17], ...]
   desc  = the text printed on the board (empty if the board has none)
   img   = photo in images/dishes/ (optional)
   tags: v = vegetarian, gf = gluten free, hot = spicy, fav = popular (none on the boards)
------------------------------------------------------------------- */
window.MENU = [
  {
    id: "kebab",
    name: "Kebab & Samosa",
    blurb: "",
    items: [
      { no: 1, name: "Kebab", price: 12, desc: "Chicken | Lamb | Mix | Falafel. $12 each.", tags: [], img: "kebab" },
      { no: 2, name: "Samosa", price: 3, desc: "Fried pastry with a savory filling.", tags: [], img: "samosa" }
    ]
  },
  {
    id: "deals",
    name: "Deals",
    blurb: "",
    items: [
      { name: "Deal 1", price: 17, desc: "1 Kebab, 1 Chips & 1 Drink", tags: [], img: "deal-1" },
      { name: "Deal 2", price: 30, desc: "2 Kebabs, 1 Chips & 2 Drinks", tags: [], img: "deal-2" },
      { name: "Deal 3", price: 42, desc: "3 Kebabs, 1 Chips & 3 Drinks", tags: [], img: "deal-3" },
      { name: "Deal 4", price: 58, desc: "4 Kebabs, 1 Chips & 4 Drinks", tags: [], img: "deal-4" }
    ]
  },
  {
    id: "rolls",
    name: "Kebab Roll",
    blurb: "",
    items: [
      { no: 3, name: "Chicken Shish Roll", price: 15, desc: "", tags: [], img: "roll-chicken" },
      { no: 4, name: "Lamb Shish Roll", price: 16, desc: "", tags: [], img: "roll-lamb" },
      { no: 5, name: "Adana Shish Roll", price: 15, desc: "", tags: [], img: "roll-adana" },
      { no: 6, name: "Chicken Paratha Roll", price: 18, desc: "", tags: [], img: "roll-paratha" }
    ]
  },
  {
    id: "hsp",
    name: "HSP & Chips",
    blurb: "",
    items: [
      { no: 7, name: "HSP", sizes: [["SML", 14], ["MED", 17], ["LRG", 24]], desc: "Chicken, Lamb & Mix", tags: [], img: "hsp" },
      { no: 8, name: "Chips", sizes: [["SML", 6], ["MED", 8], ["LRG", 10], ["XLRG", 14]], desc: "", tags: [], img: "chips" },
      { no: 9, name: "Chicken with Rice Mix", sizes: [["SML", 12], ["MED", 14], ["LRG", 16]], desc: "", tags: [], img: "rice-mix" },
      { no: 10, name: "Escalope Potato", sizes: [["SML", 6.5], ["MED", 8.5], ["LRG", 10.5]], desc: "", tags: [], img: "escalope" }
    ]
  },
  {
    id: "shish",
    name: "Shish Plates",
    blurb: "",
    items: [
      { no: 11, name: "Shish Plate 1", price: 28, desc: "Shish plate with Salad 2 skewer with Drinks, Chips & Sauce", tags: [], img: "shish-1" },
      { no: 12, name: "Shish Plate 2", price: 38, desc: "Shish plate with Salad 3 skewer with Drinks, Chips & Sauce", tags: [], img: "shish-2" },
      { no: 13, name: "Shish Plate 3", price: 40, desc: "Shish plate with Rice 3 skewer with Drinks, Chips & Sauce", tags: [], img: "shish-3" },
      { no: 14, name: "Shish Plate 4", price: 30, desc: "Shish plate rice and 3 skewer with sauce", tags: [], img: "shish-4" }
    ]
  },
  {
    id: "plates",
    name: "Plates, Gozleme & Burger",
    blurb: "",
    items: [
      { no: 15, name: "Falafel Plate", price: 17, desc: "", tags: [], img: "falafel-plate" },
      { no: 16, name: "Chicken Bread", price: 12, desc: "", tags: [], img: "chicken-bread" },
      { no: 17, name: "Gozleme Combo", price: 17, desc: "", tags: [], img: "gozleme-combo" },
      { no: 18, name: "Schnitzel Plate", price: 18, desc: "", tags: [], img: "schnitzel-plate" },
      { no: 19, name: "Schnitzel Burger", price: 14, desc: "", tags: [], img: "schnitzel-burger" },
      { no: 20, name: "Gozleme", price: 12, desc: "", tags: [], img: "gozleme" },
      { no: 20, name: "Bolani", price: 10, desc: "", tags: [], img: "gozleme" }
    ]
  },
  {
    id: "hot",
    name: "Hot Dishes",
    blurb: "",
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
    name: "Grill Chicken",
    blurb: "",
    items: [
      { no: 32, name: "Whole Grill Chicken", price: 20, desc: "", tags: [], img: "chicken-whole" },
      { no: 33, name: "Half Grill Chicken", price: 12, desc: "", tags: [], img: "chicken-half" },
      { no: 34, name: "Quarter Grill Chicken", price: 8, desc: "", tags: [], img: "chicken-quarter" },
      { no: 35, name: "Quarter Grill Chicken with Rice", price: 13, desc: "", tags: [], img: "chicken-quarter-rice" },
      { no: 36, name: "Half Grill Chicken with Rice", price: 18, desc: "", tags: [], img: "chicken-half-rice" },
      { no: 37, name: "Grill Chicken Family Deal 1", price: 52, desc: "Whole chicken with 2 can, 1 large chips, salad, rice & large gravy", tags: [], img: "chicken-whole" },
      { no: 38, name: "Grill Chicken Family Deal 2", price: 30, desc: "Half chicken with 1 can, 1 Medium chips, salad, rice & medium gravy", tags: [], img: "chicken-half" }
    ]
  },
  {
    id: "salad",
    name: "Salad",
    blurb: "",
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
