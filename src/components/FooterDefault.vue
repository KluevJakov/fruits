<template>
    <footer class="footer" id="footer">
        <div class="footer__items-container">
            <a class="footer__item" href="/">Главная</a>
            <a class="footer__item" href="#about">О нас</a>
            <p class="footer__item">Наполнение</p>
            <p class="footer__item">Контакты</p>
            <a class="footer__item" href="#collection">Сладкие букеты</a>
            <a class="footer__item" href="tel:+79626171664">8 (812) 123 45 67</a>
            <div class="footer__item"></div>
            <p class="footer__item">© SSTU.RU</p>
        </div>
        <p class="footer__company">
            © 2021-{{getCurrentYear.toString()}} Съедобные букеты
        </p>
    </footer>
</template>
<script setup lang="ts">
import {ref, computed} from 'vue'

const getCurrentYear= computed(() => {
      let currentYear = new Date().getFullYear() 
      return currentYear.toString()
    })
</script>
<style lang="scss">
    .footer{
        position: relative;
        width: 100%;
        min-height: 200px;
        background-color: #DEE6D1;
        .footer__items-container{
            width: 20%;
            display: flex;
            margin:0 auto;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 30px;
            .footer__item {
                font-family: "YanoneKaffeesatz-regular";
                font-size: 20px;
                color: #333;
            }
        }
        .footer__company {
            position: absolute;
            right: 40px;
            // top: 50%;
            font-family: "YanoneKaffeesatz-regular";
            font-size: 20px;
            color: #333;
        }
    }
</style>