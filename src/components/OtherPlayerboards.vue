<template>
  <div id="AllOtherPlayerboards">
      <div v-for="(player, index) in Players" :key="index" :player="player">
        <div v-if="player!= Players[playerId]">
          <!--<transition name="slide">-->
          <div v-on:click="playerboardClicked(index)" :style="{backgroundColor: player.color}" class="otherPlayerBoard"> 
            <div id="dispFirstPlayerToken" v-if="player.firstPlayer">
              <FirstPlayerToken/>
            </div>
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
import FirstPlayerToken from './FirstPlayerToken.vue';

export default {
    name: "OtherPlayerboards",
    components: {
        PlayerBoard,
        FirstPlayerToken
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


    .otherPlayerBoard {
    margin: 5px;
    padding: 5px;
    border-radius: 3px;
    color: black;
    display: flex;
    flex-direction: row;
    grid-gap: 10px;
    }
    
    .otherPlayerBoard:hover{
    cursor: pointer;
    }

    #dispFirstPlayerToken {
      display: flex; align-items: center;
      
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
      height: 30vw; /*30vw;*/
      width: 70vw; /*40vw;*/
      border-bottom: solid black;

    }


    @media screen and (max-width: 825px) {
      h2 {
        font-size: 70%;
      }
      #AllOtherPlayerboards{
        display:flex;
        justify-content: flex-end;
        flex-direction: row;
      }
    }
</style>