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
  room.round = 1;
  room.nextRound = false;
  room.lang = lang;
  room.deck = this.createDeck(lang);
  room.playerCount = playerCount;
  room.playerOrder = [];
  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  room.auctionCards = room.deck.splice(0, 4);
  room.market = [];
  room.upForAuction = [];
  room.highestBiddingPlayer = {};
  room.highestBid = 0;
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
  { cost: -2, playerId: null },
  { cost: 0, playerId: null }];
  room.buyPlacement = [{ cost: 1, playerId: null, type: "itemType" },
  { cost: 1, playerId: null, type: "itemType" },
  { cost: 2, playerId: null, type: "itemType" },
  { cost: 2, playerId: null, type: "itemType" },
  { cost: 3, playerId: null, type: "itemType" }];
  room.skillPlacement = [{ cost: 0, playerId: null, type: "skillType" },
  { cost: 0, playerId: null, type: "skillType" },
  { cost: 0, playerId: null, type: "skillType" },
  { cost: 1, playerId: null, type: "skillType" },
  { cost: 1, playerId: null, type: "skillType" }];
  room.auctionPlacement = [{ cost: -2, playerId: null, type: "auctionType" },
  { cost: -1, playerId: null, type: "auctionType" },
  { cost: 0, playerId: null, type: "auctionType" },
  { cost: 0, playerId: null, type: "auctionType" }];
  room.marketPlacement = [{ cost: 0, playerId: null, type: "marketType" },
  { cost: -2, playerId: null, type: "marketType" },
  { cost: 0, playerId: null, type: "marketType" }];
  this.rooms[roomId] = room;

  /*skriv kod för färg i workarea*/
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
        bid: 0,
        color: colors[Object.keys(room.players).length]
      };
      room.playerOrder[Object.keys(room.players).length] = playerId;
      room.players[playerId] = {
        hand: room.deck.splice(0, 3),
        money: 1,
        points: 0,
        skills: [],
        items: [],
        income: [],
        secret: [],
        bid: 0,
        passed: this.setPassedPlayer(roomId),
        color: colors[Object.keys(room.players).length],
        bottles: 2, //ska vara 2!!
        availableBottles: 2, //ska vara 2!!
        active: this.setActivePlayer(roomId),
      };
      return true;
    }
    console.log("Player", playerId, "was declined due to player limit");
  }
  return false;
}


Data.prototype.setNextActivePlayer = function (roomId, activePlayerId) {
  let room = this.rooms[roomId];
  for (let i = 0; i < room.playerOrder.length; i++) {
    if (room.playerOrder[i] == activePlayerId) {
      if (i != room.playerOrder.length - 1) {
        let nextActivePlayer = room.playerOrder[i + 1];
        if (room.players[nextActivePlayer].availableBottles != 0) {
          room.players[nextActivePlayer].active = true;
          return false;
        }
      } else if (i == room.playerOrder.length - 1) {
        let nextActivePlayer = room.playerOrder[0];
        if (room.players[nextActivePlayer].availableBottles != 0) {
          room.players[nextActivePlayer].active = true;
          return false;
        }
      }
    }
  }
  return true;
}

Data.prototype.auctionOver = function (roomId) {
  let room = this.rooms[roomId];
  if (this.passedCheck(roomId)) {
    this.auctionToHand(roomId, room.highestBiddingPlayer, room.upForAuction[0], room.highestBid)
    return true;
  }
  else { return false; }
}

Data.prototype.startNextRound = function (roomId) {
  let room = this.rooms[roomId];
  room.round += 1;
  this.rotateCards(roomId);
  this.resetPlacements(roomId);
  for (let i = 0; i < room.playerOrder.length; i++) {
    room.players[room.playerOrder[i]].availableBottles = room.players[room.playerOrder[i]].bottles;
    room.players[room.playerOrder[i]].money = room.players[room.playerOrder[i]].money + room.players[room.playerOrder[i]].income.length;
  }
  room.players[room.playerOrder[0]].active = true; //första spelaren blir aktiv igen, ändra t den som har token
  room.nextRound = false;
}

Data.prototype.resetPlacements = function (roomId) {
  let room = this.rooms[roomId];
  for (let i = 0; i < room.buyPlacement.length; i += 1) {
    room.buyPlacement[i].playerId = null
  }
  for (let i = 0; i < room.skillPlacement.length; i += 1) {
    room.skillPlacement[i].playerId = null
  }
  for (let i = 0; i < room.auctionPlacement.length; i += 1) {
    room.auctionPlacement[i].playerId = null
  }
  for (let i = 0; i < room.marketPlacement.length; i += 1) {
    room.marketPlacement[i].playerId = null
  }
}
Data.prototype.setActivePlayer = function (roomId) {
  let room = this.rooms[roomId];
  if (Object.keys(room.players).length === 0) {
    return true;
  } else return false;
}
Data.prototype.setPassedPlayer = function (roomId) {
  let room = this.rooms[roomId];
  if (Object.keys(room.players).length === 0) {
    return true;
  } else return false;
}

Data.prototype.passedCheck = function (roomId) {
  let room = this.rooms[roomId];
  let numberOfPass = 0;
  for (let i = 1; i < room.playerOrder.length; i++) {
    if (room.players[room.playerOrder[i]].passed) {
      numberOfPass += 1;
    }
  }
  if (numberOfPass == room.playerOrder.length - 2) {
    return true;
  }
  else {
    return false;
  }
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
    //skickar ett kort från skills respektive auction till market
    this.rotateSkills(room);
    this.rotateAuction(room);
    //tar bort tomma platser i items (så de fylls på rätt sen)
    this.clearItems(room);

    //fyller på kort i skills från items, så många som det finns undefined kort
    this.refillSkills(room);

    //fyller på items från kortleken
    this.refillItems(room);

    //fyller på auction från kortleken
    this.refillAuction(room);
    return {
      skillsOnSale: room.skillsOnSale,
      itemsOnSale: room.itemsOnSale,
      auctionCards: room.auctionCards,
    }
  } else return [];
}

Data.prototype.rotateSkills = function (room) {
  let card = room.skillsOnSale.pop();
  room.market.push(card);
}

Data.prototype.rotateAuction = function (room) {
  let card = room.auctionCards.pop();
  room.market.push(card);

}

Data.prototype.clearItems = function (room) {
  for (let i in room.itemsOnSale) {
    if (room.itemsOnSale[i].item == undefined) {
      room.itemsOnSale.splice(i, 1);
    }
  }
}

Data.prototype.refillItems = function (room) {
  this.clearItems(room);
  while (room.itemsOnSale.length < 5) {
    let card = room.deck.pop();
    room.itemsOnSale.unshift(card);
  }
}

Data.prototype.refillSkills = function (room) {
  for (let i in room.skillsOnSale) {
    if (room.skillsOnSale[i].item == undefined) {
      room.skillsOnSale.splice(i, 1);
    }
  }
  while (room.skillsOnSale.length < 5) {
    if (room.itemsOnSale.length != 0) {
      let card = room.itemsOnSale.pop();
      room.skillsOnSale.unshift(card);
    } else {
      let card = room.deck.pop();
      room.skillsOnSale.unshift(card);
    }
  }

}

Data.prototype.refillAuction = function (room) {
  for (let i in room.auctionCards) {
    if (room.auctionCards[i].item == undefined) {
      room.auctionCards.splice(i, 1);
    }
  }
  while (room.auctionCards.length < 4) {
    let card = room.deck.pop();
    room.auctionCards.unshift(card);
  }
}

Data.prototype.getRound = function (roomId) {
  let room = this.rooms[roomId];
  return room.round
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
    room.players[playerId].active = false;
    room.players[playerId].availableBottles -= 1;
    if (this.setNextActivePlayer(roomId, playerId)) {
      room.nextRound = true;

    }
  }
}
Data.prototype.buyRaiseValue = function (roomId, playerId, card, cost) {

  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the skills on sale
    for (let i = 0; i < room.skillsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.skillsOnSale[i].x === card.x &&
        room.skillsOnSale[i].y === card.y) {
        c = room.skillsOnSale.splice(i, 1, {});
        break;
      }
    }

    for (let i = 0; i < room.auctionCards.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.auctionCards[i].x === card.x &&
        room.auctionCards[i].y === card.y) {
        c = room.auctionCards.splice(i, 1, {});
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
    console.log("Det nuvarande kortet som ska till raiseValue: ");

    room.market.push(c[0]);
    // c[0].market == "fastaval" ? room.market.fastaval += 1 : null
    // c[0].market == "movie" ? room.market.movie += 1 : null
    // c[0].market == "technology" ? room.market.technology += 1 : null
    // c[0].market == "figures" ? room.market.figures += 1 : null
    // c[0].market == "music" ? room.market.music += 1 : null

    console.log(room.market);
    room.players[playerId].money -= cost;
  }
}

Data.prototype.buySkillCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let d = null;
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
    room.players[playerId].active = false;
    room.players[playerId].availableBottles -= 1;
    if (this.setNextActivePlayer(roomId, playerId)) {
      room.nextRound = true;
    }
  }
}

Data.prototype.buyAuctionCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let d = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.auctionCards.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.auctionCards[i].x === card.x &&
        room.auctionCards[i].y === card.y) {
        d = room.auctionCards.splice(i, 1, {});
        break;
      }
    }
    console.log(room.auctionCards.length)
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
    room.upForAuction.push(...d);
    room.players[playerId].money -= cost;
  }
}

Data.prototype.auctionToHand = function (roomId, playerId, card, cost, destination) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    if (destination == 'items' && this.passedCheck(roomId)){
      room.players[playerId].items.push(card);
      room.players[playerId].money -= cost;
      room.highestBid = 0;
      room.highestBiddingPlayer = {};
      room.upForAuction = [];
    }
    if (destination == 'skills' && this.passedCheck(roomId)){
      room.players[playerId].skills.push(card);
      room.players[playerId].money -= cost;
      room.highestBid = 0;
      room.highestBiddingPlayer = {};
      room.upForAuction = [];
    }
    if (destination == 'raiseval' && this.passedCheck(roomId)){
      room.market.push(card);
      room.players[playerId].money -= cost;
      room.highestBid = 0;
      room.highestBiddingPlayer = {};
      room.upForAuction = [];
    }
  }
}

Data.prototype.placeBid = function (roomId, playerId, bid) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].bid += bid;
    if (bid > room.highestBid) {
      room.highestBid = bid;
      room.highestBiddingPlayer = playerId;
    }
    if (this.auctionOver(roomId)) {
      room.setNextActivePlayer = true;
    }
  }
}

Data.prototype.passed = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].passed = true;
    if (this.auctionOver(roomId)) {
      room.setNextActivePlayer = true;
    }
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

Data.prototype.getNextRound = function (roomId) {
  let room = this.rooms[roomId];
  return room.nextRound;
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

Data.prototype.getUpForAuctionCards = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.upForAuction;
  } else return [];
}

module.exports = Data;