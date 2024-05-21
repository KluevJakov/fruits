<template>
  <div class="catalog-page">
    <p class="catalog-page__title title">
      Букет можно собрать на любой бюджет,<br />
      добавить ингредиенты на любой вкус
    </p>
    <div class="catalog-page__nav-container">
      <p class="catalog-page__nav-title">Раздел</p>

      <ul class="catalog-page__nav-list">
        <li
          :class="{
            'is-all-new-active': allNewView === true
          }"
          class="catalog-page__nav-list-item"
          @click="openAllNew"
        >
          Все новинки
        </li>
        <li
          :class="{
            'is-fruits-active': fruitsView === true
          }"
          class="catalog-page__nav-list-item"
          @click="openFruits"
        >
          Фрукты
        </li>
        <li
          :class="{
            'is-candies-active': candiesView === true
          }"
          class="catalog-page__nav-list-item"
          @click="openCandies"
        >
          Конфеты
        </li>
        <li
          :class="{
            'is-berries-active': berriesView === true
          }"
          class="catalog-page__nav-list-item"
          @click="openBerries"
        >
          Ягоды
        </li>
        <li
          :class="{
            'is-nuts-active': nutsView === true
          }"
          class="catalog-page__nav-list-item"
          @click="openNuts"
        >
          Орехи
        </li>
        <li
          :class="{
            'is-dried-active': driedFruitsView === true
          }"
          class="catalog-page__nav-list-item"
          @click="openDries"
        >
          Сухофрукты
        </li>
      </ul>
    </div>

    <div class="catalog-page__products-container">
      <ProductCard></ProductCard>
    </div>
  </div>
</template>
<script setup lang="ts">
// import SearchIcon from '../assets/icons/search.svg'
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useMainStore } from '@/stores/index'
import { VBtn } from 'vuetify/components'

const store = useMainStore()

const allNewView = ref(true)
const fruitsView = ref(false)
const candiesView = ref(false)
const berriesView = ref(false)
const nutsView = ref(false)
const driedFruitsView = ref(false)

const priceFrom = ref('')
const priceTo = ref('')

const openAllNew = () => (
  ((allNewView.value = true), store.doAllNewView(true)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
)

const openFruits = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = true), store.doFruitsView(true)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
)

const openCandies = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = true), store.doCandiesView(true)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
)

const openBerries = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = true), store.doBerriesView(true)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
)

const openNuts = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = true), store.doNutsView(true)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
)

const openDries = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = true), store.doDriedFruitsView(true))
)
</script>
<style lang="scss">
.is-all-new-active,
.is-fruits-active,
.is-candies-active,
.is-berries-active,
.is-nuts-active,
.is-dried-active {
  text-decoration: underline;
  font-weight: bold;
  color: #411212 !important;
}

.search-field {
  max-width: 416px;
  min-width: 300px;
}
.catalog-page {
  margin-top: 150px;                                 
  color: #411212;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .catalog-page__title {
    font-size: 36px;
    text-align: center;
    line-height: 1.5em;
    text-shadow: none;
    margin-bottom: 100px;
  }

  .catalog-page__nav-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-bottom: 100px;
    .catalog-page__nav-title,
    .catalog-page__price-title {
      font-size: 32px;
      font-family: 'YanoneKaffeesatz-regular';
      color: #411212;
    }
    .catalog-page__nav-list {
      display: flex;
      gap: 50px;
      .catalog-page__nav-list-item {
        font-size: 24px;
        font-family: 'YanoneKaffeesatz-regular';
        text-transform: uppercase;
        cursor: pointer;
      }
    }
    .catalog-page__price-filter {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      .catalog-page__price-filter-span {
        font-size: 32px;
        color: #411212;
        font-family: 'YanoneKaffeesatz-regular';
      }
      .catalog-page__price-filter-input {
        min-width: 100px;
      }
      .catalog-page__price-filter-line {
        height: 5px;
        width: 40px;
        border-radius: 20px;
        background-color: #411212;
      }
    }
  }

  .catalog-page__products-container {
    margin-bottom: 100px;
  }
}
</style>
