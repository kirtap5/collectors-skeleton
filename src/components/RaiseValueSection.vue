<template>
  <div id="RaiseValueSection" class="board-section">
    <div class="raise-value-slot-container">
      <div class="raise-value-slot">{{ marketValues.fastaval }}</div>
      <div class="raise-value-slot">{{ marketValues.movie }}</div>
      <div class="raise-value-slot">{{ marketValues.technology }}</div>
      <div class="raise-value-slot">{{ marketValues.figures }}</div>
      <div class="raise-value-slot">{{ marketValues.music }}</div>
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
  </div>
</template>

<script>
export default {
  name: "RaiseValueSection",
  components: {},
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
    auctionCards: Array,
    marketValues: Object,
    placement: Array,
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
      //Vilka kort ska vara väljbara här? Skick in rätt props
      let lastSkill;
      let lastAction;
      //Ta fram sista kortet i skills
      for (let card of this.skillsOnSale) {
        card.item != undefined ? (lastSkill = card) : null;
      }
      if (this.marketValues[lastSkill.item] <= this.player.money - cost) {
        this.$set(lastSkill, "available", true);
      } else {
        this.$set(lastSkill, "available", false);
      }
      this.chosenPlacementCost = cost;
      console.log(lastSkill);
      console.log("INNTE I HIGHLIGTHT CARDS");

      //Ta fram sista kortet i auctionSection
      for (let card of this.auctionCards) {
        card.item != undefined ? (lastAction = card) : null;
      }
      if (this.marketValues[lastAction.item] <= this.player.money - cost) {
        this.$set(lastAction, "available", true);
      }  else {
        this.$set(lastAction, "available", false);
      }
      this.chosenPlacementCost = cost;

      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (
          this.marketValues[this.player.hand[i].market] <=
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
    buyCard: function (card) {
      // Kortet ska hamna ner på raise-value-area, inte till item on hand. Ny funktion.
      if (card.available) {
        this.$emit("buyRaiseValue", card);
        this.highlightAvailableCards();
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#RaiseValueSection {
  background-color: #b4a7d6ff;
}
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
  min-height: 100px;
  width: 50%;
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #19181850;
}

.raise-value-slot-container {
  width: 80%;
  display: flex;
  justify-content: space-around;
}
.raise-value-slot {
  background-color: #6d9eebff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #19181850;
}
</style>
