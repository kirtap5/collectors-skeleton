<template>
  <div>
    <div id="workArea">
      <div class="info">
        <InfoButtons :modalProps="workProps" />
      </div>
      <div v-if="round == 1" class="rectangular firstArea">
        <button class="buttonTest" @click="circleClicked" />
        <div class="first figures">&#9203;</div>
        <div class="second figures">&#9203;</div>
        <p>ROUND 1</p>
      </div>
      <div v-if="round == 2" class="rectangular firstArea">
        <button class="buttonTest" @click="circleClicked" />
        <!--<div class="workArea_component">
          <CircleComponent v-bind:value="-1" />
        </div>-->
        <div class="first figures">&#9203;</div>
        <div class="second figures">&#9203;</div>
        <p>ROUND 2</p>
      </div>
      <div v-if="round == 3" class="rectangular firstArea">
        <button class="buttonTest" @click="circleClicked" />
        <!--<div class="workArea_component">
          <CircleComponent v-bind:value="2" />
        </div>-->
        <div class="first figures">&#9203;</div>
        <div class="second figures">&#9203;</div>
        <p>ROUND 3</p>
      </div>
      <div v-if="round == 4" class="rectangular firstArea">
        <button class="buttonTest" @click="circleClicked" />
        <!--<div class="workArea_component">
          <CircleComponent v-bind:value="3" />
        </div>-->
        <!--<div class="first figures">&#x267B;</div>-->
        <div class="first" id="recycledCard"></div>
        <p>ROUND 4</p>
      </div>
      <div class="rectangular secondArea">
        <button class="buttonTest" @click="circleClicked" />
        <!--<div class="workArea_component">
          <CircleComponent v-bind:value="1" />
        </div>-->
        <!--<div class="first figures">&#x267B;</div>-->
        <div class="first" id="recycledCard"></div>
      </div>
      <div class="rectangular thirdArea">
        <button class="buttonTest" @click="circleClicked" />
        <!--<div class="workArea_component">
          <CircleComponent v-bind:value="-1" />
        </div>-->
        <div class="first" id="getCard"></div>
        <!--<div class="first figures">&#127183;</div>-->
        <!--<div class="second figures">&#127183;</div>-->
        <div class="second" id="getCard"></div>
      </div>
      <div class="rectangular fourthArea">
        <button class="buttonTest" @click="circleClicked" />

        <div class="first" id="getCard"></div>
        <!--<div class="first figures">&#127183;</div>-->
        <div class="workArea_token">
          <FirstPlayerToken />
        </div>
      </div>
      <div class="rectangular fifthArea">
        <button class="buttonTest" @click="circleClicked" />

        <div class="first" id="getCard"></div>
        <!--<div class="second figures">&#9203;</div>-->
        <div class="infoB">
                    <InfoButtons
                :modalProps=' work1Props'
                />
        </div>

        <!--GAMMAL CIRCKEL SOM JAG SPARAR
            <div class="workArea_circle" v-on:click = "circleClicked"></div>-->
      </div>
    </div>
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
      round: 4,
      clicked: false,
      workProps: {
        value: "Work",
        text:
          "In the work area, you perform actions to increase your income, recycle bottles, draw cards and become the first player. If you place your bottle in the uppermost action space (on the quarter tile), you must place two cards upside down from your hand next to your player board on its right side. Note that this action space changes characteristics during the fourth quarter to resemble the action spot below it.",
        title: "Work",
        classes: "button yellow",
      },
      work1Props: {
        value: "i",
        text: "",
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
  /*background-color: rgb(235, 235, 109);*/
  background-color: #f5f2cc; /* #ffe599ff;*/
  width: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.rectangular {
  margin: 7px;
  height: 70px;
  width: 90%;
  color: black;
  background-color: #f5f2cc; /* #ffe599ff;*/
  border: 3px solid grey;
  /*display: flex;
            justify-content: space-around;*/
  display: grid;
  
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.buttonTest {
  color: black;
  /*grid-column: 1;*/
  grid-column: 2;
  width: 100px;
  height: 20px;
  text-align: center;
  font-size: 50px;
  border: 1px solid black;
  margin-top: 25px;
  margin-left: 10px;
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
  font-size: 14px;
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
        height: 100px;
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
}

.first {
  grid-column: 3;
  margin-top: 10px;
}

.second {
  grid-column: 4;
  margin-top: 10px;
}

.workArea_token {
  grid-column: 4;
  margin-top: 10px;
}

#getCard {
  background: url("/images/getCardInWorkArea.PNG");
  background-size: 40px 45px;
  background-repeat: no-repeat;
}

#recycledCard {
  background: url("/images/bottleRecycled.PNG");
  background-size: 38px 55px;
  background-repeat: no-repeat;
}
</style>