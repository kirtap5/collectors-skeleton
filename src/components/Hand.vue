<template>
    <div id = "handSlot">

        <CollectorsCard v-for="(card, index) in player.hand"
            :card="card"
            :availableAction="card.available"
            :key="index"/>
        <div id="secretCard">
            <p>Secret</p>
            <CollectorsCard :card="player.secret" />
        </div>

    </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";

export default {
  name: "Hand",
  components: {
    CollectorsCard
  },
  props: {
    player: Object,
  },
};
</script>

<style scoped>
#handSlot {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
  background-color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
}
#handSlot div{
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
#handSlot div:hover {
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
#secretCard{
    background-color: coral;
    border-radius: 3px;
    padding: 10px;
    text-align:center;
}
</style>