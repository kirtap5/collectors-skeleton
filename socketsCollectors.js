function sockets(io, socket, data) {
  socket.on('setupCollectors', function (d) {
    data.createRoom(d.roomId, d.playerCount, d.lang);
  })
  socket.on('collectorsLoaded', function (d) {
    socket.join(d.roomId);
    if (data.joinGame(d.roomId, d.playerId)) {
      io.to(d.roomId).emit('collectorsInitialize', {
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
    data.startNextRound(d.roomId, d.playerId)
    io.to(d.roomId).emit('nextRoundStarted', {
      itemsOnSale: data.getItemsOnSale(d.roomId),
      skillsOnSale: data.getSkillsOnSale(d.roomId),
      auctionCards: data.getAuctionCards(d.roomId),
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
    });
  });

  socket.on('buyRaiseValue', function (d) {
    data.buyRaiseValue(d.roomId, d.playerId, d.cards, d.cost)
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
    });
  });

  socket.on('collectorsPlaceBottle', function (d) {
    data.placeBottle(d.roomId, d.playerId, d.action, d.cost, d.id);
    io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId));
  });

  socket.on('getBottleIncome', function (d){
    data.getBottleIncome(d.roomId, d.playerId, d.bottleIncome);
    io.to(d.roomId).emit('bottleIncomeGained', {
      players: data.getPlayers(d.roomId),
      nextRound: data.getNextRound(d.roomId)
    });
  });

  socket.on('countPoints', function (d){
    data.countPoints(d.roomId);
    io.to(d.roomId).emit('pointsCounted', {
      players: data.getPlayers(d.roomId)
    })
  })

  socket.on('collectorsSetSecret', function (d) {
    io.to(d.roomId).emit('pointsCounted' , {
      players: data.setSecret(d.roomId, d.playerId, d.secret)
    })
  })

}
module.exports = sockets;