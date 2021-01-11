<template>
  <div id="PlayerBoard">
    <div id="mainBoard" :style="{ backgroundColor: player.color }">  
       <div class="button firstCoulum">
          <InfoButtons 
          :modalProps="myItemsProps"
          :labels="labels" />
        </div>
      <div id="itemSection">
        <div id="itemGrid">
          <!--countItems = [fastaval, movie, technology, figures, music]-->
          <div class="dot fastaval">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="item1Props"
              :labels="labels" />
            </div>
          </div>
          <div class="dot movie">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="item2Props" 
              :labels="labels"/>
            </div>
          </div>
          <div class="dot technology">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="item3Props"
              :labels="labels" />
            </div>
          </div>
          <div class="dot figures">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="item4Props" 
              :labels="labels"/>
            </div>
          </div>
          <div class="dot music">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="item5Props" 
              :labels="labels"/>
            </div>
          </div>
          <p>{{ countItems[0] }}</p>
          <p>{{ countItems[1] }}</p>
          <p>{{ countItems[2] }}</p>
          <p>{{ countItems[3] }}</p>
          <p>{{ countItems[4] }}</p>
        </div>
      </div>
        <div class="skillsBottlesSection">
          <div class="button">
        <!--<div class="button firstColumn">-->
          <InfoButtons 
          :modalProps="mySkillsProps"
          :labels="labels" />
        </div>
        <div class="bottles">
          <p>{{ labels.playerBoard28 }} {{player.bottles}}</p>
          <p>{{ labels.playerBoard29 }}  {{player.availableBottles}}</p>
          </div>
        </div>
      <div id="skillSection">
        <div id="skillGrid">
          <!--countSkills = [bottle, workerIncome, workerCard, auctionIncome, VP-all,
                VP-fastaval, VP-movie, VP-technology, VP-figures, VP-music]-->
          <div class="dot bottleSkill">
            <div class="smallButton">
              <InfoButtons 
              :modalProps="skill1Props" 
              :labels="labels"/>
            </div>
          </div>
          <div class="dot workerIncomeSkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill2Props" 
              :labels="labels"/>
            </div>
          </div>
          <div class="dot workerCardSkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill3Props"
              :labels="labels" />
            </div>
          </div>
          <div class="dot auctionIncomeSkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill4Props"
              :labels="labels" />
            </div>
          </div>
          <div class="dot VP-allSkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill5Props"
              :labels="labels" />
            </div>
          </div>
          <div class="dot VP-fastavalSkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill6Props"
              :labels="labels" />
            </div>
          </div>
          <div class="dot VP-movieSkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill7Props" 
              :labels="labels"/>
            </div>
          </div>
          <div class="dot VP-technologySkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill8Props"
              :labels="labels" />
            </div>
          </div>
          <div class="dot VP-figuresSkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill9Props"
              :labels="labels" />
            </div>
          </div>
          <div class="dot VP-musicSkill">
              <div class="smallButton">
              <InfoButtons 
              :modalProps="skill10Props"
              :labels="labels" />
            </div>
          </div>
          <p>{{ countSkills[0] }}</p>
          <p>{{ countSkills[1] }}</p>
          <p>{{ countSkills[2] }}</p>
          <p>{{ countSkills[3] }}</p>
          <p>{{ countSkills[4] }}</p>
          <p>{{ countSkills[5] }}</p>
          <p>{{ countSkills[6] }}</p>
          <p>{{ countSkills[7] }}</p>
          <p>{{ countSkills[8] }}</p>
          <p>{{ countSkills[9] }}</p>
        </div>
      </div>
        <div id="incomeSection">
          <div class="button">
            <InfoButtons 
            :modalProps="myIncomeProps"
            :labels="labels" />
          </div>

          <div class="income dot">
            <p>&#36;{{ countIncome }}</p>
          </div>
        </div>

        <div id="moneySection">
          <div class="button">
            <InfoButtons 
            :modalProps="myMoneyProps"
            :labels="labels" />
          </div>
          <div class="money dot">
            <p>&#36;{{ player.money }}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import InfoButtons from "../components/InfoButtons.vue";
export default {
  name: "PlayerBoard",
  props: {
    player: Object,
    labels: Object,
  },
  components: {
    InfoButtons,
  },

  computed: {
    countItems: function () {
      //count = [fastaval, movie, technology, figures, music]
      let count = [0, 0, 0, 0, 0];
      for (let i = 0; i < this.player.items.length; i++) {
        if (this.player.items[i].item === "fastaval") {
          count[0] += 1;
        } else if (this.player.items[i].item === "movie") {
          count[1] += 1;
        } else if (this.player.items[i].item === "technology") {
          count[2] += 1;
        } else if (this.player.items[i].item === "figures") {
          count[3] += 1;
        } else if (this.player.items[i].item === "music") {
          count[4] += 1;
        }
      }
      return count;
    },
    countSkills: function () {
      /*count = [bottle, workerIncome, workerCard, auctionIncome, VP-all,
            VP-fastaval, VP-movie, VP-technology, VP-figures, VP-music]*/
      let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < this.player.skills.length; i++) {
        if (this.player.skills[i].skill === "bottle") {
          count[0] += 1;
        } else if (this.player.skills[i].skill === "workerIncome") {
          count[1] += 1;
        } else if (this.player.skills[i].skill === "workerCard") {
          count[2] += 1;
        } else if (this.player.skills[i].skill === "auctionIncome") {
          count[3] += 1;
        } else if (this.player.skills[i].skill === "VP-all") {
          count[4] += 1;
        } else if (this.player.skills[i].skill === "VP-fastaval") {
          count[5] += 1;
        } else if (this.player.skills[i].skill === "VP-movie") {
          count[6] += 1;
        } else if (this.player.skills[i].skill === "VP-technology") {
          count[7] += 1;
        } else if (this.player.skills[i].skill === "VP-figures") {
          count[8] += 1;
        } else if (this.player.skills[i].skill === "VP-music") {
          count[9] += 1;
        }
      }
      return count;
    },
    countIncome: function () {
      return this.player.income.length;
    },

    myItemsProps: function () {
      return {
        value: this.labels.playerBoard1,
        text: this.labels.playerBoard2,
        title: this.labels.playerBoard1,
        classes: `${this.player.color} button`,
      }
    },

    mySkillsProps: function () {
      return {
        value: this.labels.playerBoard3,
        text: this.labels.playerBoard4,
        title: this.labels.playerBoard3,
        classes: `${this.player.color} button`,
      }
    },

    myIncomeProps: function () {
      return {
        value: this.labels.playerBoard5,
        text: this.labels.playerBoard6,
        title: this.labels.playerBoard5,
        classes: `${this.player.color} button`,
      }
    },

     myMoneyProps: function () {
      return {
        value: this.labels.playerBoard7,
        text: this.labels.playerBoard8,
        title: this.labels.playerBoard7,
        classes: `${this.player.color} button`,
      }
    },

    item1Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard13,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    item2Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard14,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    item3Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard15,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    item4Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard16,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    item5Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard17,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill1Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard18,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill2Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard19,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill3Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard20,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill4Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard21,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill5Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard22,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill6Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard23,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill7Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard24,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill8Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard25,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill9Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard26,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },

    skill10Props: function () {
      return {
        value: "i",
        text: this.labels.playerBoard27,
        title: "",
        classes: `${this.player.color} smallButton`,
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainBoard {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  text-align: center;
  color: black;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
#mainBoard h2 {
  font-size: 90%;
}
#mainBoard p {
  font-size: 100%;
  font-weight: bold;
}
#itemSection {
  grid-row: 1/2;
  grid-column: 2/3;
}
#skillSection {
  grid-row: 2/3;
  grid-column: 2/3;
}
/* #infoSection {
  grid-row: 1/3;
  grid-column: 3/4;
  /*display: grid;
  grid-template-columns: fit-content;
  grid-template-rows: fit-content fit-content fit-content;
}*/

#itemGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
#skillGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
}

#incomeSection {
  grid-row: 1/2;
  grid-column: 3/4;
}

#moneySection {
  grid-row: 2/3;
  grid-column: 3/4;

}

.bottles {
  font-size: 80%;
}

.skillsBottlesSection {
  grid-column: 1/2;
}

/*.firstColumn{
  grid-column: 1/2;
}*/

.dot {
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}
.income, .money {
  background-color: #ffe599ff;
  height: 3vw;
  width: 3vw;
}

.music {
  background: url("/images/ITEM-MUSIC.png");
  background-size: 3vw 3vw;
}
.movie {
  background: url("/images/ITEM-FILM.png");
  background-size:  3vw 3vw;
}
.technology {
  background: url("/images/ITEM-IT.png");
  background-size:  3vw 3vw;
}
.figures {
  background: url("/images/ITEM-ROBOT.png");
  background-size:  3vw 3vw;
}
.fastaval {
  background: url("/images/ITEM-PINGVIN.png");
  background-size:  3vw 3vw;
}
.bottleSkill {
  background: url("/images/SKILL-FLASKA.png");
  background-size:  3vw 3vw;
}
.workerIncomeSkill {
  background: url("/images/SKILL-GUBBE2PENG.png");
  background-size:  3vw 3vw;
}
.workerCardSkill {
  background: url("/images/SKILL-GUBBEKORT.png");
  background-size: 3vw 3vw;
}
.auctionIncomeSkill {
  background: url("/images/SKILL-1PENG.png");
  background-size:  3vw 3vw;
}
.VP-allSkill {
  background: url("/images/SKILL-5STARS.png");
  background-size:  3vw 3vw;
}
.VP-fastavalSkill {
  background: url("/images/SKILL-PINGVINEX.png");
  background-size:  3vw 3vw;
}
.VP-figuresSkill {
  background: url("/images/SKILL-ROBOTEX.png");
  background-size:  3vw 3vw;
}
.VP-movieSkill {
  background: url("/images/SKILL-FILMEX.png");
  background-size:  3vw 3vw;
}
.VP-technologySkill {
  background: url("/images/SKILL-ITEX.png");
  background-size:  3vw 3vw;
}
.VP-musicSkill {
  background: url("/images/SKILL-MUSICEX.png");
  background-size:  3vw 3vw;
}

.button {
  margin: 5px;
}

.smallButton {
  margin-top: 100%;
  margin-left: 100%;
}

@media only screen and (max-width: 1050px) {
  #mainBoard p {
  font-size: 70%;
}
}

</style>
