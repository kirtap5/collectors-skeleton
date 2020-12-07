<template>
    <div>       
        <div id="workArea">
            <p id=workAreaText>WORK</p>
                <div v-if = "round == 1" class="rectangular firstArea" >
                    <div class="circle" v-on:click = "circleClicked"></div>
                    <div class="first figures">&#9203;</div>
                    <div class="second figures">&#9203;</div>
                    <p>ROUND 1</p>  
                </div>
                <div v-if = "round == 2" class="rectangular firstArea">
                    <div class="circle" v-on:click = "circleClicked"></div>
                    <div class="dollarCircles">&#36;1</div>
                    <div class="first figures">&#9203;</div>
                    <div class="second figures">&#9203;</div>
                    <p>ROUND 2</p>
                </div>
                <div v-if = "round == 3" class="rectangular firstArea">
                    <div class="circle" v-on:click = "circleClicked"></div>
                    <div class="dollarCircles">&#36;2</div>
                    <div class="first figures">&#9203;</div>
                    <div class="second figures">&#9203;</div>
                    <p>ROUND 3</p>
                </div>
                <div v-if = "round == 4" class="rectangular firstArea">
                    <div class="circle" v-on:click = "circleClicked"></div>
                    <div class="dollarCircles">&#36;3</div>
                    <div class="first figures">&#x267B;</div>
                    <p>ROUND 4</p>
                </div>
            <div class="rectangular secondArea">
                <div class="circle" v-on:click = "circleClicked"></div>
                <div class="dollarCircles">&#36;1</div>
                <div class="first figures">&#x267B;</div>
            </div>
            <div class="rectangular thirdArea">
                <div class="circle" v-on:click = "circleClicked"></div>
                <div class="dollarCircles">&#36;-1</div>
                <div class="first figures">&#127183;</div>
                <div class="second figures">&#127183;</div>
            </div>
            <div class="rectangular fourthArea">
                <div class="circle" v-on:click = "circleClicked"></div>
                <div class="first figures">&#127183;</div>
                <div>In med Bobs 1st player</div>
            </div>
            <div class="rectangular fifthArea">
                <div class="circle" v-on:click = "circleClicked"></div>
                <div class="first figures">&#127183;</div>
                <div class="second figures">&#9203;</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WorkArea",

    data: function() {
        return {
            round: 4,
            clicked: false,
            color: "blue"
        }

    },
    methods: {
        circleClicked: function(e) {
            if(!this.clicked){
                let clickedEl = e.target;
                clickedEl.style.backgroundColor = this.color;
                this.clicked = true;
            }
            else{
                let clickedEl = e.target;
                clickedEl.setAttribute("style", "background-color:white");

                this.clicked = false;
            }
            
        }
    },


}
</script>
    
<style scoped>
    #workArea {
        /*background-color: rgb(235, 235, 109);*/
        background-color: #ffe599ff;
        width: 80%;
        border: 5px solid black;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
   
    /*#workArea p { gjorde att alla p taggar i hela diven blev svarta och center, inte bra dvs.
        color:black;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }*/

    #workAreaText {
        color:black;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
    }

    .rectangular {
        margin: 10px;
        height: 200px;
        width: 90%;
        color: black;
        background-color: #ffe599ff;
        border: 3px solid grey;
        /*display: flex;
        justify-content: space-around;*/
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    .firstArea {
        border: 3px dotted grey;
        /*display: grid;
        grid-template-columns: 1fr 1fr;*/
    }

    .firstArea p {
        color: black;
        font-size: 20px;
        font-weight: bold;
        text-align: right;
        grid-column: 5;
    }

    .circle {
        text-align: center;
        font-size: 50px;
        width: 100px;
        height: 100px;
        color: black;
        background-color: white;
        border-radius: 50%;
        border: 1px solid black;
        margin-top: 50px;
        grid-column: 1;
    }

    /*Lägg in Bobs circles istället för denna kod*/
    .dollarCircles {
        align-items: center;
        width: 40px;
        height: 40px;
        color: black;
        border: 1px solid black;
        text-align: center;
        background-color: white;
        border-radius: 50%;
        margin-top: 80px;
        grid-column: 2;
    }

    .figures {
        font-size: 50px;
        margin-top: 60px;
    }

    .first {
        grid-column: 3;
    }

    .second {
        grid-column: 4;
    }
    

</style>