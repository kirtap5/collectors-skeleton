<template>
  <div id="PlayerBoard">
    <div class="mainBoard">
      <div class="slotSpace">
        <div class="slotWrapper">
          <h1 class="title">Itemz</h1>
          <div class="dot item"></div>
          <div class="dot item"></div>
          <div class="dot item"></div>
          <div class="dot item"></div>
          <div class="dot item"></div>
        </div>

        <div class="slotWrapper">
          <h1 class="title">ActionZ</h1>
          <div v-on:click="actionMade('A')" class="dot bottle" id="A"></div>
          <div v-on:click="actionMade('B')" class="dot bottle" id="B"></div>
          <div v-on:click="actionMade('C')" class="dot bottle" id="C"></div>
          <div v-on:click="actionMade('D')" class="dot bottle" id="D"></div>
          <div v-on:click="actionMade('E')" class="dot bottle" id="E"></div>
        </div>

        <div class="slotWrapper">
          <h1 class="title">Skillz</h1>
          <div id="skillGrid">
            <div class="dot skill"></div>
            <div class="dot skill"></div>
            <div class="dot skill"></div>
            <div class="dot skill"></div>
            <div class="dot skill"></div>
            <div class="dot skill"></div>
            <div class="dot skill"></div>
            <div class="dot skill"></div>
            <div class="dot skill"></div>
          </div>
        </div>

        <div class="slotWrapper">
          <h1 class="title">Work</h1>
          <div class="dot work"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerBoard",
  methods: {
    actionMade: function (id) {
      console.log(id);
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainBoard {
  background-color: #d9ead3ff;
  height: 250px;
  display: grid;
  grid-template-columns: 70% 30%;
}

.slotSpace {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}

.dot {
  height: 50px;
  width: 50px;
  border: 10px;
  border-radius: 50%;
  border-color: black;
  margin-right: 10px;
}

.item {
  background-color: #ea9999ff;
}

.skill {
  background-color: #6aa84fff;
}

#skillGrid {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50% 50%;
}

.work {
  background-color: #ffe599ff;
  height: 80px;
  width: 80px;
}

.bottle {
  height: 60px;
  width: 60px;
  background-color: whitesmoke;
}

.bottle:hover {
  background-color: red;
  transition: 0.3s;
}

.title {
  color: black;
  margin-left: 5px;
  margin-right: 10px;
  text-align: center;
  align-items: center;
}

.slotWrapper {
  display: flex;
  align-items: center;
}
</style>
