<template>
  <div>
    <div id="workArea">
      <div class="info">
        <InfoButtons :modalProps="workProps" />
      </div>
      <div v-if="round == 1" class="rectangular firstArea">
        <div class="infoB">
          <InfoButtons 
          :modalProps="work8Props"
          :labels="labels" />
        </div>
        <!--<button class="buttonTest" @click="circleClicked" />-->
        <button
          class="button"
          :disabled="player.hand.length < 2 || buttonDisabled(placement[0])"
          v-if="round == 1 && placement[0].playerId === null"
          @click="placeBottle(placement[0])"
        >
          $0
        </button>
        <div
          class="clickedButton"
          v-if="
            placement[0].playerId !== null && typeof players !== 'undefined'
          "
          :style="{ backgroundColor: players[placement[0].playerId].color }"
        >
          <p>{{ placement[0].playerId }}</p>
        </div>
        <!--Får 0dollar-->
        <div class="first" id="upsideDown"></div>
        <div class="second" id="upsideDown"></div>
        <!--<p>ROUND 1</p>-->
      </div>
      <div v-if="round == 2" class="rectangular firstArea">
        <div class="infoB">
          <InfoButtons 
          :modalProps="work7Props"
          :labels="labels" />
        </div>
        <button
          class="button"
          :disabled="player.hand.length < 2 || buttonDisabled(placement[1])"
          v-if="round == 2 && placement[1].playerId === null"
          @click="placeBottle(placement[1])"
        >
          $-1
        </button>
        <div
          class="clickedButton"
          v-if="
            placement[1].playerId !== null && typeof players !== 'undefined'
          "
          :style="{ backgroundColor: players[placement[1].playerId].color }"
        >
          <p>{{ placement[1].playerId }}</p>
        </div>
        <!--Får 1 dollar-->
        <div class="first" id="upsideDown"></div>
        <div class="second" id="upsideDown"></div>
        <!--<p>ROUND 2</p>-->
      </div>
      <div v-if="round == 3" class="rectangular firstArea">
        <div class="infoB">
          <InfoButtons 
          :modalProps="work6Props"
          :labels="labels" />
        </div>
        <button
          class="button"
          :disabled="player.hand.length < 2 || buttonDisabled(placement[2])"
          v-if="round == 3 && placement[2].playerId === null"
          @click="placeBottle(placement[2])"
        >
          $-2
        </button>
        <div
          class="clickedButton"
          v-if="
            placement[2].playerId !== null && typeof players !== 'undefined'
          "
          :style="{ backgroundColor: players[placement[2].playerId].color }"
        >
          <p>{{ placement[2].playerId }}</p>
        </div>
        <!--Får 2 dollar-->
        <div class="first" id="upsideDown"></div>
        <div class="second" id="upsideDown"></div>
        <!--<p>ROUND 3</p>-->
      </div>
      <div v-if="round == 4" class="rectangular firstArea">
        <div class="infoB">
          <InfoButtons 
          :modalProps="work5Props"
          :labels="labels" />
        </div>
        <button
          class="button"
          :disabled="player.hand.length < 2 || buttonDisabled(placement[3])"
          v-if="round == 4 && placement[3].playerId === null"
          @click="placeBottle(placement[3])"
        >
          -$3
        </button>
        <div
          class="clickedButton"
          v-if="
            placement[3].playerId !== null && typeof players !== 'undefined'
          "
          :style="{ backgroundColor: players[placement[3].playerId].color }"
        >
          <p>{{ placement[3].playerId }}</p>
        </div>
        <!--FÅR 3dollar-->
        <div class="first" id="recycledCard"></div>
        <!--<p>ROUND 4</p>-->
      </div>
      <div class="rectangular secondArea">
        <div class="infoB">
          <InfoButtons 
          :modalProps="work4Props"
          :labels="labels" />
        </div>
        <button
          class="button"
          v-if="placement[4] && placement[4].playerId === null"
          @click="placeBottle(placement[4])"
          :disabled="buttonDisabled(placement[4])"
        >
          $-1
        </button>
        <!--Trash one bottle-->
        <div
          class="clickedButton"
          v-if="
            placement[4].playerId !== null && typeof players !== 'undefined'
          "
          :style="{ backgroundColor: players[placement[4].playerId].color }"
        >
          <p>{{ placement[4].playerId }}</p>
        </div>
        <div class="first" id="recycledCard"></div>
      </div>
      <div class="rectangular thirdArea">
        <div class="infoB">
          <InfoButtons 
          :modalProps="work3Props"
          :labels="labels" />
        </div>
        <button
          class="button"
          v-if="placement[5] && placement[5].playerId === null"
          @click="placeBottle(placement[5])"
          :disabled="cannotAfford(1) || buttonDisabled(placement[5])"
        >
          $1</button
        ><!--Draw two cards-->

        <div
          class="clickedButton"
          v-if="
            placement[5].playerId !== null && typeof players !== 'undefined'
          "
          :style="{ backgroundColor: players[placement[5].playerId].color }"
        >
          <p>{{ placement[5].playerId }}</p>
        </div>
        <div class="first" id="getCard"></div>
        <div class="second" id="getCard"></div>
      </div>
      <div class="rectangular fourthArea">
        <div class="infoB">
          <InfoButtons 
          :modalProps="work2Props"
          :labels="labels" />
        </div>
        <button
          class="button"
          v-if="placement[6] && placement[6].playerId === null"
          :disabled="buttonDisabled(placement[6])"
          @click="placeBottle(placement[6])"
        >
          $0
        </button>
        <div
          class="clickedButton"
          v-if="
            placement[6].playerId !== null && typeof players !== 'undefined'
          "
          :style="{ backgroundColor: players[placement[6].playerId].color }"
        >
          <p>{{ placement[6].playerId }}</p>
        </div>
        <!--Draw one card and become first player for next round-->
        <div class="first" id="getCard"></div>
        <div class="workArea_token">
          <FirstPlayerToken />
        </div>
      </div>
      <div class="rectangular fifthArea">
        <div class="infoB">
          <InfoButtons 
          :modalProps="work1Props"
          :labels="labels" />
        </div>
        <button
          class="button"
          v-if="placement[7] && placement[7].playerId === null"
          :disabled="buttonDisabled(placement[7])"
          @click="placeBottle(placement[7])"
        >
          $0
        </button>
        <div
          class="clickedButton"
          v-if="
            placement[7].playerId !== null && typeof players !== 'undefined'
          "
          :style="{ backgroundColor: players[placement[7].playerId].color }"
        >
          <p>{{ placement[7].playerId }}</p>
        </div>
        <!--Draw one card and put one card from hand as future income-->
        <div class="first" id="getCard"></div>
        <div class="second" id="upsideDown"></div>
        <!--<div class="second figures">&#9203;</div>-->
      </div>
    </div>
    <!--GAMMAL CIRCKEL SOM JAG SPARAR
            <div class="workArea_circle" v-on:click = "circleClicked"></div>
            BOBS COMPONENT PENG
            <<div class="workArea_component">
          <CircleComponent v-bind:value="-1" />
        </div>
        RECYCLED PREFIX
        <div class="first figures">&#x267B;</div>-->
  </div>
</template>

<script>
/*import CircleComponent from "@/components/CircleComponent.vue";*/
import FirstPlayerToken from "@/components/FirstPlayerToken.vue";
import InfoButtons from "@/components/InfoButtons.vue";

export default {
  name: "WorkArea",

  components: {
    /*CircleComponent,*/
    FirstPlayerToken,
    InfoButtons,
  },

  props: {
    color: String /*KOMMER TAS BORT efter circle clicked*/,
    player: Object,
    placement: Array,
    round: Number,
    players: Object,
    labels: Object,
  },

  computed: {
    workProps: function () {
      return {
        value: this.labels.work,
        text: this.labels.workText,
        title: this.labels.work,
        classes: "button yellow",
      };
    },

    work1Props: function () {
      return {
        value: "i",
        text: this.labels.work1,
        title: "",
        classes: "smallButton yellow",
      };
    },

    work2Props: function () {
      return {
        value: "i",
        text: this.labels.work2,
        title: "",
        classes: "smallButton yellow",
      };
    },

    work3Props: function () {
      return {
        value: "i",
        text: this.labels.work3,
        title: "",
        classes: "smallButton yellow",
      };
    },

    work4Props: function () {
      return {
        value: "i",
        text: this.labels.work4,
        title: "",
        classes: "smallButton yellow",
      };
    },

    work5Props: function () {
      return {
        value: "i",
        text: this.labels.work5,
        title: "",
        classes: "smallButton yellow",
      };
    },

    work6Props: function () {
      return {
        value: "i",
        text: this.labels.work6,
        title: "",
        classes: "smallButton yellow",
      };
    },

    work7Props: function () {
      return {
        value: "i",
        text: this.labels.work7,
        title: "",
        classes: "smallButton yellow",
      };
    },

    work8Props: function () {
      return {
        value: "i",
        text: this.labels.work8,
        title: "",
        classes: "smallButton yellow",
      };
    },
  },
   
/*round: 2,*/ /*SKA TAS BORTclicked: false SKA TAS BORT */

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
    /*stod id i placebottle istället för p*/
    placeBottle: function (p) {
      console.log("in i work");
      console.log(p);
      if (p.id < 4 || p.id === 7) {
        this.hightlightAvailableCards(p.cost);
      }

      this.$emit("placeBottle", p);
    },
    hightlightAvailableCards: function (cost) {
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

    cannotAfford: function (cost) {
      return this.player.money < cost;
    },
    /*}, 
    
    när circle clicked tas bort lägg tilll måsvinge*/
    /*CIRCLECLICKED SKA BORT*/
    circleClicked: function (e) {
      if (!this.clicked) {
        let clickedEl = e.target;
        clickedEl.setAttribute("style", "background-color:" + this.color);
        this.clicked = true;
        /*DENNA EMIT KOMMER INTE BEHÖVAS TROR JAG NÄR VI FÅR KOD AV MIKAEL, MEN HAR KVAR SÅLÄNGE */
        /*this.$emit("circleClicked", clickedEl);*/
      } else {
        let clickedEl = e.target;
        clickedEl.setAttribute("style", "background-color:white");
        this.clicked = false;
      }
    },
  },
};
</script>
    
<style scoped>
#workArea {
  background-color: #f5f2cc;
  border: 1px solid #e9de4b;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin: 2px;
}

.rectangular {
  margin: 7px;
  width: 90%;
  height: 70px;
  color: black;
  background-color: #f5f2cc;
  border: 3px solid grey;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

p {
  margin: 0px; 
}

.info {
  margin-top: 5px;
  text-align: center;
}

button {
  display: grid;
  grid-column: 2;
  /*grid-template-columns: repeat(auto-fill, 20px);*/
  width: 50px;
  height: 20px;
  margin: 10px;
  /*grid-template-columns: repeat(auto-fill, 40px);*/
  margin: auto;
}

.clickedButton {
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  text-align: center;
  color: black;
  width: 50px;
  height: 20px;
  margin: auto;
}

.clickedButton p {
  margin-bottom: 50%;
}

/*BUTTONTREST SKA BORT*/
/*.buttonTest {
  color: black;
  grid-column: 2;
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 50px;
  border: 1px solid black;
  margin-top: 25px;
}*/

.firstArea {
  border: 3px dotted grey;
}

/*.firstArea p {
  color: black;
  font-size: 60%;
  font-weight: bold;
  text-align: right;
  grid-column: 5;
  margin-top: 10px;
  margin-right: 10px;
}*/

/*HÖR TILL CIRCKELN SOM LIGGER LÄNGST NER I HTML-KODEN, HAR KVAR SÅLÄNGE MEN KAN SEN TAS BORT*/
/*.workArea_circle {
        text-align: center;
        font-size: 50px;
        width: 100px;
        height: 100px;s
        color: black;
        background-color: white;
        border-radius: 50%;
        border: 1px solid black;
        margin-top: 8px;
        margin-left: 10px;
        grid-column: 1;
    }*/

/*.workArea_component {
  grid-column: 3;
  margin-top: 5px;
}*/

.infoB {
  grid-column: 1;
  margin-top: 20px;
  margin-left: 5px;
  text-align: center;
}

.first {
  grid-column: 3;
  margin-top: 10px;
  margin-left: 10px;
}

.second {
  grid-column: 4;
  margin-top: 10px;
  margin-left: 10px;
}

.workArea_token {
  grid-column: 4;
  margin-top: 10px;
}

#getCard {
  background: url("/images/getCardInWorkArea.PNG");
  background-size: 3vw 3vw;
  background-repeat: no-repeat;
}

#recycledCard {
  background: url("/images/bottleRecycled.PNG");
  background-size: 2.5vw 3vw;
  background-repeat: no-repeat;
}

#upsideDown {
  background: url("/images/baksida.png");
  background-size: 2.5vw 3vw;
  background-repeat: no-repeat;
}

@media only screen and (max-width: 850px) {
  .button {
    width: 30px;
  }

  .button p {
    font-size: 70%;
  }

  .clickedButton {
    width: 30px;
  }

  .clickedButton p {
    font-size: 70%;
  }
}
</style>