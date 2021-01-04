<template>
  <div id="item-section" class="board-section">
    <InfoButtons
      :modalProps='auctionProps'
    />
    <div class="buy-cards">
      <div class="cardslots" v-for="(card, index) in auctionCards" :key="index">
        <CollectorsCard
          :card="card"
          :availableAction="card.available"
          @doAction="selectAction(card)"
        />
        <!-- {{ cardCost(card) }} -->
      </div>
    </div>
    <div class="button-section">
      <div class="buttons" v-for="(p, index) in placement" :key="index">
        <button
          v-if="p.playerId === null"
          :disabled="cannotAfford(p.cost)"
          @click="placeBottle(p)"
        >
          ${{ p.cost }}
        </button>
        <div v-if="p.playerId !== null">
         <!-- {{ p.playerId }} -->
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
    InfoButtons,
    CollectorsCard,
  },
  props: {
    labels: Object,
    player: Object,
    auctionCards: Array,
    marketValues: Object,
    placement: Array,
    allCardsChosen: Boolean,
  },

  data: function() {
    return {
      auctionProps: {
        value: 'Auction',
        text: 'Choose one of the four cards in the Auction pool or one card from your hand and place it in the space reserved for auctioned items. If you placed a card from your hand, you may place it face down. The card remains face down and the auction is performed without any other players knowing what kind of card it is. The player who chose this action may bid any number of coins with a minimum of one. Now the player to their left must place a higher bid or pass. Continue in clockwise order until all players but one has passed. The player that won the auction must pay the bid amount to the supply. When paying for the auction you may use cards from your hands as coins. Cards can be worth $1 or $2 as depicted in the upper right corner of the cards. Note that cards can only be used as coins during an auction. If the card just won was placed face down, the winning player may look at the card without showing it to other players. The player that wins the auction may place the card wherever they want; as an item under their player board, as a market share in the market pool, or as a skill under their player board. If the newly won card was face down, the auction winner may place the card face down as a secret item (next to the one that was chosen during the setup).',
        title: 'Auction',
        classes: 'button'
      }
    }
    
  },

  methods: {
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

        this.allCardsChosen
          ? this.highlightAvailableCards()
          : this.$set(card, "available", false);
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-cards {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 85px);
  grid-template-rows: repeat(auto-fill, 117px);
}
.button-section {
  width: 20%;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
}

#item-section {
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
</style>
