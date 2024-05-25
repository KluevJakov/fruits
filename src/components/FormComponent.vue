<template>
    <div class="form">
        <div class="form__img-container">
            <img src="../assets/pictures/logo.png" alt="" class="form__img">
        </div>
        <h3 class="form__title">
            <slot name="title" />
        </h3>
        <p class="form__subtitle">
            <slot name="subtitle" />
        </p>

        <OrderButton>
            <slot name="button-content" />
        </OrderButton>

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import OrderButton from '../components/OrderButton.vue'

</script>
<style lang="scss">
    .form {
        position: relative;
        max-width: 1024px;
        border: 3px solid #667251;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;
        padding: 70px;
        margin: 0 auto;
        .form__img-container {
            position: absolute;
            top: -60px;
            left: -100px;                                 
            backdrop-filter: blur(100px);
            padding: 10px;
            .form__img{
            width: 200px;                            
            }

        }
        .form__title {
            position: absolute;
            top: -45px;
            backdrop-filter: blur(100px);
            padding: 20px;
            font-size: 36px;
            font-family: "Pacifico-regular";
            color: #411212;
        }
        .form__subtitle {
            text-align: center;
            font-size: 32px;
            line-height: 45px;
            font-family: "Pacifico-regular";
            color: #411212;
        }
    }
    
</style>
