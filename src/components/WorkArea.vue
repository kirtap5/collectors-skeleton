<template>
  <div>
    <div id="workArea">
      <!---buttonTest kommer att bytas ut till det vi får av Mikael-->
      <div class="info">
        <InfoButtons :modalProps="workProps" />
      </div>
      <div v-if="round == 1" class="rectangular firstArea">
        <div class="infoB">
          <InfoButtons :modalProps="work8Props" />
        </div>
        <button class="buttonTest" @click="circleClicked" />
        <div class="first" id="upsideDown"></div>
        <div class="second" id="upsideDown"></div>
        <p>ROUND 1</p>
      </div>
      <div v-if="round == 2" class="rectangular firstArea">
          <div class="infoB">
          <InfoButtons :modalProps="work7Props" />
        </div>
        <button class="buttonTest" @click="circleClicked" />
        <div class="first" id="upsideDown"></div>
        <div class="second" id="upsideDown"></div>
        <p>ROUND 2</p>
      </div>
      <div v-if="round == 3" class="rectangular firstArea">
        <div class="infoB">
          <InfoButtons :modalProps="work6Props" />
        </div>
        <button class="buttonTest" @click="circleClicked" />
        <div class="first" id="upsideDown"></div>
        <div class="second" id="upsideDown"></div>
        <p>ROUND 3</p>
      </div>
      <div v-if="round == 4" class="rectangular firstArea">
        <div class="infoB">
          <InfoButtons :modalProps="work5Props" />
        </div>
        <button class="buttonTest" @click="circleClicked" />
        <div class="first" id="recycledCard"></div>
        <p>ROUND 4</p>
      </div>
      <div class="rectangular secondArea">
          <div class="infoB">
          <InfoButtons :modalProps="work4Props" />
        </div>
        <button class="buttonTest" @click="circleClicked" />
        <div class="first" id="recycledCard"></div>
      </div>
      <div class="rectangular thirdArea">
        <div class="infoB">
          <InfoButtons :modalProps="work3Props" />
        </div>
        <button class="buttonTest" @click="circleClicked" />
        <div class="first" id="getCard"></div>
        <div class="second" id="getCard"></div>
      </div>
      <div class="rectangular fourthArea">
          <div class="infoB">
          <InfoButtons :modalProps="work2Props" />
        </div>
        <button class="buttonTest" @click="circleClicked" />
        <div class="first" id="getCard"></div>
        <div class="workArea_token">
          <FirstPlayerToken />
        </div>
      </div>
      <div class="rectangular fifthArea">
        <div class="infoB">
          <InfoButtons :modalProps="work1Props" />
        </div>
        <button class="buttonTest" @click="circleClicked" />
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
    color: String,
    player: Object,
    /*Förmodligen ta bort placement. BÖR FÅ EN NY PLACEMENT I MIKAELS WORKAREA*/
    placement: Array,
  },

  data: function () {
    return {
      round: 1,
      clicked: false,
      workProps: {
        value: "Work",
        text: "In the work area, you perform actions to increase your income, recycle bottles, draw cards and become the first player. If you place your bottle in the uppermost action space (on the quarter tile), you must place two cards upside down from your hand next to your player board on its right side. Note that this action space changes characteristics during the fourth quarter to resemble the action spot below it.",
        title: "Work",
        classes: "button yellow",
      },
      work1Props: {
        value: "i",
        text: "Draw a card and place one of the cards on your hand upside down to work (your income will then increase). Cost is 0$.",
        title: "",
        classes: "yellow smallButton",
      },
      work2Props: {
         value: "i",
        text: "Draw a card and get the 1st player token. This token means that you will be the first player every round until someone else gets the 1st player token. Cost is 0$.",
        title: "",
        classes: "yellow smallButton", 
      },
      work3Props: {
        value: "i",
        text: "Draw two cards. Cost is 1$.",
        title: "",
        classes: "yellow smallButton",
      },
      work4Props: {
        value: "i",
        text: "Recycle one bottle and gain 1$.",
        title: "",
        classes: "yellow smallButton",
      },
      work5Props: {
        value: "i",
        text: "Recycle one bottle and gain 3$.",
        title: "",
        classes: "yellow smallButton",
      },
      work6Props: {
        value: "i",
        text: "Place two of the cards on your hand upside down to work (your income will then increase) and gain 2$.",
        title: "",
        classes: "yellow smallButton",
      },
      work7Props: {
        value: "i",
        text: "Place two of the cards on your hand upside down to work (your income will then increase) and gain 1$.",
        title: "",
        classes: "yellow smallButton",
      },
      work8Props: {
        value: "i",
        text: "Place two of the cards on your hand upside down to work (your income will then increase). Cost is 0$.",
        title: "",
        classes: "yellow smallButton",
      },
    };
  },
  methods: {
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
  background-color: #f5f2cc; /* #ffe599ff;*/
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
  background-color: #f5f2cc; /* #ffe599ff;*/
  border: 3px solid grey;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.info {
    margin-top: 5px;
}

.buttonTest {
  color: black;
  grid-column: 2;
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 50px;
  border: 1px solid black;
  margin-top: 25px;
}

/*#workAreaText {
  color: black;
  /*font-size: 30px;*/
/*font-weight: bold;
  text-align: center;
}*/

.firstArea {
  border: 3px dotted grey;
  /*display: grid;
        grid-template-columns: 1fr 1fr;*/
}

.firstArea p {
  color: black;
  font-size: 60%;
  font-weight: bold;
  text-align: right;
  grid-column: 5;
  margin-top: 10px;
  margin-right: 10px;
}

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
  /*background-size: 40px 45px;*/
  background-repeat: no-repeat;
}

#recycledCard {
  background: url("/images/bottleRecycled.PNG");
  background-size: 2.5vw 3vw;
  /*background-size: 38px 55px;*/
  background-repeat: no-repeat;
}

#upsideDown {
    background: url("/images/baksida.png");
  background-size: 2.5vw 3vw;
  background-repeat: no-repeat;
}

</style>