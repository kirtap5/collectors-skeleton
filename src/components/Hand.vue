<template>
  <div class="handPlayer" :style="{ backgroundColor: player.color }">
    <div class="buttonArea">
      <div id="infoButton">
        <InfoButtons :modalProps="handProps" />
      </div>

      <button
        class="buttonSecret clickable"
        :style="{ backgroundColor: player.color }"
        :class="player.color"
        @click="secretCard()"
      >
        My secret card
        <div v-if="clicked" id="showSecretCard">
          <transition name="fade slide" appear>
            <div class="background">
              <h1>Secret card</h1>
              <p>Your secret card is</p>
              <CollectorsCard
                v-for="(card, index) in player.secret"
                :card="card"
                :availableAction="card.available"
                :key="'secret' + index"
                class="theSecretCard"
              />
              <button class="buttonSecret red" @click="notShow()">Close</button>
            </div>
          </transition>
        </div>
      </button>

      <!--bygger en sträng, secret 1 secret 2. Tar bort multiple keys, varningen.-->
      <!--TA IN SECRET CARD som :card=secret på något sätt från SecretCard component-->
    </div>
    <div class="scrollHand">
      <div class="handSlot" :style="{ backgroundColor: player.color }">
        <CollectorsCard
          v-for="(card, index) in player.hand"
          :card="card"
          :availableAction="card.available"
          :key="index"
          @doAction="selectAction(card)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";
import InfoButtons from "@/components/InfoButtons.vue";

export default {
  name: "Hand",
  components: {
    CollectorsCard,
    InfoButtons,
  },
  props: {
    player: Object,
    allCardsChosen: Boolean,
  },

  /*Du kan använda kort(en) i handen till flera olika saker. I Buy Item kan du välja på antingen ett kort i item pool eller från handen. I Get Skill kan du använda ett av korten i handen eller ett från skill pool. Detta kort kommer att ge dig skills för resten av spelet. I Raise Value, välj kort i market pool som är lika med XX i ditt eget action space, antingen ett eller två kort. Du kan använda kort från din hand, från skill pool eller auction pool.*/ 

  data: function () {
    return {
      clicked: false,
      handProps: {
        value: "Hand",
        text: "You can use your card(s) for different things. In Buy Item you can pick one card from the item pool or from your hand. In Get Skill you can take one of the cards from the skill pool or from your hand. This card will grant you skills for the rest of the game. When executing Raise Value, you must pick cards in the market pool equal to the number of seals on your action space (one or two cards). You may place cards from your hand, from the card in the lowest position in the skill pool, or from the lowest card in the auction pool.",
        title: "Hand",
        classes: `${this.player.color} button`,
      } 
    };
  },
  methods: {
    selectAction: function (card) {
      if (card.available) {
        this.$emit("selectAction", card);
        this.allCardsChosen
          ? this.highlightAvailableCards()
          : this.$set(card, "available", false);
      }
    },

    secretCard: function () {
      if (!this.clicked) {
        this.clicked = true;
      } else {
        this.clicked = false;
      }
    },

    notShow: function () {
      if (!this.clicked) {
        this.clicked = false;
      }
    },

  },
};
</script>

<style scoped>
.handPlayer {
  height: 100%;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.scrollHand{
  overflow-x: scroll;
  /*white-space: nowrap;*/
}

.handSlot {
  display: grid;
  grid-template-columns: repeat(40, 85px);
  grid-template-rows: 115px;
  background-color: white;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
.handSlot div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}

.buttonArea {
  margin-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /*white-space: normal;*/
}

#infoButton {
  grid-column: 1;
}

.clickable {
  grid-column: 2;
  margin-right: 0.5vw;
  /*width: 50%;*/
}

.buttonSecret:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

#showSecretCard {
  position: absolute;
  height: 6050px; /* ändra så att den bara är hela sidan!! */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.9);
  text-align: center;
  justify-content: center;
}

#showSecretCard h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

#showSecretCard p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

.theSecretCard {
  margin: auto;
}

.background {
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

.buttonSecret {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 15px 25px;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.3s ease-out;
}

.red {
  background-image: linear-gradient(
    143.3deg,
    rgba(216, 27, 96, 1) 33.1%,
    rgba(237, 107, 154, 1) 74.9%
  );
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

.CornflowerBlue {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(145, 192, 241, 1) 33.1%,
    CornflowerBlue 74.9%
  );
}

.DarkSeaGreen {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(172, 192, 205, 1) 0%,
    DarkSeaGreen 90%
  );
}

.Hotpink {
  background-image: linear-gradient(
    143.3deg,
    rgba(216, 27, 96, 1) 33.1%,
    rgba(237, 107, 154, 1) 74.9%
  );
}

.Lavender {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(147, 230, 241, 1) 0%,
    Lavender 90%
  );
}

@media only screen and (max-width: 1050px) {
.buttonSecret{
  padding: 5px 7px;
  font-size: 80%;
}
}

@media only screen and (max-width: 850px) {
  .buttonSecret{
    font-size: 50%;
  }
}
</style>