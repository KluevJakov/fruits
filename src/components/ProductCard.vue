<template>
  <div class="product-card">
    <div
      class="product-card__item"
      v-for="item in checkCatalogView()"
      :key="item.id"
      @click="checkProductButton(item)"
    >
      <div class="product-card__img-container">
        <img class="product-card__img" :src="item.img" />
      </div>
      <button class="product-card__button" @click="checkProductButton(item)">
        {{ item.name }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { type TProductCard } from '@/types/ProductCardType.ts'
import router from '@/router'

import { useMainStore } from '@/stores/index'

const route = useRoute()

const isLocationCatalog = computed(() => route.path == '/catalogPage')
const isLocationMain = computed(() => route.path == '/')

const store = useMainStore()

const catalogItems = computed(() => store.catalogItems)
const allNew = computed(() => store.allNew)
const fruits = computed(() => store.fruits)
const candies = computed(() => store.candies)
const berries = computed(() => store.berries)
const nuts = computed(() => store.nuts)
const driedFruits = computed(() => store.driedFruits)

const allNewView = computed(() => store.allNewView)
const fruitsView = computed(() => store.fruitsView)
const candiesView = computed(() => store.candiesView)
const berriesView = computed(() => store.berriesView)
const nutsView = computed(() => store.nutsView)
const driedFruitsView = computed(() => store.driedFruitsView)

const checkCatalogView = () => {
  if (!isLocationCatalog.value) {
    return catalogItems.value
  }
  if (isLocationCatalog.value) {
    if (allNewView.value == true) {
      console.log(allNew.value)
      return allNew.value
    } else if (fruitsView.value == true) {
      return fruits.value
    } else if (candiesView.value == true) {
      return candies.value
    } else if (berriesView.value == true) {
      return berries.value
    } else if (nutsView.value == true) {
      return nuts.value
    } else if (driedFruitsView.value == true) {
      return driedFruits.value
    }
  }
}

function checkProductButton(data: TProductCard) {
  if (isLocationMain.value) {
    return router.push('/catalogPage')
  } else {
    return store.addItemToCart(data)
  }
}
</script>
<style lang="scss">
.product-card {
  max-width: 1024px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;

  .product-card__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    .product-card__button {
      font-size: 20px;                       
      font-family: 'YanoneKaffeesatz-regular';  
      color: #411212;
      padding: 8px;                             
      background-color: transparent;
      border: 1px solid #411212;
      border-radius: 25px;
      text-transform: uppercase;
      width: 100px;                             
    }
    .product-card__button:hover {
      transition: 0.1s all 0.1s ease;
      background-color: rgba(65, 18, 18, 0.1);
    }
    .product-card__button:active {
      transition: 0.1s all 0.1s ease;
      background-color: rgba(65, 18, 18, 0.3);
    }
  }
}
</style>
