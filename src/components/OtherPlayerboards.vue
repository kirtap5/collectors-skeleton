<template>
  <div id="AllOtherPlayerboards">
      <div v-for="(player, index) in Players" :key="index" :player="player">
        <div v-if="player!= Players[playerId]">
          <!--<transition name="slide">-->
          <div v-on:click="playerboardClicked(index)" :style="{backgroundColor: player.color}" class="otherPlayerBoard"> 
            <h2> Player {{index}} </h2>
            <PlayerBoard :class="['playerBoard', {'showPlayerBoard': dispPlayerboard===index}]" :player="player" />
            <!--<PlayerBoard v-if="dispPlayerboard === index" :player="player" class="showPlayerBoard" />-->
          </div>
          <!--</transition>-->
        </div>
      </div>
  </div>
</template>

<!--Kolla pop up och overflow-->

<script>
import PlayerBoard from './PlayerBoard.vue';

export default {
    name: "OtherPlayerboards",
    components: {
        PlayerBoard
    },
    props:{
      Players: Object,
      playerId: String
    },
    data: function () {
    return {
        dispPlayerboard: "",
        clicked: false,
    }},
    methods: {
        playerboardClicked: function(index) {
            if(this.dispPlayerboard != index){
              this.dispPlayerboard = index;
              this.clicked=true;
              
              /*const panel = this.$playerboardClicked({
                component: "otherPlayerBoard",
                cssClass: "otherPlayerBoard",
                props: {}
              })*/
              /*document.getElementByClass('showOtherPlayerboard').style.height="800px";*/

            }
            else{
              this.dispPlayerboard = "";
            }
        },
    },
};
</script>
<style scoped>
    #AllOtherPlayerboards{
      display:flex;
      justify-content: flex-end;
      flex-direction: row;
    }

    .otherPlayerBoard {
    margin: 5px;
    padding: 5px;
    border-radius: 3px;
    text-align: center;
    color: black;
    }
    
    .otherPlayerBoard:hover{
    cursor: pointer;
    }

    .playerBoard {
      overflow: hidden;
      height: 0;
      transition: 1s;
      width: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    .showPlayerBoard {
      /*height: 600px;
      width: 1000px;*/
      height: 600px;
      width: 1000px;
    }

    /*.showPlayerBoard {
      transform: translate(200px,150px)
    }
    /*Syntaxen för transition
    .element {
          transition: property duration ease delay}*/ 
    /*.expand-transition {
      transition: opacity 300ms ease-in-out 1s;
      
      overflow: hidden;
    }*/


    /*.slide-leave-actve {
      
    }*/



   /* .clickOnOtherPlayer {
      overflow: hidden;
    }*/
</style>