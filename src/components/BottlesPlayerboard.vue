<template>
<div id = "bottlesPlayerboard">
    <transition name="fade" appear>
        <div class="modal-overlay"></div>
    </transition>
    <transition name="slide" appear>
        <div class="modal">
              <h1>{{labels.income}}</h1>
              <p> {{labels.incomeGain1}}{{player.income.length}}{{labels.incomeGain2}}</p>
              <p>{{labels.remainingPlacements}}{{this.bottlesToPlace}}</p>
                <div class = "slotGrid">
                  <button :disabled="this.bottleIncome.gainOneCoin || this.bottlesToPlace <= 0"
                      @click="gainOneCoin()"> +$1 </button>
                  <button :disabled="this.bottleIncome.gainTwoCoins || this.bottlesToPlace <= 0"
                      @click="gainTwoCoins()"> +$2 </button>
                  <button :disabled="this.bottleIncome.gainCard || this.bottlesToPlace <= 0"
                      @click="gainCard()"> {{labels.draw}} </button>
                </div>
        </div>
    </transition>

</div>
    
</template>

<script>
export default {
  name: "BottlesPlayerboard",
  props: {
    player: Object,
    labels: Object

  },
  data: function () {
    return {
      bottleIncome: {
        gainOneCoin: false,
        gainTwoCoins: false,
        gainCard: false
      },
      bottlesToPlace: 5 - this.player.bottles,
    };
  },
  methods:{
    gainTwoCoins: function () {
        this.bottleIncome.gainTwoCoins = true;
        this.bottlesToPlace -= 1;

    },
    gainOneCoin: function () {
        this.bottleIncome.gainOneCoin = true;
        this.bottlesToPlace -= 1;
    },
    gainCard: function (){
        this.bottleIncome.gainCard = true;
        this.bottlesToPlace -= 1;
    },
  },
  watch:{
    bottlesToPlace: function() {
      if(this.bottlesToPlace == 0){
        console.log(this.bottleIncome)
        this.$emit("getBottleIncome", this.bottleIncome)
      }
    }
  }
};
</script>


<style scoped>

.slotGrid{
    display: flex;
    justify-content: center;
    grid-gap: 5px;
}
.modal-overlay {
  position: absolute;
  height: 6050px; /* ändra så att den bara är hela sidan!! */
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
  background-color: #fff;
  color: black;
  padding: 25px;
  border-radius: 8px;
}

button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  height: 5vw;
  width: 5vw;
  background-image: linear-gradient(to right, coral, #ff5858);
  border-radius: 50%;
  color: #fff;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}

button:disabled{
    background-image: none;
    background-color: darkgray;
}
</style>
