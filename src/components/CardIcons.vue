<template>
  <div class='bigwrap'>
      <!-- items -->
    <div class="dot" id="iFILM"></div>
    <div class="dot" id="iROBOT"></div>
    <div class="dot" id="iIT"></div>
    <div class="dot" id="iMUSIC"></div>
    <div class="dot" id="iPINGVIN"></div>

    <!-- raiseval -->
    <div class="dot" id="rvFILM"></div>
    <div class="dot" id="rvROBOT"></div>
    <div class="dot" id="rvIT"></div>
    <div class="dot" id="rvMUSIC"></div>
    <div class="dot" id="rvPINGVIN"></div>

    <!-- skills -->
    <div class="dot" id="onePENG"></div>
    <div class="dot" id="fiveSTARS"></div>
    <div class="dot" id="GUBBE2PENG"></div>
    <div class="dot" id="GUBBEKORT"></div>
    <div class="dot" id="FLASKA"></div>
    <div class="dot" id="FILMEX"></div>
    <div class="dot" id="ROBOTEX"></div>
    <div class="dot" id="ITEX"></div>
    <div class="dot" id="MUSICEX"></div>
    <div class="dot" id="PINGVINEX"></div>
  </div>
</template>

<script>
export default {
  name: "CardIcons",
};
</script>


<style scoped>
.bigwrap {
    display: flex;
}
.dot {
  height: 50px;
  width: 50px;
  border: 10px;
  border-radius: 50%;
  border-color: black;
  margin-right: 10px;
}
#iFILM {
  background: url("/images/ITEM-FILM.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#iROBOT {
  background: url("/images/ITEM-ROBOT.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#iIT {
  background: url("/images/ITEM-IT.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#iMUSIC {
  background: url("/images/ITEM-MUSIC.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#iPINGVIN {
  background: url("/images/ITEM-PINGVIN.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;

}
#rvFILM {
  background: url("/images/RAISEVAL-FILM.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#rvROBOT {
  background: url("/images/RAISEVAL-ROBOT.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#rvIT {
  background: url("/images/RAISEVAL-IT.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#rvMUSIC {
  background: url("/images/RAISEVAL-MUSIC.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#rvPINGVIN {
  background: url("/images/RAISEVAL-PINGVIN.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#onePENG {
  background: url("/images/SKILL-1PENG.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#fiveSTARS {
  background: url("/images/SKILL-5STARS.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#GUBBE2PENG {
  background: url("/images/SKILL-GUBBE2PENG.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#GUBBEKORT {
  background: url("/images/SKILL-GUBBEKORT.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#FLASKA {
  background: url("/images/SKILL-FLASKA.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#FILMEX {
  background: url("/images/SKILL-FILMEX.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#ROBOTEX {
  background: url("/images/SKILL-ROBOTEX.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#ITEX {
  background: url("/images/SKILL-ITEX.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#MUSICEX {
  background: url("/images/SKILL-MUSICEX.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
#PINGVINEX {
  background: url("/images/SKILL-PINGVINEX.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
}
</style>
