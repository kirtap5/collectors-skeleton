'use strict';

let csv = require("csvtojson");

let collectorsDeck = "collectors-cards";
let languages = ["en", "se"];
/* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
  this.rooms = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

/*
  Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({ checkType: true })
    .fromFile("./data/" + table + ".csv")
    .then((jsonObj) => {
      this.data[table] = jsonObj;
    });
};

Data.prototype.initializeData = function () {
  console.log("Starting to build data tables");
  for (let i in languages) {
    this.initializeTable(collectorsDeck);
  }
}

Data.prototype.getUILabels = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let lang = room.lang;
    var ui = require("./data/collectors-" + lang + ".json");
    return ui;
  } else return {};
}

Data.prototype.createRoom = function (roomId, playerCount, lang = "en") {
  let room = {};
  room.players = {};
  room.lang = lang;
  room.deck = this.createDeck(lang);
  room.playerCount = playerCount;
  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  room.auctionCards = room.deck.splice(0, 4);
  room.market = [];
  room.buyPlacement = [{ cost: 1, playerId: null },
  { cost: 1, playerId: null },
  { cost: 2, playerId: null },
  { cost: 2, playerId: null },
  { cost: 3, playerId: null }];
  room.skillPlacement = [{ cost: 0, playerId: null },
  { cost: 0, playerId: null },
  { cost: 0, playerId: null },
  { cost: 1, playerId: null },
  { cost: 1, playerId: null }];
  room.auctionPlacement = [{ cost: -2, playerId: null },
  { cost: -1, playerId: null },
  { cost: 0, playerId: null },
  { cost: 0, playerId: null }];
  room.marketPlacement = [{ cost: 0, playerId: null },
  { cost: 2, playerId: null },
  { cost: 0, playerId: null }];
  this.rooms[roomId] = room;
}

Data.prototype.createDeck = function () {
  // we want a copy of the deck array, not a reference to it so we use the
  // spread operator (...) to copy the items. Note that this is a shallow copy
  // so it is not generalizable to all copy problems
  let deck = [...this.data[collectorsDeck]];
  return shuffle(deck);
}

Data.prototype.joinGame = function (roomId, playerId) {
  let room = this.rooms[roomId];
  let colors = ['CornflowerBlue', 'DarkSeaGreen', 'Hotpink', 'Lavender']; //ÄNDRA FÄRGER HÄR!!!
  if (typeof room !== 'undefined') {
    if (typeof room.players[playerId] !== 'undefined') {
      console.log("Player", playerId, "joined again with info", room.players[playerId]);
      return true;
    } else if (Object.keys(room.players).length < room.playerCount) {
      console.log("Player", playerId, "joined for the first time");
      room.players[playerId] = {
        hand: [],
        money: 1,
        points: 0,
        skills: [],
        items: [],
        income: [],
        secret: [],
        color: colors[Object.keys(room.players).length]
      };
      return true;
    }
    console.log("Player", playerId, "was declined due to player limit");
  }
  return false;
}

Data.prototype.getPlayers = function (id) {
  let room = this.rooms[id]
  if (typeof room !== 'undefined') {
    return room.players;
  } else return {};
}

Data.prototype.updatePoints = function (roomId, player, points) {
  let room = this.rooms[roomId]
  if (typeof room !== 'undefined') {
    room.points[player] += points;
    return room.points;
  } else return {};
}

/* returns players after a new card is drawn */
Data.prototype.drawCard = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let card = room.deck.pop();
    room.players[playerId].hand.push(card);
    return room.players;
  } else return [];
}

Data.prototype.rotateCards = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {

    this.rotateItems(room);
    this.rotateSkills(room);
    this.rotateAuction(room);

    this.refillItems(room);
    this.refillSkills(room);
    this.refillAuction(room);

    // FIX add raise value to everything
    return {
      itemsOnSale: room.itemsOnSale,
      skillsOnSale: room.skillsOnSale,
      auctionCards: room.auctionCards,
    }
  } else return [];
}
Data.prototype.rotateItems = function (room) {
  let card = room.itemsOnSale.pop();
  room.skillsOnSale.unshift(card);
}

Data.prototype.rotateSkills = function (room) {
  let card = room.skillsOnSale.pop();
  room.market.push(card);

}

Data.prototype.rotateAuction = function (room) {
  let card = room.auctionCards.pop();
  room.market.push(card);

}

Data.prototype.refillItems = function (room) {
    for (let i in room.itemsOnSale) {
      if (room.itemsOnSale[i].item === undefined) {
        let card = room.deck.pop();
        room.itemsOnSale.splice(i, 1);
        room.itemsOnSale.unshift(card);
      }
    }
    while (room.itemsOnSale.length < 5) {
      let card = room.deck.pop();
      room.itemsOnSale.unshift(card);
    }
}
Data.prototype.refillSkills = function (room) {
  for (let i in room.skillsOnSale) {
    if (room.skillsOnSale[i].item === undefined) {
      let card = room.deck.pop();
      room.skillsOnSale.unshift(card);
    }
  }
  while (room.skillsOnSale.length < 5) {
    let card = room.deck.pop();
    room.skillsOnSale.unshift(card);
  }
}
Data.prototype.refillAuction = function (room) {
  for (let i in room.auctionCards) {
    if (room.auctionCards[i].item === undefined) {

      let card = room.deck.pop();
      room.auctionCards.splice(i, 1);
      room.auctionCards.unshift(card);
    }
  }
  while (room.auctionCards.length < 4) {
    let card = room.deck.pop();
    room.auctionCards.unshift(card);
  }
}

/* moves card from itemsOnSale to a player's hand */
Data.prototype.buyCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.itemsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.itemsOnSale[i].x === card.x &&
        room.itemsOnSale[i].y === card.y) {
        c = room.itemsOnSale.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    room.players[playerId].items.push(...c);
    room.players[playerId].money -= cost;

  }
}

Data.prototype.buySkillCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let d = null;
    console.log('DH BSC innan for1')
    console.log(room.skillsOnSale.length)
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.skillsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.skillsOnSale[i].x === card.x &&
        room.skillsOnSale[i].y === card.y) {
        d = room.skillsOnSale.splice(i, 1, {});
        break;
      }  
    }
    console.log(room.skillsOnSale.length)
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        d = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    room.players[playerId].skills.push(...d);
    room.players[playerId].money -= cost;

  }
}

Data.prototype.placeBottle = function (roomId, playerId, action, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let activePlacement = [];
    if (action === "buy") {
      activePlacement = room.buyPlacement;
    } else if (action === "skill") {
      activePlacement = room.skillPlacement;
    } else if (action === "auction") {
      activePlacement = room.auctionPlacement;
    } else if (action === "market") {
      activePlacement = room.marketPlacement;
    }
    for (let i = 0; i < activePlacement.length; i += 1) {
      if (activePlacement[i].cost === cost &&
        activePlacement[i].playerId === null) {
        activePlacement[i].playerId = playerId;
        break;
      }
    }
  }
}
/* returns the hand of the player */
Data.prototype.getCards = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let i = room.players.map(d => d.playerId).indexOf(playerId)
    return room.players[i].hand;
  } else return [];
}

Data.prototype.getPlacements = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return {
      buyPlacement: room.buyPlacement,
      skillPlacement: room.skillPlacement,
      auctionPlacement: room.auctionPlacement,
      marketPlacement: room.marketPlacement
    }
  } else return {};
}

Data.prototype.getItemsOnSale = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.itemsOnSale;
  } else return [];
}

Data.prototype.getMarketValues = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.market.reduce(function (acc, curr) {
    
      curr.market == "fastaval" ? acc.fastaval += 1 : null
      curr.market == "movie" ? acc.movie += 1 : null
      curr.market == "technology" ? acc.technology += 1 : null
      curr.market == "figures" ? acc.figures += 1 : null
      curr.market == "music" ? acc.music += 1 : null

       return acc;
    }, {
      "fastaval": 0,
      "movie": 0,
      "technology": 0,
      "figures": 0,
      "music": 0
    });
  } else return [];
}

Data.prototype.getSkillsOnSale = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.skillsOnSale;
  } else return [];
}

Data.prototype.getAuctionCards = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.auctionCards;
  } else return [];
}

module.exports = Data;