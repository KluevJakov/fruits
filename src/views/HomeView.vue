<template>
  <main class="main">
    <div class="start-page" id="start-page">
      <div class="catalog-container" 
        :class="{
          'is-catalog-list': catalogList == true,
          }"  
        >
        <p class="catalog-title bounce-top" @click="catalogList = !catalogList">
          Каталог
        </p>
        <template v-if="catalogList">
          <ul 
            class="catalog-list" 
            v-for="item in catalogLinks" 
            :key="item.id" 
            :class="{
              'slide-in-left': catalogList == true,
            }"  
          >
          <router-link to="/catalogPage" class="catalog-list__item pa-0">
            <li class="catalog-list__item">
              {{item.name}}
            </li>
          </router-link>
          </ul>
        </template>
        
      </div>
    </div>

    <div class="content">
      <div class="about" id="about">
        <h2 class="about__title title">
          Съедобные букеты
        </h2>
        <p class="about__subtitle">
          Уникальные съедобные букеты – идеальный подарок для любого случая! <br>
          Наш инновационный подход позволяет превратить Ваши воображаемые картинки в реальность с помощью искусственного интеллекта. <br>
          Вы получите неповторимые вкусные композиции, из свежих фруктов, сочных ягод и эксклюзивных шоколадных деликатесов, которые точно будут соответствовать вашим ожиданиям. <br>
          Удивите своих близких этим уникальным и вкусным творением, созданным с помощью искусственного интеллекта. Получите неповторимый подарок уже сегодня!
        </p>

        <div class="about__logo-container">
          <img src="../assets/pictures/logo.png" alt="" class="about__logo">
        </div>

        <div class="order-button__container">
          <router-link to='/generationPage'>
            <OrderButton>
              Заказать букет
            </OrderButton>
          </router-link>
          <!-- <a href="#delivery">
            
          </a> -->
        </div>
      </div>

      <div class="collection" id="collection">
      <div style = "margin-top: 50px;">                     
        <h2 class="collection__title title">
          Каталог
        </h2>
        </div>
        <div>
          <ProductCard></ProductCard>
        </div>
      </div>

      <div class="form-wrapper" id="delivery">
        <FormComponent>
          <template v-slot:title>
            Собрать букет
          </template>
          <template v-slot:subtitle>
            Собери свой съедобный букет, и он станет настоящим произведением искусства, достойным любого праздника
          </template>
          <template v-slot:button-content>
            Составить
          </template>
        </FormComponent>
      </div>
    </div>
    
  </main>
</template>

<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue';
import ProductCard from '../components/ProductCard.vue'
import OrderButton from '../components/OrderButton.vue'
import FormComponent from '../components/FormComponent.vue'


const catalogList = ref(false)
const catalogLinks = ref([
  {
    id: 1, 
    name: "Все новинки",
  },
  {
    id: 2, 
    name: "Фрукты",
  },
  {
    id: 3, 
    name: "Конфеты",
  },
  {
    id: 4, 
    name: "Ягоды",
  },
  {
    id: 5, 
    name: "Орехи",
  },
  {
    id: 6, 
    name: "Сухофрукты",
  }
])
</script>

<style lang="scss">

.bounce-top {
	-webkit-animation: bounce-top 0.9s both;
	        animation: bounce-top 0.9s both;
}

@-webkit-keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
}
@keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
}


  .slide-in-left {
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
              transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
              transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }

  .title {
    font-size: 45px;                        
    font-family: "Pacifico-regular";
    color: #411212;
    text-shadow: 0px 1px 5px #00000070;
  }

  .main {
    display: flex;
    flex-direction: column;
  }

  .start-page {
    position: relative;
    height: 100vh;
    width: 100vw;
    // min-height: 1920px;
    background-image: url('/src/assets/pictures/main_2.png');      
    background-position: center;
    background-size: cover;                                         

    .is-catalog-list {
      transition: all 0.3s ease 0.3s;
      width: 100%;
    }
    .catalog-container {
      position: absolute;
      display: flex;
      bottom: 50px;
      color: white;
      display: flex;
      background-color: #8e9d78ae;
      // width: 100%;
      border-radius: 25px;
      align-items: center;
      justify-content:center;
      .catalog-title {
        z-index: 1;
        position: absolute;
        font-size: 24px;
        left: 0;
        font-family: "Pacifico-regular";
        text-transform: uppercase;
        color: #411212;
        background-color: #e0e1bf;
        padding: 10px 60px;
        border-radius: 25px;
        bottom: 0;
      }
      .catalog-title:hover {
        background-color: #aeb07b;
      }
      .catalog-list {
        display: flex;
        gap: 50px;
        align-items: center;
        justify-content: center;
        .catalog-list__item {
          color: #FFFFFF;
          padding: 10px 30px;
          font-size: 24px;
          font-family: "YanoneKaffeesatz-regular";
          text-transform: uppercase;
          cursor: pointer;
        }
      }
    }
  }

  .content{
    background: linear-gradient(#DEE6D1 0%, #F3F5EF 31%, #FFFFFF 52%, #DEE6D1 100%);
    .about {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 40px;                            
      .about__title{
        padding-top: 200px;
        margin-top: -100px;
      }
      .about__subtitle{
        max-width: 1024px;
        font-size: 22px;                               
        color: #411212;
        line-height: 1.3em;                          
        font-family: "YanoneKaffeesatz-regular";
        text-align: center;

      }
      .about__logo-container{
        position: relative;
        
      }
       .about__logo-container>img{
        width:150px;
        
      }

      .order-button__container {
        padding: 30px;                            
        border-top: 1px solid black;
        border-bottom: 1px solid black;
      }
    }

    .collection {
      display: flex;
      gap: 50px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 200px;
      .collection__title{
        //padding-top: 200px;
        //margin-top: -100px;
      }
    }

    .form-wrapper {
      margin-bottom: 200px;
    }
  }
</style>
