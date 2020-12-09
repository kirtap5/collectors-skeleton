<template>
  <div id="game-board">
    <div id="item-section" class="board-section">
      <div class="section-slots">
        <h2 class="category-title">Items</h2>
        <div class="bottleCircles">
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
        </div>
      </div>
      <div class="section-card cardslots"></div>
    </div>

    <div id="skill-section" class="board-section">
      <div class="section-slots">
        <h2 class="category-title">Skills</h2>
        <div class="bottleCircles">
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
        </div>
      </div>
      <div class="section-card cardslots">
                  <CollectorsCard
              v-for="(card, index) in skillsOnSale"
              :card="card"
              :key="index"
            />
      </div>
    </div>
    <div id="raise-value-section" class="board-section">
      <div class="section-slots">
        <h2 class="category-title">Raise value</h2>
        <div class="bottleCircles">
          <div class="bottleCircle">$0</div>
          <div class="bottleCircle">$0</div>
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
          
        </div>
      </div>
    
    <div class="raise-value-temporary">

      <div class="raise-value-slot-container">
        
        <div>
          <h5>Fastival</h5>
          <div class="raise-value-slot"><img src="images/RAISEVAL-PINGVIN.png" id="fastival" width="100%"></div>
          <p> 1 €</p> <!-- ska ändras i funktion -->
        </div>

        <div>
          <h5>Figure</h5>
          <div class="raise-value-slot"><img src="images/RAISEVAL-ROBOT.png" id="figure" width="100%"></div> 
          <p> 1 €</p> <!-- ska ändras i funktion -->
        </div>
        
        <div>
          <h5>Music</h5>
          <div class="raise-value-slot"><img src="images/RAISEVAL-MUSIC.png" id="music" width="100%"></div>
          <p> 1 €</p> <!-- ska ändras i funktion -->
        </div>
        
        <div>
          <h5>Movie</h5>
          <div class="raise-value-slot"><img src="images/RAISEVAL-FILM.png" id="movie" width="100%"></div>
          <p> 1 €</p> <!-- ska ändras i funktion -->
        </div>
        
        <div>
          <h5>Technology</h5>
          <div class="raise-value-slot"><img src="images/RAISEVAL-IT.png" id="technology" width="100%"></div>
          <p> 1 €</p> <!-- ska ändras i funktion -->
        </div>
        
        
        
      </div>

      <div class="raise-value-slot-container">hej</div>
    </div>

      
    </div>

    <div id="auction-section" class="board-section">
      <div class="section-slots">
        <h2 class="category-title">Auction</h2>
        <div class="bottleCircles">
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
          <div class="bottleCircle">$1</div>
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
import CollectorsCard from '@/components/CollectorsCard.vue'


export default {
  name: 'GameBoard',
  components: {
    CollectorsCard,
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
  width: 60%;
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
  width: 100%;
  display: flex;
  justify-content: space-around;
  border: solid green 0.5px;
  height: 180px;
}

.raise-value-temporary {
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 100%;
  width: 100%;
}

.raise-value-slot {
  /*background-color: #6d9eebff;*/
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

.bottleCircle {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  color: black;
  background-color: white;
  border-radius: 50%;
}

.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
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
