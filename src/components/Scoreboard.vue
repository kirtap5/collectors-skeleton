<template>
  <div id="Scoreboard">
    <div class="score_table">
      <div v-for="(player, index) in players" :key="index" :player="player">
        <h2 class="score_data">
          Player {{ index }}'s score: {{ player.points }}
        </h2>
      </div>
      <router-link class="close_button" to="/" tag="button">Close</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scoreboard",

  props: {
    players: Object,
    currentPlayer: Object,
  },

  data: function () {
    return {};
  },

  methods: {
    resetGame: function () {
      this.$emit("resetGame");
    },
  },
};
</script>

<style scoped>
.close_button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(to right, gray, black);
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}
#Scoreboard {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
}

.score_table {
  padding: 200px;
  margin: auto;
  min-width: 300px;
  width: 30%;
  background-color: white;
  border-radius: 10px;
}
.score_data {
  color: black;
  border-bottom: 1px solid black;
  margin-bottom: 50px;
}
</style>
