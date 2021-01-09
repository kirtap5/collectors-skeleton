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
          :disabled="buttonDisabled(p.cost)"
          @click="placeBottle(p)"
        >
          <p>${{ p.cost }} <span v-if="p.chooseTwoCards"> (select two)</span> </p>
        </button>
        <div
          class="clickedButton"
          v-if="p.playerId !== null && typeof players !== 'undefined'"
          :style="{ backgroundColor: players[p.playerId].color }"
        >
          <p>{{ p.playerId }}</p>
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
    players: Object,
  },
  
  computed: {
    raiseValueProps: function () {
      return {
        value: this.labels.raiseval,
        text:
          this.labels.raisevalText,
        title: this.labels.raiseval,
        classes: "button blue",
      };
    },
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
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit("placeBottle", p);
      this.highlightAvailableCards(p.cost);
    },
    highlightAvailableCards: function (cost = 100) {
      let lastSkill;
      let lastAuction;

      //Ta fram sista kortet i skills
      for (let card of this.skillsOnSale) {
        card.item != undefined ? (lastSkill = card) : null;
      }
      if (this.player.money - cost >= 0) {
        this.$set(lastSkill, "available", true);
      } else {
        this.$set(lastSkill, "available", false);
      }
      this.chosenPlacementCost = cost;

      //Ta fram sista kortet i auction
      for (let card of this.auctionCards) {
        card.item != undefined ? (lastAuction = card) : null;
      }
      if (this.player.money - cost >= 0) {
        this.$set(lastAuction, "available", true);
      } else {
        this.$set(lastAuction, "available", false);
      }
      this.chosenPlacementCost = cost;

      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (this.player.money - cost >= 0) {
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
  border-radius: 10px;
  margin: 2px;
}

/*.button-section {
  width: 20%;
}*/

.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
}

.buttons p {
  margin: 0;
}

.clickedButton {
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  text-align: center;
  align-items: flex-start;
  color: black;
}

.raise-value-slot-container {
  width: 80%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  color: black;
  font-size: 80%;
  font-weight: bold;
}
.raise-value-slot {
  background-color: #6d9eebff;
  width: 3vw;
  height: 3vw;
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
  background-size: 3vw 3vw;
}
#rvFigures {
  background: url("/images/RAISEVAL-ROBOT.png");
  background-size: 3vw 3vw;
}
#rvTechnology {
  background: url("/images/RAISEVAL-IT.png");
  background-size: 3vw 3vw;
}
#rvMusic {
  background: url("/images/RAISEVAL-MUSIC.png");
  background-size: 3vw 3vw;
}
#rvFastaval {
  background: url("/images/RAISEVAL-PINGVIN.png");
  background-size: 3vw 3vw;
}
span{
  font-size: 70%;
}
@media only screen and (max-width: 850px) {
  .buttons {
    grid-template-columns: repeat(auto-fill, 30px);
    margin-right: 10px;
  }
  .buttons p{
     font-size: 70%;
  }
}
</style>
