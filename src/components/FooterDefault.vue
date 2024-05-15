<template>
    <footer class="footer" id="footer">
        <div class="footer__items-container">
            <a class="footer__item" href="/">Главная</a>
            <a class="footer__item" href="#about">О нас</a>
            <a class="footer__item" href="#collection">Наполнение</a>
            <a class="footer__item" href="#footer">Контакты</a>
            <a class="footer__item" href="#collection">Сладкие букеты</a>
            <a class="footer__item" href="tel:+79626171664">8 (812) 123 45 67</a>
            <div class="footer__item"></div>
            <p class="footer__item">© SSTU.RU</p>
        </div>
        <div style = "width: 100%; margin: 20px; display: flex; justify-content: center;">
        <p class="footer__company">
            © 2021-{{getCurrentYear.toString()}} Съедобные букеты
        </p>
        </div>
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
        min-height: 100px;                            
        background-color: #DEE6D1;
        .footer__items-container{
            //width: 20%;
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
           // right: 40px;
            // top: 50%;
            font-family: "YanoneKaffeesatz-regular";
            font-size: 20px;
            color: #333;
        }
    }
</style>
