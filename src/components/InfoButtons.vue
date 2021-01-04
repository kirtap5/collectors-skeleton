
<template>
  <div>
    <div>
      <button :class="modalProps.classes" @click="toggleModal">
        {{ modalProps.value }}
      </button>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="toggleModal"></div>
      </transition>
      <transition name="slide" appear>
        <div class="modal" v-if="showModal">
          <h1>{{ modalProps.title }}</h1>
          <p>{{ modalProps.text }}</p>
          <button class="button red" @click="toggleModal">Close</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoButtons",
  props: { modalProps: Object },

  data: function () {
    return {
      showModal: false,
    };
  },

  methods: {
    toggleModal: function () {
      if (this.showModal == false) {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },

    // if (id=='bottles') {
    //     return {showBottles: false
    //     }
    //   }

    // else {return {
    //       showModal: false
    //     }
    //   }
  },

  //   return {
  //     showModal: false

  // }

  // methods: {
  //   infoSquare: function(id){
  //     console.log(id)
  //   }
  // }
};
</script>



<style scoped>
/* https://gradienthunt.com/ */

.container {
  display: grid;
  margin: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

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
  background-image: linear-gradient(to right, #cc2e50, #ff5858);
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.3s ease-out;
}

.smallButton {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 5px 10px;
  background-image: linear-gradient(to right, #cc2e50, #ff5858);
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.4);
  transition: 0.2s ease-out;
}

.smallButton:hover {
  box-shadow: 4px 4px rgba(0, 0, 0, 0.6);
}

.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}
.green {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(50, 172, 109, 1) 0%,
    rgba(209, 251, 155, 1) 100.2%
  );
}
.blue {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(147, 230, 241, 1) 0%,
    rgba(145, 192, 241, 1) 45.5%
  );
}
.red {
  background-image: linear-gradient(
    143.3deg,
    rgba(216, 27, 96, 1) 33.1%,
    rgba(237, 107, 154, 1) 74.9%
  );
}
.yellow {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(255,247,94,1) 0%,
  gold 90%
  
  );
}

.CornflowerBlue {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(145, 192, 241, 1) 33.1%,
    CornflowerBlue 74.9%
  );
}

.DarkSeaGreen {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(172, 192, 205, 1) 0%,
    DarkSeaGreen 90%
  );
}

.Hotpink {
  background-image: linear-gradient(
    143.3deg,
    rgba(216, 27, 96, 1) 33.1%,
    rgba(237, 107, 154, 1) 74.9%
  );
}

.Lavender {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(147, 230, 241, 1) 0%,
    Lavender 90%
  );
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
