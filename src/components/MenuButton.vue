<template>
  <div>
    <button class="button" @click="showModal = true">M</button>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>

    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
        <h1>Menu</h1>

        <div class="buttonContainer">
          <button class="mbutton">Invite a friend to this game</button>
          <button class="mbutton">Demo</button>
          <DemoButton/>
          <button class="mbutton" @click="showModal = false">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import DemoButton from "../components/DemoButton.vue";

export default {
  name: "MenuButton",
  components: {
      DemoButton,
  },
  data: function () {
    return {
      showModal: false,
    };
  },
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "monserrat", sans-serif;
}

#app {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}

.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(to right, gray, black);
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}

.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

.mbutton {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 10px 15px;
  border-radius: 8px;
  color: gray;
  font-weight: 700;
  transition: 0.1s ease-out;
}

.mbutton:hover {
  background-image: linear-gradient(to right, rgb(206, 204, 204), rgb(177, 173, 173));
  color: #fff;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0);
}

.modal {
  position: fixed;
  top: 10%;
  left: 0;
  
  z-index: 99;

  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
}

h1 {
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
  transform: translateY(-50%) translateX(-100vw);
}
</style>