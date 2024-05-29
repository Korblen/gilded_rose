const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {
  it("should update the quality and sellIn correctly for all items", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const gildedRose = new Shop(items);
    const days = Number(process.argv[2]) || 2;

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  it("should increase quality by 3 when there are 5 days or less for Backstage passes", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 45)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(48);
  });

  it("should not change the quality of Sulfuras", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
  });

  it("should degrade quality twice as fast after sellIn date has passed", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(8);
  });

  it("should not reduce quality below 0", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("should increase the quality of Aged Brie over time", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(1);
  });

  it("should not increase the quality of an item above 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("should degrade Conjured items twice as fast as normal items", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
  });
});
