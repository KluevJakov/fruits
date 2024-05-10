<template>
    <button class="order-button" to="#delivery">
        <slot />
    </button>
</template>
<script setup lang="ts">
import { ref,computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();


// const isLocationMain = computed(() => route.path == '/');


// function checkLocation (){
//     if(isLocationMain.value){
//         return '#delivery'
//     }
// }
</script>
<style lang="scss">
    .order-button {
        font-size: 20px;
        font-family: "Pacifico-regular";
        color: #411212;
        padding: 15px 300px;
        background-color: transparent;
        border: 2px solid #411212;
        border-radius: 30px;
        text-transform: uppercase;
        cursor: pointer;
    }
    .order-button:hover {
        transition: 0.1s all 0.1s ease;
        background-color: rgba(65, 18, 18, 0.1);
    }
    .order-button:active {
        transition: 0.1s all 0.1s ease;
        background-color: rgba(65, 18, 18, 0.3);
    }
</style>