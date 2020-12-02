<template>
  <div>
    <!-- <div v-if="card.x>0" :class="['card', {'available-to-choose': availableAction}]" :style="{'background-position': (-(card.x-1)*250)+'px ' + (-(card.y-1)*350)+'px'}" @click="doAction"> -->
    <div v-on:click="showModal">CLICK ME</div>
    <div v-if="isVisible">WOOOOOOO</div>
  </div>
</template>

<script>
export default {
  name: "PopupModal",
  props: {},
  data: function () {
    return{
    isVisible: false,
    }
  },
  methods: {
    showModal: function () {
      this.isVisible == false ? this.isVisible = true : this.isVisible = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
