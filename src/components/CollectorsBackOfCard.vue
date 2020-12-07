<template>
    <div class="card">
        <img src="images/baksida.png">
    </div>
</template>

<script>
export default {
  name: 'CollectorsBackOfCard',
  props: {
    card: Object
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    color:red;
    width:250px;
    height:350px;
    /*background-image: url('/images/collectors-cards.png');*/
    border-radius: 10px;
  }


</style>
