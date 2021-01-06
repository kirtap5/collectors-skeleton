<template>
  <div>
    <button class="button" @click="showModal = true">Demo</button>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal-d" v-if="showModal">
        <div class="demoContent" v-if="slide == 1">
          <h1>Welcome to Collectors!</h1>
          <div class="democontainer">
            <div class="conA">
              <h2>Purpose, how to win and phases of game</h2>
              <p>
                <b>The purpose </b>
                of the game is to collect items to your collection and to raise
                the value of your collection. <b>The winning player </b> is the
                one with the most valuable collection of rare collectables by
                the end of the game. <br />
                One game is divided into four rounds. One round has six
                <b> phases </b>.
              </p>
            </div>
            <div class="conB">
              <ul>
                <li>
                  Phase 1. Spend bottles: spend bottles from your player board
                  to make actions.
                </li>
                <li>
                  Phase 2. Fill pools: place new cards in the various card
                  pools.
                </li>
                <li>
                  Phase 3. Retrieve bottles: Take the spent bottles back to your
                  player board.
                </li>
                <li>Phase 4. Get income</li>
                <li>Phase 5. Remove a quarter tile and start the next round</li>
                <li>
                  Phase 6. (only in the last round) count player scores points
                  according to their acquired collections and skills
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="demoContent" v-if="slide == 2">
          <div class="democontainer">
            <div class="conA">
              <h2>The basics</h2>
              <p>
                The <b>gameboard</b> is divided into five areas: items, skills,
                raise value, auction and work. Each player has one
                <b>playerboard</b> where you collect your purchased items,
                skills and secret card. Your cards on the hand are shown on the
                playerboard.
              </p>
              <p>The <b>card</b> has several components</p>
            </div>
            <div class="conC">
              <ul>
                <li>
                  the yellow area is the category of the item. Used when card is
                  in Item section.
                </li>
                <li>
                  the green area is the name of the item. Used when card is in
                  Item section.
                </li>
                <li>
                  the blue area is the picture of your item. Used when card is
                  in Item section.
                </li>
                <li>
                  the purple area is the skill that you get when you buy the
                  card if the card is in the Skill section.
                </li>
                <li>
                  the pink area is the category in whos price is raised buy €1
                  if you buy the card if it is in the Raise Value section.
                </li>
              </ul>
            </div>

            <div class="conD">
              <img
                src="images/demopic.png"
                alt="card with all its components"
              />
            </div>
          </div>
        </div>

        <div class="demoContent" v-if="slide == 3">
          <div class="democontainer">
            <div class="conA">
              <h2>The game begins!</h2>
            </div>

            <div class="conC">
              <p><b>Choose secret card</b></p>
              <p>
                Each players will get three cards each: two on hand and one
                secret card. You chose which of the three you want as a scret
                card. This card can't be used during the game, insted all the
                players show their sectret cards in the end of the game.
              </p>
            </div>

            <div class="conD">
              <img
                src="images/secretcardDemo.png"
                alt="your three cards, you choose one of the as a secret card "
                width="100%"
              />
            </div>

            <div class="conE">
              <img
                src="images/demo1.png"
                alt="your three cards, you choose one of the as a secret card "
                width="85%"
              />
            </div>

            <div class="conF">
              <p><b>Players and whos turn it is</b></p>
              <p>
                In the upper rigth of the screen you can observe what round the
                game is on, what your ID is, whos turn it is. If you press on
                the coloured squares you can open up the other player's
                playerboards.
              </p>
            </div>
          </div>
        </div>

        <div class="demoContent" v-if="slide == 4">
          <h2>Your turn</h2>
          <p>
            Each round you have two oportunities to make a move. You can
            increase the moves you have if you buy the bottle skill, you have
            maximum five moves every round.
          </p>
          <ul>
            <p>When it's your turn you can:</p>
            <li>
              <b>Buy item</b> - the category of the item will increase the
              number of the specific category on your playerboard
            </li>
            <li>
              <b>Gain skill</b> - the green symbol of the card is the skill you
              get. Press the i under that soecific skill on your playerboard to
              now what the skill does. If you chose a skill, the number under
              that skill on your playerboard will increase
            </li>
            <li>
              <b>Raise value</b> - the blue symbol represents the category in
              which will increase if you buy this action. If you do this action,
              all the future prices of this category will increase with €1
            </li>
            <li>
              <b>Start an auction</b> - choose one of the cards in auction area
              for all players to bid on. The player with the highest bid when
              all players have passed to place a higther bid wins the auction
            </li>
            <li>
              <b>Work</b> - In the work area, you perform actions to increase
              your income, recycle bottles, draw cards and become the first
              player.
            </li>
          </ul>
        </div>

        <div class="demoContent" v-if="slide == 5">
          <h2>Cost of actions</h2>

          <div class="democontainer">
            <div class="conC">
                 <p>To perform an action at your turn, press one of the buttons on the side of the differant parts of the gameboard. The cost of the action is given on the button. </p>
                 <ul>
                   <li>€1 represent the cost of €1</li>
                   <li>-€1 represent that you gain €1</li>
                   <li>if the button is gray, the cost is larger than the total amount of money you have</li>
                   <li>you can choose which ever button you want</li>
                   <li>when you have pressed a button you can chose which of the cards in this area you would like to perform the action on</li>
                 </ul>
            </div>

            <div class="conD imgMargin">
              <img src="images/demo2.png" alt="" width="80%">
            </div>
          </div>
        </div>

      <div class="demoContent" v-if="slide == 6">
        
        <h2>Ready to play?</h2>
        <div class="democontainer">
        <div class="conA">
        <p>You have access to the demo via the menu while playing the game!</p>
        <p><b>Good luck and have fun playing</b></p>
       </div>

       <div class="conB">
         <img src="images/demo3.png" alt="" width="90%">
      </div>
      </div>

      </div>

        <div class="buttonContainer">
          <button class="smallButton" v-if="slide > 1" @click="prevSlide">
            Back
          </button>
          <button class="smallButton" v-if="slide < 6" @click="nextSlide">
            Forward
          </button>
          <button class="smallButton red" @click="showModal = false">
            Close
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: "DemoButton",

  data: function () {
    return {
      showModal: false,
      slide: 1,
    };
  },

  methods: {
    nextSlide: function () {
      if (this.slide < 6) {
        console.log(this.side);
        this.slide += 1;
      }
    },

    prevSlide: function () {
      if (this.slide > 1) {
        this.slide -= 1;
      }
    },
  },
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "monserrat", sans-serif;
}

#app {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.democontainer {
  display: grid;
  grid-gap: 0px;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows:  50%; */
}

.conA {
  grid-column: 1 / span 2;
  grid-row: 1;
}

.conB {
  grid-column: 1 / span 2;
  grid-row: 2;
}

.conC {
  grid-column: 1;
  grid-row: 2;
}

.conD {
  grid-column: 2;
  grid-row: 2;
}

.conE {
  grid-column: 1;
  grid-row: 3;
}

.conF {
  grid-column: 2;
  grid-row: 3;
}

.imgMargin {
  margin-left: 10%;
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
  box-shadow: 3px 3px rgba(0, 0, 0, 0.3);
  transition: 0.4s ease-out;
}

.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

.smallButton {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 5px 10px;
  background-image: linear-gradient(to right, gray, black);
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.4);
  transition: 0.2s ease-out;
  margin-left: 10px;
}

.smallButton:hover {
  box-shadow: 1px 1px rgba(0, 0, 0, 0.6);
}

.buttonContainer {
  margin: auto;
}

.red {
  background-image: linear-gradient(to right, #cc2e50, #ff5858);
  margin-left: 35%;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.95);
}

.modal-d {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 100vw;
  max-width: 700px;
  /* min-height: 200px; */
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
}

.demoContent {
  min-height: 500px;
}

h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

h2 {
  color: #222;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 15px;
}

p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

ul {
  margin: 20px;
  width: 70%;
  padding-left: 2rem;
  color: #666;
  font-weight: 400;
}

.fade-enter-active,
.fade-leave.active {
  transition: opacity 1.5s;
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
  transform: translateY(70%) translateX(100vw);
}
</style>