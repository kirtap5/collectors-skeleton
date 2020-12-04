<template>
  <div id="AllOtherPlayerboards">
    <div v-on:click="playerClicked('A')" class="otherPlayerBoard A">
      <p>Player A</p>
    </div>
    <div v-on:click="playerClicked('B')" class="otherPlayerBoard B">
      <p>Player B</p>
    </div>
    <div v-on:click="playerClicked('C')" class="otherPlayerBoard C">
      <p>Player C</p>
    </div>
    <div v-if = dispPlayerboard :class= playertag class="displayedBoard"> Player {{playertag}}'s playerboard!!! <PlayerBoard/> 
        
    </div>
  </div>

</template>

<script>

import PlayerBoard from '@/components/PlayerBoard.vue'

export default {
    name: "OtherPlayerboards",
    components: {
    PlayerBoard
    },
    data: function () {
    return {
        dispPlayerboard: false,
        playertag: "",
        skills: Array
    }},
    methods: {
        playerClicked: function (playertag) {
            this.playertag = playertag
            if (this.dispPlayerboard){
                this.dispPlayerboard = false;
            }
            else{
                this.dispPlayerboard = true;
            }
        },
    },
};
</script>


<style scoped>
    .otherPlayerBoard, .displayedBoard {
    margin: 5px;
    padding: 5px;
    border-radius: 3px;
    text-align: center;
    color: black;
    }
    .otherPlayerBoard:hover {
    cursor: pointer;
    background-color: coral;
    }
    .A{
    background-color: cyan;
    }
    .B{
    background-color: yellow;
    }
    .C{
    background-color: hotpink;
    }
</style>