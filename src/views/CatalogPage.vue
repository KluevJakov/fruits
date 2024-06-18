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
            'is-all-new-active': allNewView === true,
          }"
          class="catalog-page__nav-list-item"
          @click="openAllNew"
        >
          Все новинки
        </li>
        <li
          :class="{
            'is-fruits-active': fruitsView === true,
          }"
          class="catalog-page__nav-list-item"
          @click="openFruits"
        >
          Фрукты
        </li>
        <li
          :class="{
            'is-candies-active': candiesView === true,
          }"
          class="catalog-page__nav-list-item"
          @click="openCandies"
        >
          Конфеты
        </li>
        <li
          :class="{
            'is-berries-active': berriesView === true,
          }"
          class="catalog-page__nav-list-item"
          @click="openBerries"
        >
          Ягоды
        </li>
        <li
          :class="{
            'is-nuts-active': nutsView === true,
          }"
          class="catalog-page__nav-list-item"
          @click="openNuts"
        >
          Орехи
        </li>
        <li
          :class="{
            'is-dried-active': driedFruitsView === true,
          }"
          class="catalog-page__nav-list-item"
          @click="openDries"
        >
          Сухофрукты
        </li>
      </ul>
      <div class="catalog-page__price-filter">
        <span class="catalog-page__price-filter-span">Цена:</span>
        <button
          :class="{ 'is-selected': selectedPriceRange.value === 'any' }"
          @click="filterByPrice(0, 1000000, 'any')"
        >
          Любая цена
        </button>
        <button
          :class="{ 'is-selected': selectedPriceRange.value === '1500-2000' }"
          @click="filterByPrice(1500, 2000, '1500-2000')"
        >
          1500-2000
        </button>
        <button
          :class="{ 'is-selected': selectedPriceRange.value === '2000-3000' }"
          @click="filterByPrice(2000, 3000, '2000-3000')"
        >
          2000-3000
        </button>
        <button
          :class="{ 'is-selected': selectedPriceRange.value === '3000-5000' }"
          @click="filterByPrice(3000, 5000, '3000-5000')"
        >
          3000-5000
        </button>
      </div>
    </div>

    <div class="catalog-page__products-container">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import { useMainStore } from "@/stores/index";
import { VBtn } from "vuetify/components";

const store = useMainStore();

onMounted(async () => {
  store.loadProductsFromBackend();
  filterByPrice(0, 1000000);
});

const priceFrom = ref<number | null>(null);
const priceTo = ref<number | null>(null);
const selectedPriceRange = ref('any');

const filterByPrice = (minPrice: number, maxPrice: number, range: string) => {
  priceFrom.value = minPrice;
  priceTo.value = maxPrice;
    selectedPriceRange.value = range;
};

const filteredProducts = computed(() => {
  if (priceFrom.value !== null && priceTo.value !== null) {
    if (allNewView.value) {
      return store.allNew.filter(
        (product) => product.price >= priceFrom.value && product.price <= priceTo.value
      );
    }
    if (fruitsView.value) {
      return store.fruits.filter(
        (product) => product.price >= priceFrom.value && product.price <= priceTo.value
      );
    }
    if (candiesView.value) {
      return store.candies.filter(
        (product) => product.price >= priceFrom.value && product.price <= priceTo.value
      );
    }
    if (berriesView.value) {
      return store.berries.filter(
        (product) => product.price >= priceFrom.value && product.price <= priceTo.value
      );
    }
    if (nutsView.value) {
      return store.nuts.filter(
        (product) => product.price >= priceFrom.value && product.price <= priceTo.value
      );
    }
    if (driedFruitsView.value) {
      return store.driedFruits.filter(
        (product) => product.price >= priceFrom.value && product.price <= priceTo.value
      );
    }
  }
  return store.products;
});

const allNewView = ref(true);
const fruitsView = ref(false);
const candiesView = ref(false);
const berriesView = ref(false);
const nutsView = ref(false);
const driedFruitsView = ref(false);

const openAllNew = () => (
  ((allNewView.value = true), store.doAllNewView(true)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
);

const openFruits = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = true), store.doFruitsView(true)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
);

const openCandies = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = true), store.doCandiesView(true)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
);

const openBerries = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = true), store.doBerriesView(true)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
);

const openNuts = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = true), store.doNutsView(true)),
  ((driedFruitsView.value = false), store.doDriedFruitsView(false))
);

const openDries = () => (
  ((allNewView.value = false), store.doAllNewView(false)),
  ((fruitsView.value = false), store.doFruitsView(false)),
  ((candiesView.value = false), store.doCandiesView(false)),
  ((berriesView.value = false), store.doBerriesView(false)),
  ((nutsView.value = false), store.doNutsView(false)),
  ((driedFruitsView.value = true), store.doDriedFruitsView(true))
);
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
      font-family: "YanoneKaffeesatz-regular";
      color: #411212;
    }
    .catalog-page__nav-list {
      display: flex;
      gap: 50px;
      .catalog-page__nav-list-item {
        font-size: 24px;
        font-family: "YanoneKaffeesatz-regular";
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
        font-family: "YanoneKaffeesatz-regular";
      }

      button {
        background-color: #f0f0f0;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-family: "YanoneKaffeesatz-regular";
        font-size: 16px;
      }

      button:hover {
        background-color: #e0e0e0;
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
