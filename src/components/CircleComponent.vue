
<template>
    <div class = "circle"> 
        <p>&#36; {{value}}</p>
    </div>
</template>

<script>
export default {
    name: "CircleComponent",
    props: {
        value: {type: Number, default: 0}
    }
};
//<CircleComponent v-bind:value =2 /> Lägger man i html koden
</script>

<style scoped>
.circle{
    color: black;
    border: solid 2px;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    min-height: fit-content;
    min-width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gold;

}
</style>
