<template>
    <div class = "firstPlayer"> 
        <p>1<sup>st</sup></p>
    </div>
</template>

<script>
export default {
    name: "FirstPlayerToken"
};
</script>

<style scoped>
.firstPlayer{
    color: black;
    padding: 2px;
    border: solid 1px;
    border-radius: 50%;
    height: 3vw;
    width: 3vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: coral;
}
</style>