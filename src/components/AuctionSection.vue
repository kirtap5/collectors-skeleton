<template>
  <div id="auction-section" class="board-section">
    <InfoButtons
      :modalProps='auctionProps'
    /> 
    <div v-if="upForAuction.length != 0" class='upForAuctionWrap'>
          <transition name="fade slide" appear>
          <div class='upForAuctionModal'>
          <div class="buy-cards">´
          <div
            class="cardslotsUpForAuction"
            v-for="(card, index) in upForAuction"
            :key="index"
          >
            <CollectorsCard
              :card="card"
              :availableAction="card.available"
              @doAction="placeBid()"
            />
          </div>
        </div>
        <div class='auctionBtnsSection'>
        <div class="placeBid-section">
          <button v-on:click="currentBid++" :disabled="currentBid >= player.money" class='auctionBtns'>Raise bid</button>
          <div id='currentBid'>Your current bid: {{ currentBid }}</div>
          <button v-on:click="placeBid()" class='auctionBtns'>Place bid</button>
          <button v-on:click="passed()" class='auctionBtns'>Pass</button>
        </div>
        </div>
        <div id='currentHighestBid'>
        Current highest bid:
        {{ highestBid }}
        placed by: 
        {{ highestBiddingPlayer }}
        </div>
        <div>
          <div id="sendToSection">Send to</div>
          <input type="button" class='sendToBtn' id='toItems' value="Items" @click="auctionToHand('items')" />
          <input type="button" class='sendToBtn' id='toSkills' value="Skills" @click="auctionToHand('skills')" />
          <input type="button" class='sendToBtn' id='toRaiseval' value="Raise value" @click="auctionToHand('raiseval')" />
        </div> 
        </div>
      </transition>
      </div>

    <div class="buy-cards">
        <div
          class="cardslots"
          v-for="(card, index) in auctionCards"
          :key="index"
        >
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="selectAction(card)"
          />
        </div>
      </div>
      <div class="button-section">
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
            v-if="p.playerId === null"
            :disabled="buttonDisabled(p.cost)"
            @click="placeBottle(p)"
          >
            ${{ p.cost }}
          </button>
        <div class="clickedButton" v-if="p.playerId !== null && typeof players !== 'undefined'" :style="{backgroundColor: players[p.playerId].color}">
          
            {{ p.playerId }}          
        </div>
        </div>
      </div>
    </div>


</template>

<script>
import InfoButtons from "../components/InfoButtons.vue";
import CollectorsCard from "@/components/CollectorsCard.vue";

export default {
  name: "AuctionSection",
  components: {
    CollectorsCard,
    InfoButtons
  },
  props: {
    labels: Object,
    player: Object,
    playerId: String,
    auctionCards: Array,
    upForAuction: Array,
    marketValues: Object,
    placement: Array,
    highestBid: Number,
    highestBiddingPlayer: String,
    players: Object,
  },
  data: function () {
    return {
      currentBid: 0,
      auctionProps: {
        value: "Auction",
        text:
          "Här kommer text om auction",
        title: "Auction",
        classes: "button",
      },
    };
  },
  methods: {
      buttonDisabled: function (cost) {
      if (
        this.cannotAfford(cost) ||
        !this.player.active ||
        this.player.availableBottles == 0
      ) {
        return true;
      } else return false;
    },
    cannotAfford: function (cost) {
      return this.player.money < cost;
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit("placeBottle", p);
      this.highlightAvailableCards(p.cost);
    },
    highlightAvailableCards: function (cost = 100) {
      for (let i = 0; i < this.auctionCards.length; i += 1) {
        if (
          this.marketValues[this.auctionCards[i].item] <=
          this.player.money - cost
        ) {
          this.$set(this.auctionCards[i], "available", true);
        } else {
          this.$set(this.auctionCards[i], "available", false);
        }
        this.chosenPlacementCost = cost;
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (
          this.marketValues[this.player.hand[i].item] <=
          this.player.money - cost
        ) {
          this.$set(this.player.hand[i], "available", true);
          this.chosenPlacementCost = cost;
        } else {
          this.$set(this.player.hand[i], "available", false);
          this.chosenPlacementCost = cost;
        }
      }
    },
    selectAction: function (card) {
      if (card.available) {
        this.$emit("selectAction", card);
        this.highlightAvailableCards();
      }
    },
    auctionToHand: function (d){
      if (d == 'items'){
        this.$emit("auctionToHand", 'items')
      }
      if (d == 'skills'){
        this.$emit("auctionToHand", 'skills')
      }
      if (d == 'raiseval'){
        this.$emit("auctionToHand", 'raiseval')
      }
      this.highlightAvailableCards();
    },
    placeBid: function () {
      this.$emit("placeBid", this.currentBid);
      this.currentBid = 0;
    },
    passed: function () {
      this.$emit("passed");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upForAuctionWrap {
  position: absolute;
  height: 6050px; /* ändra så att den bara är hela sidan!! */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.9);
  text-align: center;
  justify-content: center;

}

.auctionBtnsSection{
  justify-content: center;
  display:block;
}

.cardslotsUpForAuction{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

#currentHighestBid{
  color: #222;
  text-align:center;
}

#currentBid{
  color: #222;
  text-align:center;
}

.upForAuctionModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  height: 50%;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  display: grid;
  grid-template-rows: 60% 20% 10% 10%;

}

.buy-cards {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 85px);
  grid-template-rows: repeat(auto-fill, 117px);
}

.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
  margin-right: 10px;
}

.buttons p {
  margin: 0;
}

.clickedButton {
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  text-align: center;
  align-items: flex-start;
  color: black;
}

#toItems{
  text-align: center;
  background-image: linear-gradient(to right, rgb(255, 170, 170), #ea9999ff);  
}

#toSkills{
  text-align: center;
  background-image: linear-gradient(to right, rgb(192, 253, 163), #93c47dff);
}

#toRaiseval{
  text-align: center;
  background-image: linear-gradient(to right, rgb(216, 200, 255), #b4a7d6ff);
}
.sendToBtn{
  width: 25%;
  height: 75%;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.3s ease-out;
  margin: auto;
  text-align: center;
  /*text-align: center;
  margin: auto;
  display: flex;*/
}

.sendToBtn:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
} 

.auctionBtns{
  width: 25%;
  height: 75%;
  display:block;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  border-radius: 8px;
  background-image: linear-gradient(to right, rgb(236, 179, 93), rgb(224, 159, 61));
  color: #fff;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.3s ease-out;
  margin: auto;
  text-align: center;
  /*text-align: center;
  margin: auto;
  display: flex;*/ 
}
.auctionBtns:disabled{
  background-image: none;
  background-color: darkgray;
  box-shadow:none;
}

.auctionBtns:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
} 

.board-section {
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #19181850;
  border-radius: 10px;
  margin: 2px;
}

#auction-section {
  background-color: rgb(241, 199, 134);
}

.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 85px);
  grid-template-rows: repeat(auto-fill, 117px);
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
  position:absolute;
}

.button:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
    } 
  .green {
    background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(50,172,109,1) 0%, rgba(209,251,155,1) 100.2% );
  }
  .blue {
    background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(147,230,241,1) 0%, rgba(145,192,241,1) 45.5% );
  }
  .red {
    background-image: linear-gradient( 143.3deg,  rgba(216,27,96,1) 33.1%, rgba(237,107,154,1) 74.9% );
  }
  .yellow {
    background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,252,200,1) 0%, rgba(255,247,94,1) 90% );
  }
    
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 98;
      background-color: rgba(0, 0, 0, 0.9);
    }
    
    
   .modal {
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     z-index: 99;
     
     width: 100%;
     max-width: 400px;
     background-color: #FFF;
     padding: 25px;
     border-radius: 8px;
   }
   
 h1{
       color: #222;
       font-size: 32px;
       font-weight: 900;
       margin-bottom: 15px;
     }
     
  p {
    color: #666;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 15px;
  }

.fade-enter-active,
.fade-leave.active {
  transition: opacity 1.5s;
  /* opacity: 0.9; */
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
 transform: translateY(-50%) translateX(100vw); 
}


@media only screen and (max-width: 1050px) {
  .cardslotsUpForAuction {
    display: inline;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, 65px);
    grid-template-rows: repeat(auto-fill, 90px);
    transform: scale(0.5) translate(435%, -25%);
    transition: 0.2s;
    transition-timing-function: ease-out;
  }

  .auctionBtnsSection{
    transform: scale(0.5);
    transition: 0.2s;
    transition-timing-function: ease-out;

  }

  #currentHighestBid{
    transform: scale(0.5);
    transition: 0.2s;
    transition-timing-function: ease-out;

  }

  #sendToSection{    
    transform: scale(0.5);
    transition: 0.2s;
    transition-timing-function: ease-out;

  }
  
    /* phones */
  .buy-cards {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 65px);
    grid-template-rows: repeat(auto-fill, 90px);
  }
  .cardslots {
    display: grid;
    grid-template-columns: repeat(auto-fill, 65px);
    grid-template-rows: repeat(auto-fill, 90px);
    transform: scale(0.75) translate(-25%, -25%);
    transition: 0.2s;
    transition-timing-function: ease-out;
  }
  
  .upForAuctionWrap {
    size: 80%;
  }

  .cardslots div {
    z-index: 0;
  }

  .cardslots div:hover {
    transform: scale(1) translate(-25%, 0);
    z-index: 1;
  }
}

@media only screen and (max-width: 850px) {
  .buttons {
    grid-template-columns: repeat(auto-fill, 30px);
    margin-right: 10px;
  }
  .buttons p{
     font-size: 50%;
   }
}


</style>
