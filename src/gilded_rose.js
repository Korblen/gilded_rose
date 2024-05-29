class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;

        if (item.name.startsWith('Conjured')) {
          this.updateConjuredItem(item);
        } else if (item.name === 'Aged Brie') {
          this.updateAgedBrie(item);
        } else if (item.name.startsWith('Backstage passes')) {
          this.updateBackstagePass(item);
        } else {
          this.updateNormalItem(item);
        }
      }
    }
    return this.items;
  }

  updateNormalItem(item) {
    if (item.quality > 0) {
      item.quality -= (item.sellIn < 0) ? 2 : 1;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }
  }

  updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  updateBackstagePass(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality += 3;
    } else if (item.sellIn <= 10) {
      item.quality += 2;
    } else {
      item.quality++;
    }
    if (item.quality > 50) {
      item.quality = 50;
    }
  }

  updateConjuredItem(item) {
    if (item.quality > 0) {
      item.quality -= (item.sellIn < 0) ? 4 : 2;
    }
    if (item.quality < 0) {
      item.quality = 0;
    }
  }
}

module.exports = {
  Item,
  Shop
};
