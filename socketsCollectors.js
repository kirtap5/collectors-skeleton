function sockets(io, socket, data) {
  socket.on('setupCollectors', function (d) {
    data.createRoom(d.roomId, d.playerCount, d.lang);
  })
  socket.on('collectorsLoaded', function (d) {
    socket.join(d.roomId);
    if (data.joinGame(d.roomId, d.playerId)) {
      socket.emit('collectorsInitialize', {
        labels: data.getUILabels(d.roomId),
        players: data.getPlayers(d.roomId),
        itemsOnSale: data.getItemsOnSale(d.roomId),
        marketValues: data.getMarketValues(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId),
        auctionCards: data.getAuctionCards(d.roomId),
        placements: data.getPlacements(d.roomId)
      });
    }
  });
  socket.on('collectorsDrawCard', function (d) {
    io.to(d.roomId).emit('collectorsCardDrawn',
      data.drawCard(d.roomId, d.playerId)
    );
  });

  socket.on('startNextRound', function (d) {
    data.startNextRound(d.roomId)
    io.to(d.roomId).emit('nextRoundStarted', {
      rotatedCards: data.rotateCards(d.roomId),
      marketValues: data.getMarketValues(d.roomId),
      nextRound: data.getNextRound(d.roomId),
      placement: data.getPlacements(d.roomId),
      players: data.getPlayers(d.roomId),
      round: data.getRound(d.roomId)
    });
  });

  socket.on('collectorsBuyCard', function (d) {
    data.buyCard(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsCardBought', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      itemsOnSale: data.getItemsOnSale(d.roomId),
      nextRound: data.getNextRound(d.roomId)
    }
    );
  });

  socket.on('buyRaiseValue', function (d) {
    data.buyRaiseValue(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('raiseValueBought', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      skillsOnSale: data.getSkillsOnSale(d.roomId),
      auctionCards: data.getAuctionCards(d.roomId),
      marketValues: data.getMarketValues(d.roomId),
    });
  });

  socket.on('collectorsBuySkillCard', function (d) {
    data.buySkillCard(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsSkillCardBought', { 
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId),
        nextRound: data.getNextRound(d.roomId)
      }
    );
  });
  socket.on('collectorsBuyAuctionCard', function(d) {
    data.buyAuctionCard(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsAuctionCardBought', { 
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        auctionCards: data.getAuctionCards(d.roomId), 
        upForAuction: data.getUpForAuctionCards(d.roomId)
      }
    );
  });

  socket.on('collectorsAuctionToHand', function(d) {
    data.auctionToHand(d.roomId, d.playerId, d.card, d.cost, d.destination)
    io.to(d.roomId).emit('collectorsAuctionSentToHand', { 
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        auctionCards: data.getAuctionCards(d.roomId),
        upForAuction: data.getUpForAuctionCards(d.roomId),
      }
    );
  });

  socket.on('collectorsPlaceBottle', function (d) {
    data.placeBottle(d.roomId, d.playerId, d.action, d.cost);
    io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId));
  });

  socket.on('collectorsPlaceBid', function (d) {
    data.placeBid(d.roomId, d.playerId, d.bid);
    io.to(d.roomId).emit('collectorsPlacedBid', { 
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      bid: d.bid
    });
  });

  socket.on('collectorsPassed', function (d) {
    data.passed(d.roomId, d.playerId, d.action);
    io.to(d.roomId).emit('collectorsPassedBid', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
      upForAuction: data.getUpForAuctionCards(d.roomId)
    });
  });
}

module.exports = sockets;