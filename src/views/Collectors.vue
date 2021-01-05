<template>
  <div>
    <main>
      <h1>I am player {{ playerId }}</h1>
      <h1 v-if="players[playerId].active">my turn!</h1>

      <div class="layout_wrapper">
        <div id="game-board">
          <ItemSection
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :currentAction="currentAction"
            :itemsOnSale="itemsOnSale"
            :marketValues="marketValues"
            :placement="buyPlacement"
            :players="players"
            @selectAction="selectAction($event)"
            @placeBottle="placeBottle('itemType', 'buy', $event)"
          />
          <CollectorsBuySkill
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :skillsOnSale="skillsOnSale"
            :marketValues="marketValues"
            :placement="skillPlacement"
            @buySkillCard="buySkillCard($event)"
            @selectAction="selectAction($event)"
            @placeBottle="placeBottle('skillType', 'skill', $event)"
          />
          <RaiseValueSection
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :skillsOnSale="skillsOnSale"
            :marketValues="marketValues"
            :auctionCards="auctionCards"
            :placement="marketPlacement"
            @selectAction="selectAction($event)"
            @placeBottle="placeBottle('marketType', 'buy', $event)"
          />
          <AuctionSection
            v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :auctionCards="auctionCards"
            :upForAuction="upForAuction"
            :marketValues="marketValues"
            :placement="skillPlacement"
            :highestBid="highestBid"
            :highestBiddingPlayer="highestBiddingPlayer"
            :numberOfPasses="numberOfPasses"
            @buyAuctionCard="buyAuctionCard($event)"
            @selectAction="selectAction($event)"
            @placeBid="placeBid($event)"
            @passed="passed($event)"
            @auctionToHand="auctionToHand($event)"
            @placeBottle="placeBottle('auctionType', 'skill', $event)"
          />


          <!-- glöm ej ändra från buy på de ovan-->
        </div>

        <WorkArea
          v-if="players[playerId]"
          :color="players[playerId].color"
          :labels="labels"
          :player="players[playerId]"
          :placement="buyPlacement"
          @circleClicked="circleClicked($event)"
          class="gridWork"
        />
      </div>

      <PlayerBoard v-if="players[playerId]" :player="players[playerId]" />
      <OtherPlayerboards :Players="players" :playerId="playerId" />

      <!--  {{ buyPlacement }} {{ chosenPlacementCost }}-->

      <div class="buttons">
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>
      <div class="my-cards">
        <CollectorsCard
          v-for="(card, index) in myCards"
          :card="card"
          :key="index"
        />
      </div>

      Skills
      <div class="cardslots">
        <CollectorsCard
          v-for="(card, index) in skillsOnSale"
          :card="card"
          :key="index"
        />
      </div>
      Auction
      <div class="cardslots">
        <CollectorsCard
          v-for="(card, index) in auctionCards"
          :card="card"
          :key="index"
        />
      </div>

      <div class="playerboard">
        Items-on-hand
        <div class="cardslots" v-if="players[playerId]">
          <CollectorsCard
            v-for="(card, index) in players[playerId].items"
            :card="card"
            :key="index"
          />
        </div>
        <div>
          Skills-on-hand
          <div class="cardslots" v-if="players[playerId]">
            <CollectorsCard
              v-for="(card, index) in players[playerId].skills"
              :card="card"
              :key="index"
            />
          </div>
        </div>
        Hand
        <div class="cardslots" v-if="players[playerId]">
          <CollectorsCard
            v-for="(card, index) in players[playerId].hand"
            :card="card"
            :availableAction="card.available"
            @doAction="buyCard(card)"
            :key="index"
          />
        </div>
      </div>
    </main>
    {{ players }}
    <!-- <h1>MARKET VALUES: </h1>{{ marketValues }} -->
    <button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
    </button>
    <footer>
      <p>
        {{ labels.invite }}
        <input
          type="text"
          :value="publicPath + $route.path"
          @click="selectAll"
          readonly="readonly"
        />
      </p>
    </footer>
  </div>
</template>

<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from "@/components/CollectorsCard.vue";
import OtherPlayerboards from "@/components/OtherPlayerboards.vue";
import CollectorsBuySkill from "@/components/CollectorsBuySkill.vue";
import WorkArea from "@/components/WorkArea.vue";
import ItemSection from "@/components/ItemSection.vue";
import PlayerBoard from "@/components/PlayerBoard.vue";
import RaiseValueSection from "../components/RaiseValueSection.vue";
import AuctionSection from "../components/AuctionSection.vue";

export default {
  name: "Collectors",
  components: {
    CollectorsCard,
    CollectorsBuySkill,
    WorkArea,
    ItemSection,
    PlayerBoard,
    OtherPlayerboards,
    RaiseValueSection,
    AuctionSection,
  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      nextRound: Boolean,
      highestBid: 0,
      highestBiddingPlayer: '',
      numberOfPasses: 0,
      myCards: [],
      maxSizes: { x: 0, y: 0 },
      labels: {},
      points: {},
      // };
      //   maxSizes: { x: 0,
      //               y: 0 },
      //   labels: {},
      players: {},
      // playerId: {
      //   hand: [],
      //   money: 1,
      //   points: 0,
      //   skills: [],
      //   items: [],
      //   income: [],
      //   secret: []
      // }
      buyPlacement: [],
      skillPlacement: [],
      auctionPlacement: [],
      marketPlacement: [],
      chosenPlacementCost: null,
      currentAction: String,
      marketValues: {
        fastaval: 0,
        movie: 0,
        technology: 0,
        figures: 0,
        music: 0,
      },
      itemsOnSale: [],
      skillsOnSale: [],
      auctionCards: [],
      upForAuction: [],
      playerid: 0,

      buyItemProps: {
        value: "Buy Items",
        text:
          "Pick one card from the item pool or from your hand. Tuck the chosen card under your player board from above to show that this card represents an item you have bought. In addition to the cost in the action space, you must pay $1 per card in the Market pool that has the same symbol as the item you just bought. There is no upper limit in the number of items you may own.",
        title: "Buy Items",
        classes: "button red",
      },
      gainSkillProps: {
        value: "Gain Skills",
        text:
          "Take one of the cards from the skill pool or from your hand and tuck it under your player board from the left. This card will grant you skills for the rest of the game as detailed in the Special skills section below",
        title: "Gain Skills",
        classes: "button green",
      },

      raiseValueProps: {
        value: "Raise Value",
        text:
          "When executing this action, you must place cards in the market pool equal to the number of seals on your action space (one or two cards). You may place cards from your hand, from the card in the lowest position in the skill pool, or from the lowest card in the auction pool. When you place a card in the market pool, you tuck the cards under the icon on the game board that matches the icon on the bottom left of the card",
        title: "Raise Value",
        classes: "button blue",
      },

      workProps: {
        value: "Work",
        text:
          "In the work area, you perform actions to increase your income, recycle bottles, draw cards and become the first player. If you place your bottle in the uppermost action space (on the quarter tile), you must place two cards upside down from your hand next to your player board on its right side. Note that this action space changes characteristics during the fourth quarter to resemble the action spot below it",
        title: "Work",
        classes: "button yellow",
      },

      auctionProps: {
        value: "Auction",
        text:
          "Choose one of the four cards in the Auction pool or one card from your hand and place it in the space reserved for auctioned items. If you placed a card from your hand, you may place it face down. The card remains face down and the auction is performed without any other players knowing what kind of card it is. The player who chose this action may bid any number of coins with a minimum of one. Now the player to their left must place a higher bid or pass. Continue in clockwise order until all players but one has passed. The player that won the auction must pay the bid amount to the supply. When paying for the auction you may use cards from your hands as coins. Cards can be worth $1 or $2 as depicted in the upper right corner of the cards. Note that cards can only be used as coins during an auction. If the card just won was placed face down, the winning player may look at the card without showing it to other players. The player that wins the auction may place the card wherever they want; as an item under their player board, as a market share in the market pool, or as a skill under their player board. If the newly won card was face down, the auction winner may place the card face down as a secret item (next to the one that was chosen during the setup).",
        title: "Auction",
        classes: "button",
      },
    };
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
  },
  watch: {
    players: function (newP, oldP) {
      console.log(newP, oldP);
      for (let p in this.players) {
        for (let c = 0; c < this.players[p].hand.length; c += 1) {
          if (typeof this.players[p].hand[c].item !== "undefined")
            this.$set(this.players[p].hand[c], "available", false);
        }

        for (let c = 0; c < this.skillsOnSale.length; c += 1) {
          if (typeof this.skillsOnSale[c].item !== "undefined")
            this.$set(this.skillsOnSale[c], "available", false);
        }
        for (let c = 0; c < this.auctionCards.length; c += 1) {
          if (typeof this.auctionCards[c].item !== "undefined")
            this.$set(this.auctionCards[c], "available", false);
        }
      }
    },
    nextRound: function () {
      if (this.nextRound) {
        this.startNextRound();
      }
    },
  },
  created: function () {
    this.$store.commit("SET_PLAYER_ID", this.$route.query.id);
    //TODO! Fix this ugly hack
    //background: https://github.com/quasarframework/quasar/issues/5672
    const newRoute = this.$route.params.id + "?id=" + this.playerId;
    if (this.$route.params.id + "?id=" + this.$route.query.id !== newRoute)
      this.$router.push(newRoute);

    this.$store.state.socket.emit("collectorsLoaded", {
      roomId: this.$route.params.id,
      playerId: this.playerId,
    });

    this.$store.state.socket.on(
      "collectorsInitialize",
      function (d) {
        this.labels = d.labels;
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
        this.marketValues = d.marketValues;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsBottlePlaced",
      function (d) {
        this.buyPlacement = d.buyPlacement;
        this.skillPlacement = d.skillPlacement;
        this.marketPlacement = d.marketPlacement;
        this.auctionPlacement = d.auctionPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsPointsUpdated",
      (d) => (this.points = d)
    );

    this.$store.state.socket.on(
      "collectorsCardDrawn",
      function (d) {
        //this has been refactored to not single out one player's cards
        //better to update the state of all cards
        this.players = d;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "nextRoundStarted",
      function (d) {
        this.itemsOnSale = d.rotatedCards.itemsOnSale;
        this.skillsOnSale = d.rotatedCards.skillsOnSale;
        this.auctionCards = d.rotatedCards.auctionCards;
        this.marketValues = d.marketValues;
        this.nextRound = d.nextRound;
        this.players = d.players;
        this.buyPlacement = d.placement.buyPlacement;
        this.skillPlacement = d.placement.skillPlacement;
        this.marketPlacement = d.placement.marketPlacement;
        this.auctionPlacement = d.placement.auctionPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsCardBought",
      function (d) {
        console.log(d.playerId, "bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
        this.nextRound = d.nextRound;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "raiseValueBought",
      function (d) {
        console.log(d.playerId, "bought a Raise Value");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
        this.marketValues = d.marketValues;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsSkillCardBought",
      function (d) {
        console.log(d.playerId, "bought a skill card");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
        this.nextRound = d.nextRound;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsAuctionCardBought",
      function (d) {
        console.log(d.playerId, "Started an Auction");
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.upForAuction = d.upForAuction;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsAuctionSentToHand",
      function (d) {
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.upForAuction = d.upForAuction;
        this.highestBid = d.highestBid;
        this.destination = d.destination;
        this.highestBiddingPlayer = d.highestBiddingPlayer;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsPlacedBid",
      function (d) {
        console.log(d.playerId, "Placed a bid");
        this.players = d.players;
        this.highestBid = d.bid;
        this.highestBiddingPlayer = d.playerId;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsPassedBid",
      function (d) {
        console.log(d.playerId, "Passed a bid");
        this.players = d.players;
        this.upForAuction = d.upForAuction;
      }.bind(this)
    );
  },
  methods: {
    selectAll: function (n) {
      n.target.select();
    },
    selectAction: function (card) {
      this.currentAction == "itemType" ? this.buyCard(card) : null;
      this.currentAction == "skillType" ? this.buySkillCard(card) : null;
      this.currentAction == "marketType" ? this.buyRaiseValue(card) : null;
      this.currentAction == "auctionType" ? this.startAuction(card) : null; //Funktionen existerar inte än
    },
    placeBottle: function (type, action, cost) {
      this.currentAction = type;
      this.chosenPlacementCost = cost;
      this.$store.state.socket.emit("collectorsPlaceBottle", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        action: action,
        cost: cost,
      });
    },
    drawCard: function () {
      this.$store.state.socket.emit("collectorsDrawCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },

    buyRaiseValue: function (card) {
      this.$store.state.socket.emit("buyRaiseValue", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.chosenPlacementCost,
      });
    },

    buyCard: function (card) {
      this.$store.state.socket.emit("collectorsBuyCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
    },
    buySkillCard: function (card) {
      this.$store.state.socket.emit("collectorsBuySkillCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
    },
    buyAuctionCard: function (card) {
      this.$store.state.socket.emit("collectorsBuyAuctionCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
    },
    auctionToHand: function (d) {
      this.$store.state.socket.emit("collectorsAuctionToHand", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: this.upForAuction[0],
        cost: this.highestBid,
        destination: d
      });
    },
    placeBid: function (bid) {
      console.log('collectors.vue ' + bid)
      if(bid > this.highestBid){
      this.$store.state.socket.emit("collectorsPlaceBid", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        bid: bid,
      });
      this.highestBid = bid;
      this.highestBiddingPlayer = this.playerId;
      }
    },
    passed: function () {
      this.$store.state.socket.emit("collectorsPassed", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },
    rotateCards: function () {
      this.$store.state.socket.emit("rotateCards", {});
    },

    startNextRound: function () {
      this.$store.state.socket.emit("startNextRound", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },
  },
};
</script>

<style scoped>
.board-section {
  width: 100%;
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #19181850;
}

header {
  user-select: none;
  position: fixed;
  width: 100%;
  pointer-events: none;
}
main {
  user-select: none;
}

.layout_wrapper {
  display: grid;
  grid-template-columns: 70% 30%;
  /*grid-template-columns: 40% 10%;*/
}

.gridItem {
  grid-column: 1;
  grid-row: 1;
}

/*.gridGame {
  grid-column: 1;
  grid-row: 1;
}*/

.gridWork {
  grid-column: 2;
  /*grid-column: 1;*/
}

.gridOtherBoard {
  grid-column: 3;
  /*grid-column: 2;*/
  /*grid-row: 1;*/
}

.gridPlayerboard {
  grid-column: 1 / span 2;
  grid-row: 2;
}

/*TRANSITION*/
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

footer {
  margin-top: 5em auto;
}
footer a {
  text-decoration: none;
  border-bottom: 2px dotted ivory;
}
footer a:visited {
  color: ivory;
}
.my-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.my-cards div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.my-cards div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
main {
  user-select: none;
}
footer {
  margin-top: 5em auto;
}
footer a {
  text-decoration: none;
  border-bottom: 2px dotted ivory;
}
footer a:visited {
  color: ivory;
}
.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.cardslots div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.cardslots div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}

.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}
.green {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(50, 172, 109, 1) 0%,
    rgba(209, 251, 155, 1) 100.2%
  );
}
.blue {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(147, 230, 241, 1) 0%,
    rgba(145, 192, 241, 1) 45.5%
  );
}
.red {
  background-image: linear-gradient(
    143.3deg,
    rgba(216, 27, 96, 1) 33.1%,
    rgba(237, 107, 154, 1) 74.9%
  );
}
.yellow {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(255, 252, 200, 1) 0%,
    rgba(255, 247, 94, 1) 90%
  );
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.9);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
}

h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

.fade-enter-active,
.fade-leave.active {
  transition: opacity 1.5s;
  /* opacity: 0.9; */
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave.active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}

@media screen and (max-width: 800px) {
  main {
    width: 90vw;
  }
}
</style>
