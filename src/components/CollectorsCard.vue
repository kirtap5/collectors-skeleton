<template>
  <div v-if="card.x>0" :class="['card', {'available-to-choose': availableAction}]" :style="{'background-position': (-(card.x-1)*160)+'px ' + (-(card.y-1)*224)+'px'}" @click="doAction">

    <!-- Ändra här uppe också storleken innan det står px -->
    </div>
</template>

<script>
export default {
  name: 'CollectorsCard',
  props: {
    card: Object,
    availableAction: Boolean,
    actionType: String,
  },
  methods: {
    doAction: function() {
      this.$emit('doAction');
    },
  }
}
</script>

<style scoped>
  .card {
    color:red;
    user-select: none;
    width: 160px;
    height: 224px;
    background-image: url('/images/collectors-cards.png');
    border-radius: 5px;
    background-size: 3000%; /* Om halvera storlek: 30 kort 125px, ursprungsbilden är 7502px, vi vill ha hälften så bred = 3751px. 
    Bilden måste vara 30 ggr så stor som bredden på fönstret vet ej vad som menas??? men de e 30 kort i bredd, 
    alltså måste den vara 30 ggr så stor?? KONTENTAN: ha kvar detta med 3000% = 30 * 100 % och ändra exakt bara hur man vill med width och heigth!!
     Ändra också på rad 2*/
  }

  .available-to-choose {
    animation: jiggle 1s ease-in-out;
    animation-iteration-count:infinite;
    box-shadow: 0 0 10px yellow;
  }

  @keyframes jiggle {
    0% {transform: scale(0.5) rotate(0.5deg) translate(-50%,-50%);}
    50% {transform: scale(0.5) rotate(-0.5deg) translate(-50%,-50%);}
    100% {transform: scale(0.5) rotate(0.5deg) translate(-50%,-50%);}
  }


</style>
