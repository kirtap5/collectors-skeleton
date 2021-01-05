<template>
  <div id="item-section" class="board-section">
    <InfoButtons :modalProps="buyItemProps" />
    <div class="buy-cards">
      <div class="cardslots" v-for="(card, index) in itemsOnSale" :key="index">
        <CollectorsCard
          :card="card"
          :availableAction="card.available"
          @doAction="selectAction(card)"
        />
        <!-- <p> + {{ cardCost(card) }}</p> -->
      </div>
    </div>

    <div class="button-section">
      <div class="buttons" v-for="(p, index) in placement" :key="index">
        <button
          v-if="p.playerId === null"
          :disabled="buttonDisabled(p.cost)"
          @click="placeBottle(p)"
        >
          ${{ p.cost }}
        </button>
        <div class="clickedButton" v-if="p.playerId !== null && typeof players !== 'undefined'" :style="{backgroundColor: players[p.playerId].color}">
          
            {{ p.playerId }}
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoButtons from "../components/InfoButtons.vue";
import CollectorsCard from "@/components/CollectorsCard.vue";

export default {
  name: "ItemSection",
  components: {
    CollectorsCard,
    InfoButtons,
  },
  props: {
    labels: Object,
    player: Object,
    itemsOnSale: Array,
    marketValues: Object,
    placement: Array,
    players: Object,
  },

  data: function () {
    return {
      buyItemProps: {
        value: "Buy Items",
        text:
          "Pick one card from the item pool or from your hand. Tuck the chosen card under your player board from above to show that this card represents an item you have bought. In addition to the cost in the action space, you must pay $1 per card in the Market pool that has the same symbol as the item you just bought. There is no upper limit in the number of items you may own.",
        title: "Buy Items",
        classes: "button red",
      },
    };
  },

  methods: {
    buttonDisabled: function (cost) {
      if (
        this.cannotAfford(cost) ||
        !this.player.active ||
        this.player.availableBottles == 0
      ) {
        return true;
      } else return false;
    },
    cannotAfford: function (cost) {
      let minCost = 100;
      for (let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
          minCost = cost + this.marketValues[key];
      }
      return this.player.money < minCost;
    },
    cardCost: function (card) {
      return this.marketValues[card.item];
    },
    placeBottle: function (p) {

      this.$emit("placeBottle", p.cost);
      this.highlightAvailableCards(p.cost);
    },
    highlightAvailableCards: function (cost = 100) {
      for (let i = 0; i < this.itemsOnSale.length; i += 1) {
        if (
          this.marketValues[this.itemsOnSale[i].item] <=
          this.player.money - cost
        ) {
          this.$set(this.itemsOnSale[i], "available", true);
        } else {
          this.$set(this.itemsOnSale[i], "available", false);
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
    selectAction: function (card) {
      if (card.available) {
        this.$emit("selectAction", card);
        this.highlightAvailableCards();
      }
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

.clickedButton {
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  text-align: center;
  align-items: flex-start;
  color: black;
}

.board-section {
  width: 50%;
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #19181850;
}

#item-section {
  background-color: #ea9999ff;
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