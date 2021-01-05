<template>
  <div id="RaiseValueSection" class="board-section">
    <InfoButtons :modalProps="raiseValueProps" />
    <div class="raise-value-slot-container">
      <div class="raise-value-slot" id="rvFastaval"></div>
      <div class="raise-value-slot" id="rvMovie"></div>
      <div class="raise-value-slot" id="rvTechnology"></div>
      <div class="raise-value-slot" id="rvFigures"></div>
      <div class="raise-value-slot" id="rvMusic"></div>
      <p>{{ marketValues.fastaval }}</p>
      <p>{{ marketValues.movie }}</p>
      <p>{{ marketValues.technology }}</p>
      <p>{{ marketValues.figures }}</p>
      <p>{{ marketValues.music }}</p>
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
import InfoButtons from "../components/InfoButtons.vue";

export default {
  name: "RaiseValueSection",
  components: {
    InfoButtons,
  },
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
    auctionCards: Array,
    marketValues: Object,
    placement: Array,
  },
  data: function () {
    return {
      raiseValueProps: {
        value: "Raise Value",
        text:
          "When executing this action, you must place cards in the market pool equal to the number of seals on your action space (one or two cards). You may place cards from your hand, from the card in the lowest position in the skill pool, or from the lowest card in the auction pool. When you place a card in the market pool, you tuck the cards under the icon on the game board that matches the icon on the bottom left of the card",
        title: "Raise Value",
        classes: "button blue",
      },
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

      //Ta fram sista kortet i auction
      for (let card of this.auctionCards) {
        card.item != undefined ? (lastAction = card) : null;
      }
      if (this.marketValues[lastAction.item] <= this.player.money - cost) {
        this.$set(lastAction, "available", true);
      } else {
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

.raise-value-slot-container {
  width: 80%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  color: black;
  font-weight: bold;
}
.raise-value-slot {
  background-color: #6d9eebff;
  width: 6vw;
  height: 6vw;
  border-radius: 50%;
  border: 1px solid #19181850;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}
#rvMovie {
  background: url("/images/RAISEVAL-FILM.png");
  background-size: 6vw 6vw;
}
#rvFigures {
  background: url("/images/RAISEVAL-ROBOT.png");
  background-size: 6vw 6vw;
}
#rvTechnology {
  background: url("/images/RAISEVAL-IT.png");
  background-size: 6vw 6vw;
}
#rvMusic {
  background: url("/images/RAISEVAL-MUSIC.png");
  background-size: 6vw 6vw;
}
#rvFastaval {
  background: url("/images/RAISEVAL-PINGVIN.png");
  background-size: 6vw 6vw;
}
</style>
