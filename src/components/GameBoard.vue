<template>
  <div id="game-board">
    <div id="item-section" class="board-section">
      <div class="section-slots">
        <h2 class="category-title">Items</h2>
        <div class="bottleCircles">
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
        </div>
      </div>
      <div class="section-card cardslots"></div>
    </div>

    <div id="raise-value-section" class="board-section">
      <div class="section-slots">
        <h2 class="category-title">Items</h2>
        <div class="bottleCircles">
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
        </div>
      </div>
      <div class="raise-value-slot-container">
        <div class="raise-value-slot"></div>
        <div class="raise-value-slot"></div>
        <div class="raise-value-slot"></div>
        <div class="raise-value-slot"></div>
        <div class="raise-value-slot"></div>
      </div>
    </div>

    <div id="auction-section" class="board-section">
      <div class="section-slots">
        <h2 class="category-title">Auction</h2>
        <div class="bottleCircles">
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
          <div class="circleComponent">
                    <CircleComponent v-bind:value=1 />
          </div>
        </div>
      </div>
      <div class="section-card cardslots">
        <CollectorsCard
          v-for="(card, index) in auctionCards"
          :card="card"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>


<script>
import CollectorsCard from '@/components/CollectorsCard.vue';
import CircleComponent from '@/components/CircleComponent.vue';


export default {
  name: 'GameBoard',
  components: {
    CollectorsCard,
    CircleComponent
  },
  props: {
    skillsOnSale: Array,
    auctionCards: Array,

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game-board {
  width: 100%;
  background-color: #eeeeeeff;
  border: 1px solid #19181850;
  color: black;
}

.board-section {
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid #19181850;
}

#item-section {
  background-color: #ea9999ff;
}

#skill-section {
  background-color: #93c47dff;
}

.raise-value-slot-container {
  width: 80%;
  display: flex;
  justify-content: space-around;
}
.raise-value-slot {
  background-color: #6d9eebff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #19181850;
}

#auction-section {
  background-color: #b4a7d6ff;
}

.section-slots {
  width: 20%;
  display: flex;
  flex-direction: column;
}
.section-card {
  width: 80%;
}

/* #C1E1C1 for skills (Green) */

.box {
  border-radius: 5px;
  border-color: tan;
  padding: 1px;
}

.section {
  display: flex;
}

.bottleCircles {
  width: 80%;
  display: grid;
  align-self: center;
  grid-gap: 5px;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}

.category-title {
  color: black;
  text-align: center;
}

.bottleCircles p {
  grid-column: 1/3;
}

/*Kan tas bort eftersom circleComponent är
/*.bottleCircle {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  color: black;
  background-color: white;
  border-radius: 50%;
}*/

.circleComponent {
   margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 105px);
  grid-template-rows: repeat(auto-fill, 145px);
}
.cardslots div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.cardslots div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
</style>
