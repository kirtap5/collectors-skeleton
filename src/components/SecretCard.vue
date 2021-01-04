<template>
  <div class="secretSection">
    <!-- <h2>Choose your secret card</h2>-->
    <div id="buttonArea">
      <InfoButtons :modalProps="secretProps" />
    </div>

    <div id="textArea">
      <h1>Choose your secret card</h1>
    </div>

    <!--CHOSE YOUR SECRET CARD-->
    <div class="cardslots" v-for="(card, index) in player.hand" :key="index">
      <CollectorsCard
        :card="card"
        :key="index"
        @doAction="selectAction(card)"
      />
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
  },

  data: function () {
    return {
      secretProps: {
        value: "i",
        text: "Each player picks one card and places it face down, tucked under their player board at the position marked with a treasure chest. This card is a secret item you own from the beginning. ",
        title: "Secret card",
        classes: `${this.player.color} smallButton`,
      },
    };
  },
  methods: {
    
    selectAction: function (card) {
        /*let secretCard = this.card;*/
        this.$emit("selectAction", card);

       /* this.$store.state.socket.emit("collectorsSetSecret", {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          secret: card,
        });*/
    },
  },
};
</script>

<style scoped>
.secretSection {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.9);

  display: grid;
  /*grid-template-columns: 1fr 1fr 1fr;*/
  grid-template-columns: repeat(auto-fill, 170px);
  grid-template-rows: repeat(auto-fill, 224px);
}

.cardslots {
  margin: 40px;

  display: grid;
  width: 160px;
  height: 224px;

  animation: jiggle 1s ease-in-out;
  animation-iteration-count: infinite;
  box-shadow: 0 0 10px yellow;

  /*grid-column: 3;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(auto-fill, 145px);*/
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
  margin-top: 7vw;
  margin-left: 2vw;
  /*grid-column: 1;*/
}

#textArea {
  /*grid-column: 2;*/
  /*margin-left: 5vw;*/
  margin-top: 5vw;
}
@media only screen and (max-width: 1050px) {
    /* phones */
  .secretSection {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 85px);
    grid-template-rows: repeat(auto-fill, 117px);
  }
  .cardslots {
    display: grid;
    grid-template-columns: repeat(auto-fill, 85px);
    grid-template-rows: repeat(auto-fill, 117px);
    transform: scale(0.5) translate(-50%, -50%);
    transition: 0.2s;
    transition-timing-function: ease-out;

  }

  .cardslots div {
    z-index: 0;
  }

  .cardslots div:hover {
    transform: scale(1) translate(-25%, 0);
    z-index: 1;
  }

}
</style>