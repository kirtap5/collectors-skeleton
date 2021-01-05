<template>
  <div>
    <div id="auction-section" class="board-section">
      <div class="buy-cards">
        <div
          class="cardslots"
          v-for="(card, index) in auctionCards"
          :key="index"
        >
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="buyAuctionCard(card)"
          />
        </div>
      </div>
      <div class="button-section">
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
            v-if="p.playerId === null"
            :disabled="cannotAfford(p.cost)"
            @click="placeBottle(p)"
          >
            ${{ p.cost }}
          </button>
          <div v-if="p.playerId !== null">
            <!-- {{ p.playerId }} -->
          </div>
        </div>
      </div>
      <div>
        <div class="buy-cards">
          <div
            class="cardslots"
            v-for="(card, index) in upForAuction"
            :key="index"
          >
            <CollectorsCard
              :card="card"
              :availableAction="card.available"
              @doAction="placeBid()"
            />
          </div>
        </div>
        <div class="placeBid-section">
          <button v-on:click="currentBid++">Your bid: {{ currentBid }}</button>
          <button v-on:click="placeBid()">Place bid</button>
          <input type="button" value="Pass" @click="passed()" />
        </div>
        <div>
        Current highets bid:
        {{ highestBid }}
        placed by: 
        {{ highestBiddingPlayer }}
        </div>
        <div>
          <input type="button" value="Send to items" @click="auctionToHand('items')" />
          <input type="button" value="Send to skills" @click="auctionToHand('skills')" />
          <input type="button" value="Send to raiseval" @click="auctionToHand('raiseval')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";

export default {
  name: "AuctionSection",
  components: {
    CollectorsCard,
  },
  props: {
    labels: Object,
    player: Object,
    auctionCards: Array,
    upForAuction: Array,
    marketValues: Object,
    placement: Array,
    highestBid: Number,
    highestBiddingPlayer: String,
  },
  data: function () {
    return {
      currentBid: 0,
    };
  },
  methods: {
    cannotAfford: function (cost) {
      let minCost = 100;
      for (let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
          minCost = cost + this.marketValues[key];
      }
      return this.player.money < minCost;
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit("placeBottle", p.cost);
      this.highlightAvailableCards(p.cost);
    },
    highlightAvailableCards: function (cost = 100) {
      for (let i = 0; i < this.auctionCards.length; i += 1) {
        if (
          this.marketValues[this.auctionCards[i].item] <=
          this.player.money - cost
        ) {
          this.$set(this.auctionCards[i], "available", true);
        } else {
          this.$set(this.auctionCards[i], "available", false);
        }
        this.chosenPlacementCost = cost;
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (
          this.marketValues[this.player.hand[i].item] <=
          this.player.money - cost
        ) {
          this.$set(this.player.hand[i], "available", true);
          this.chosenPlacementCost = cost;
        } else {
          this.$set(this.player.hand[i], "available", false);
          this.chosenPlacementCost = cost;
        }
      }
    },
    buyAuctionCard: function (card) {
      if (card.available) {
        this.$emit("buyAuctionCard", card);
        this.highlightAvailableCards();
      }
    },

    auctionToHand: function (d){
      if (d == 'items'){
        this.$emit("auctionToHand", 'items')
      }
      if (d == 'skills'){
        this.$emit("auctionToHand", 'skills')
      }
      if (d == 'raiseval'){
        this.$emit("auctionToHand", 'raiseval')
      }
      this.highlightAvailableCards();
      this.upForAuction = [];
    },

    placeBid: function () {
      console.log("auctionsection " + this.currentBid);
      this.player.activeBidder = true;
      this.$emit("placeBid", this.currentBid);
    },
    passed: function () {
      console.log("passed");
      this.$emit("passed");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-cards {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.button-section {
  width: 20%;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
}

.board-section {
  width: 100%;
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #19181850;
}

#auction-section {
  background: #114357; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f29492,
    #114357
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f29492,
    #114357
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
</style>
