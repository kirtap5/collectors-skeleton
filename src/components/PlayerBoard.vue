<template>
  <div id="PlayerBoard">
    <div id="mainBoard" :style="{ backgroundColor: player.color }">
      <div id="itemSection">
        <!-- <h2>Items</h2> -->
        <div class="button">
          <InfoButtons :modalProps="myItemsProps" />
        </div>
        <div id="itemGrid">
          <!--countItems = [fastaval, movie, technology, figures, music]-->
          <div class="dot fastaval">
              <div class="smallButton">
              <InfoButtons :modalProps="item1Props" />
            </div>
          </div>
          <div class="dot movie">
              <div class="smallButton">
              <InfoButtons :modalProps="item2Props" />
            </div>
          </div>
          <div class="dot technology">
              <div class="smallButton">
              <InfoButtons :modalProps="item3Props" />
            </div>
          </div>
          <div class="dot figures">
              <div class="smallButton">
              <InfoButtons :modalProps="item4Props" />
            </div>
          </div>
          <div class="dot music">
              <div class="smallButton">
              <InfoButtons :modalProps="item5Props" />
            </div>
          </div>
          <p>{{ countItems[0] }}</p>
          <p>{{ countItems[1] }}</p>
          <p>{{ countItems[2] }}</p>
          <p>{{ countItems[3] }}</p>
          <p>{{ countItems[4] }}</p>
        </div>
      </div>

      <div id="skillSection">
        <!-- <h2>Skills</h2> -->
        <div class="button">
          <InfoButtons :modalProps="mySkillsProps" />
        </div>

        <div id="skillGrid">
          <!--countSkills = [bottle, workerIncome, workerCard, auctionIncome, VP-all,
                VP-fastaval, VP-movie, VP-technology, VP-figures, VP-music]-->
          <div class="dot bottleSkill">
            <div class="smallButton">
              <InfoButtons :modalProps="skill1Props" />
            </div>
          </div>
          <div class="dot workerIncomeSkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill2Props" />
            </div>
          </div>
          <div class="dot workerCardSkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill3Props" />
            </div>
          </div>
          <div class="dot auctionIncomeSkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill4Props" />
            </div>
          </div>
          <div class="dot VP-allSkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill5Props" />
            </div>
          </div>
          <p>{{ countSkills[0] }}</p>
          <p>{{ countSkills[1] }}</p>
          <p>{{ countSkills[2] }}</p>
          <p>{{ countSkills[3] }}</p>
          <p>{{ countSkills[4] }}</p>
          <div class="dot VP-fastavalSkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill6Props" />
            </div>
          </div>
          <div class="dot VP-movieSkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill7Props" />
            </div>
          </div>
          <div class="dot VP-technologySkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill8Props" />
            </div>
          </div>
          <div class="dot VP-figuresSkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill9Props" />
            </div>
          </div>
          <div class="dot VP-musicSkill">
              <div class="smallButton">
              <InfoButtons :modalProps="skill10Props" />
            </div>
          </div>
          <p>{{ countSkills[5] }}</p>
          <p>{{ countSkills[6] }}</p>
          <p>{{ countSkills[7] }}</p>
          <p>{{ countSkills[8] }}</p>
          <p>{{ countSkills[9] }}</p>
        </div>
      </div>

      <div id="infoSection">
        <div id="incomeSection">
          <!-- <h2>Income</h2> -->
          <div class="button">
            <InfoButtons :modalProps="myIncomeProps" />
          </div>

          <div class="income dot">
            <p>&#36;{{ countIncome }}</p>
          </div>
        </div>
        <div id="moneySection">
          <!-- <h2>Money</h2> -->
          <div class="button">
            <InfoButtons :modalProps="myMoneyProps" />
          </div>
          <div class="money dot">
            <p>&#36;{{ player.money }}</p>
          </div>
        </div>
        <div id="secretSection">
          <div id="secretCard">
            <!-- <h2>Secret card</h2> -->
            <div class="button">
              <InfoButtons :modalProps="mySecretCardProps" />
            </div>
            <div>{{ player.secret }}</div>
          </div>
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
  },
  components: {
    InfoButtons,
  },
  data: function () {
    return {
      myItemsProps: {
        value: "Items",
        text:
          "These are your items that you own, the number below the symbol is the number of ites of that category the icon represents that you have in your possession. To calculate the value of your collection you multiply the market value (as seen in the Raise Value section) of an item with the amount of items you have. There is no upper limit in the number of items you may own. There is no upper limit in the number of items you may own.",
        title: "My Items",
        classes: `${this.player.color} button`,
      },

      mySkillsProps: {
        value: "Skills",
        text: "",
        title: "My Skills",
        classes: `${this.player.color} button`,
      },

      myBottlesProps: {
        value: "Bottles",
        text: "",
        title: "Bottles",
        classes: `${this.player.color} button`,
      },

      myIncomeProps: {
        value: "Income",
        text: "This is the income you earn every round. You can raise the income by (1) remove excess bottles that block your income or (2) place a card on the workarea on your playerboard.",
        title: "Income",
        classes: `${this.player.color} button`,
      },

      myMoneyProps: {
        value: "Money",
        text: "You can use your money to purchase items, skills, raise value or work when it's required of you to pay an extra fee when placing a bottle.",
        title: "Money",
        classes: `${this.player.color} button`,
      },

      mySecretCardProps: {
        value: "Secret Card",
        text: "The secret card is ",
        title: "Secret Card",
        classes: `${this.player.color} button`,
      },

      skill1Props: {
        value: "i",
        text: "Immediately gain a new bottle. You may use it this quarter",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill2Props: {
        value: "i",
        text: "Gain $2 whenever you place a worker in the work area",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill3Props: {
        value: "i",
        text: "Draw a card whenever you place a worker in the work area.",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill4Props: {
        value: "i",
        text: "Gain $1 whenever an auction is started by any player.",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill5Props: {
        value: "i",
        text: "Get 5 extra points in the end of the game if you own at least one item of each category in the end of the game. ",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill6Props: {
        value: "i",
        text: "Get 1 extra point in the end of the game for each item you own in the category FASTIVAL",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill7Props: {
        value: "i",
        text: "Get 1 extra point in the end of the game for each item you own in the category MOVIE",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill8Props: {
        value: "i",
        text: "Get 1 extra point in the end of the game for each item you own in the category TECHNOLOGY",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill9Props: {
        value: "i",
        text: "Get 1 extra point in the end of the game for each item you own in the category FIGURES",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      skill10Props: {
        value: "i",
        text: "Get 1 extra point in the end of the game for each item you own in the category MUSIC",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      item1Props: {
        value: "i",
        text: "Items of category FASTIVAL",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      item2Props: {
        value: "i",
        text: "Items of category MOVIE",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      item3Props: {
        value: "i",
        text: "Items of category TECHNOLOGY",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      item4Props: {
        value: "i",
        text: "Items of category FIGURES",
        title: "",
        classes: `${this.player.color} smallButton`,
      },

      item5Props: {
        value: "i",
        text: "Items of category MUSIC",
        title: "",
        classes: `${this.player.color} smallButton`,
      },


    };
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
  },
  methods: {
    actionMade: function (id) {
      console.log(id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainBoard {
  width: 50%;
  height: fit-content;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1.5fr;
  grid-gap: 10px;
  text-align: center;
  color: black;
  border: 1px solid black;
  /*margin: 5px;*/
  padding: 5px;
  /*border-radius: 3px;*/
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
  grid-column: 1/2;
}
#skillSection {
  grid-row: 2/3;
  grid-column: 1/2;
}
#infoSection {
  grid-row: 1/3;
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
#secretSection {
  grid-column: 1/2;
  grid-row: 3/4;
}
#itemGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
#skillGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
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
.income,
.money {
  background-color: #ffe599ff;
  height: 5vw;
  width: 5vw;
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
  margin-bottom: 10px;
}

.smallButton {
  margin-top: 100%;
  margin-left: 100%;
}
</style>
