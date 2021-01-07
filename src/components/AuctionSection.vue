<template>
  <div id="auction-section" class="board-section">
    <InfoButtons
      :modalProps='auctionProps'
    /> 
    <div class='upForAuctionWrap'>
        <div class="buy-cards">
          <div
            class="cardslots"
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
        <div class="placeBid-section">
          <button v-on:click="currentBid++" class='auctionBtns'>Your bid: {{ currentBid }}</button>
          <button v-on:click="placeBid()" class='auctionBtns'>Place bid</button>
          <button v-on:click="passed()" class='auctionBtns'>Pass</button>
        </div>
        <div>
        Current highest bid:
        {{ highestBid }}
        placed by: 
        {{ highestBiddingPlayer }}
        </div>
        <div>
          <div>Send to</div>
          <input type="button" class='sendToBtn' id='toItems' value="Items" @click="auctionToHand('items')" />
          <input type="button" class='sendToBtn' id='toSkills' value="Skills" @click="auctionToHand('skills')" />
          <input type="button" class='sendToBtn' id='toRaiseval' value="Raise value" @click="auctionToHand('raiseval')" />
        </div>
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
    auctionCards: Array,
    upForAuction: Array,
    marketValues: Object,
    placement: Array,
    highestBid: Number,
    highestBiddingPlayer: String,
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
      let minCost = 100;
      for (let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
          minCost = cost + this.marketValues[key];
      }
      return this.player.money < minCost;
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      this.$emit("placeBottle", p.cost);
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
  width: 50%;
display: grid;
grid-template-columns: 70% 30%;
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

.clickedButton {
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  text-align: center;
  align-items: flex-start;
  color: black;
}

#toItems{
  background-color: #ea9999ff;  
}

#toSkills{
  background-color: #93c47dff;
}

#toRaiseval{
  background-color: #b4a7d6ff;
}
.sendToBtn{
  width: 100%;
  display:block;
}

.auctionBtns{
  width: 100%;
  display:block;  
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
  background-color: #ea9999ff;
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
