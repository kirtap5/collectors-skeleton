<template>
  <div class="center">
    <div>
      <h2>hej</h2>
      <DemoButton />
      <MenuButton />
    </div>
    <div id="welcomeMessage">
      <h1>Collectors</h1>
      <h3>
        Welcome to the game Collectors where you compete against other players
        about who's collection is the most valuable.
      </h3>
      <ul>
        <li v-for="i in 3" :key="i">
          <a @click="setupCollectors(i + 1, 'en')"
            >Set up a game of Collectors for {{ i + 1 }} players</a
          >.
        </li>
      </ul>
      <ul>
        <li v-for="i in 3" :key="i">
          <a @click="setupCollectors(i + 1, 'se')"
            >Spela Collectors med {{ i + 1 }} spelare</a
          >.
        </li>
      </ul>
      <div class="watchDemo">
        <h2>New to collectors? Watch a demo before playing</h2>
        <DemoButton />
      </div>

      <h2>Do you know how to play? Start a game</h2>
      <div class="playGame">
        <div>
          <label for="players">Players: </label>
          <select name="players" id="players">
            <option value="2" :key="2" @click="console.log(key)">2</option>
            <option value="3" :key="3" @click="console.log(key)">3</option>
            <option value="4" :key="4" @click="console.log(key)">4</option>
          </select>
        </div>

        <div>
          <label for="language">Language: </label>
          <select name="language" id="language">
            <option value="sv">Svenska</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <button class="playButton button" @click="findValues" >Play</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DemoButton from "../components/DemoButton.vue";
import MenuButton from "../components/MenuButton.vue";

export default {
  name: "Home",
  components: {
    DemoButton,
    MenuButton,
    
  },
  created: function () {
    this.$store.commit("SET_ROOM_ID");
  },
  methods: {
    // findValues: function (){
    //   playerCount = document.getElementById(players).value
    //   lang= document.getElementById(language).value
    //   this.setupCollectors(playerCount, lang)
    // }, 
    setupCollectors: function (playerCount, lang = "en") {
      this.$store.commit("SETUP_GAME", {
        roomId: this.$store.state.roomId,
        playerCount: playerCount,
        lang: lang,
      });
      this.$router.push("/room/" + this.$store.state.roomId);
    },
  },
};
</script>
<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 1em;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}

#welcomeMessage {
  background-image: linear-gradient(to right, whitesmoke, white 35.5%);
  border-radius: 30%;
  padding: 20px;
  max-width: 500px;
  display: inline-block;
  border-radius: 8px;
  color: gray;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.3s ease-out;
}

div {
  margin: auto;
}

#welcomeMessage:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

a:hover {
  cursor: pointer;
}

.playGame {
  display: grid;
  grid-template-columns: 30% 40% 30%;
}

.button {
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
  transition: 0.3s ease-out;
}

.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}
</style>
