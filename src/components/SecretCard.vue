<template>
  <div class="secretSection">
    <div class="designWrapper">
      <div id="buttonArea">
        <InfoButtons :modalProps="secretProps" :labels="labels" />
      </div>
      <div id="textArea">
        <h1>{{ labels.secret3 }}</h1>
      </div>
      <div class="card">
        <div
          class="cardslots"
          v-for="(card, index) in player.hand"
          :key="index"
        >
          <CollectorsCard
            :card="card"
            :key="index"
            @doAction="selectAction(card)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";
import InfoButtons from "../components/InfoButtons.vue";

export default {
  name: "SecretCard",
  components: {
    CollectorsCard,
    InfoButtons,
  },
  props: {
    player: Object,
    allCardsChosen: Boolean,
    players: Object,
    labels: Object,
  },

  computed: {
    secretProps: function () {
      return {
        value: "i",
        text: this.labels.secret1,
        title: this.labels.secret2,
        classes: `${this.player.color} smallButton`,
      };
    },
  },

  methods: {
    selectAction: function (card) {
      this.$emit("selectAction", card);
    },
  },
};
</script>

<style scoped>
.secretSection {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.9);
}

.designWrapper {
  align-content: center;
  margin-left: 15vw;
  margin-top: 5vw;
  display: grid;
  grid-template-columns: 5% 95%;
}
.card {
  grid-column: 2/3;
  display: grid;
  grid-template-columns: repeat(3, 170px);
}

.cardslots {
  margin: auto;
  display: grid;
  width: 160px;
  height: 224px;

  animation: jiggle 1s ease-in-out;
  animation-iteration-count: infinite;
  box-shadow: 0 0 10px yellow;
}

@keyframes jiggle {
  0% {
    transform: rotate(0.5deg);
  }
  50% {
    transform: rotate(-0.5deg);
  }
  100% {
    transform: rotate(0.5deg);
  }
}

#buttonArea {
  grid-column: 1/2;
  margin: auto;
}

#textArea {
  grid-column: 2/3;
  display: inline;
  margin: none;
}
@media only screen and (max-width: 1050px) {
  .designWrapper {
    margin-left: 5vw;
  }
}
</style>