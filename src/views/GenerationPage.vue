<template>
    <div class="generation">
        <div class="generation__start">
            <a class="generation__start-btn" href="#generation">
                <p class="generation__start-btn-content">
                    Создай свой букет при помощи <br>
                    технологий искусственного интеллекта
                </p>
            </a>
        </div>

        <div class="generation__main" id="generation">
            <p class="title">
                Съедобные букеты
            </p>

            <div class="generation__main-block-container">
                <div class="generation__main-block">
                    <div class="generation__sweet-items-container">
                        <ul class="generation__nav-list">
                            <li :class="{
                                'is-fruits-active':
                                    fruitsView === true,
                            }" class="generation__nav-list-item" @click="openFruits">Фрукты</li>
                            <li :class="{
                                'is-candies-active':
                                    candiesView === true,
                            }" class="generation__nav-list-item" @click="openCandies">Конфеты</li>
                            <li :class="{
                                'is-berries-active':
                                    berriesView === true,
                            }" class="generation__nav-list-item" @click="openBerries">Ягоды</li>
                            <li :class="{
                                'is-nuts-active':
                                    nutsView === true,
                            }" class="generation__nav-list-item" @click="openNuts">Орехи</li>
                            <li :class="{
                                'is-dried-active':
                                    driedFruitsView === true,
                            }" class="generation__nav-list-item" @click="openDries">Сухофрукты</li>
                        </ul>
                        <div class="generation__sweet-items">
                            <button @click="toggleItemSelection(item)" class="generation__sweet-item" :class="{
                                'is-selected':
                                    selectedItems.includes(item),
                            }" v-for="item in checkGenerationView()" :key="item.id">
                                {{ item.name }}
                            </button>
                        </div>
                    </div>

                    <div>
                        <div v-if="imageBegin" style="display: flex;">
                            <p
                                style="font-size: large;text-align: center;align-self: center;width: 100%;margin-bottom: 10px;">
                                Здесь появятся<br>сгенерированные изображения...</p>
                        </div>
                        <div v-if="imageReceived" style="display: flex;">
                            <p
                                style="font-size: large;text-align: center;align-self: center;width: 100%;margin-bottom: 10px;">
                                Изображение генерируется...</p>
                        </div>

                        <v-carousel class="generation__carousel" v-model="carouselRef">
                            <v-carousel-item v-for="item in carousel" :key="item.id" :src="item.src"
                                cover></v-carousel-item>
                        </v-carousel>
                    </div>

                    <p class="generation__carousel-subtitle">
                        В букете присутствуют аллергены *
                    </p>
                </div>

                <div class="generation__main-block-btns">
                    <OrderButton @click="{ generate(); }" class="generation__main-block-btn">
                        Сгенерировать
                    </OrderButton>
                    <OrderButton @click="{ addToCard(item); }" class="generation__main-block-btn">
                        Заказать букет
                    </OrderButton>
                </div>
            </div>


            <FormComponent>
                <template v-slot:title>
                    Оформить заказ
                </template>
                <template v-slot:subtitle>
                    Сделай заказ <br>
                    Получи неповторимую композицию
                </template>
                <template v-slot:button-content>
                    Заказать
                </template>
            </FormComponent>

        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import FormComponent from '../components/FormComponent.vue'
import OrderButton from '../components/OrderButton.vue'
import { type TProductCard } from '@/types/ProductCardType.ts'
import { useMainStore } from '@/stores/index'
import axios from 'axios';

const store = useMainStore()

onMounted(async () => {
    store.loadIngredientsFromBackend()
})

const fruits = computed(() => store.allFruits)
const candies = computed(() => store.allCandies)
const berries = computed(() => store.allBerries)
const nuts = computed(() => store.allNuts)
const driedFruits = computed(() => store.allDriedFruits)

const fruitsView = ref(true)
const candiesView = ref(false)
const berriesView = ref(false)
const nutsView = ref(false)
const driedFruitsView = ref(false)

const carousel = ref([])

const openFruits = () => (
    (fruitsView.value = true),
    (candiesView.value = false),
    (berriesView.value = false),
    (nutsView.value = false),
    (driedFruitsView.value = false)
)

const openCandies = () => (
    (fruitsView.value = false),
    (candiesView.value = true),
    (berriesView.value = false),
    (nutsView.value = false),
    (driedFruitsView.value = false)
)

const openBerries = () => (
    (fruitsView.value = false),
    (candiesView.value = false),
    (berriesView.value = true),
    (nutsView.value = false),
    (driedFruitsView.value = false)
)

const openNuts = () => (
    (fruitsView.value = false),
    (candiesView.value = false),
    (berriesView.value = false),
    (nutsView.value = true),
    (driedFruitsView.value = false)
)

const openDries = () => (
    (fruitsView.value = false),
    (candiesView.value = false),
    (berriesView.value = false),
    (nutsView.value = false),
    (driedFruitsView.value = true)
)

const checkGenerationView = () => {
    if (fruitsView.value == true) {
        return fruits.value
    }
    else if (candiesView.value == true) {
        return candies.value
    }
    else if (berriesView.value == true) {
        return berries.value
    }
    else if (nutsView.value == true) {
        return nuts.value
    }
    else if (driedFruitsView.value == true) {
        return driedFruits.value
    }
}

const selectedItems = ref([])
const activeIndex = ref(0); // Добавляем переменную для отслеживания текущего индекса элемента
const imageReceived = ref(false);
const imageBegin = ref(true);

const selectedId = ref(0)
const selectedIdRepeat = ref(0)

function toggleItemSelection(item) {
    const index = selectedItems.value.findIndex(selectedItem => selectedItem.id === item.id);
    if (index === -1) {
        selectedItems.value.push(item);
    } else {
        selectedItems.value.splice(index, 1);
    }
}

const carouselRef = ref(0);
async function generate() {
    if (!imageReceived.value) {
        try {
            imageReceived.value = true;
            imageBegin.value = false;

            const response = await axios.post('http://localhost:8080/generate', selectedItems.value, {
                responseType: 'arraybuffer'
            });
            const blob = new Blob([response.data], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);
            carousel.value.push({ id: carousel.value.length, src: imageUrl });
            imageReceived.value = false;
        } catch (error) {
            //console.error('Ошибка при отправке запроса:', error);
        }
    }
    carouselRef.value = carousel.value.length - 1;
    console.log(carouselRef.value);
}

async function addToCard(data: TProductCard) {
    let rndNumber = Math.floor(Math.random() * 10000) + 1;
    let newProduct = {
        id: rndNumber,
        name: "Сгенерированный букет №" + rndNumber,
        img: carousel.value[carouselRef.value].src,
        quantity: 1,
    } as TProductCard;

    store.addItemToCart(newProduct);
}

</script>
<style lang="scss">
.is-selected {
    border: 2px solid #411212 !important;
}

.generation {
    margin-bottom: 200px;

    .generation__start {
        margin-bottom: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background: url('../assets/pictures/generation-main.png');
        background-position: center;

        .generation__start-btn {
            background: linear-gradient(#dee6d1a7 0%, #f3f5efa0 31%, #dee6d1 100%);
            padding: 40px 20px;
            border-radius: 30px;

            .generation__start-btn-content {
                font-size: 48px;
                line-height: 60px;
                font-family: "Pacifico-regular";
                color: #411212;
                text-shadow: 0px 3px 1px #A3AA64;
                text-align: center;
            }
        }
    }

    .generation__main {
        max-width: 1280px;
        margin: -100px auto 0px;
        padding-top: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 50px;

        .generation__main-block-container {
            display: flex;
            flex-direction: column;
            gap: 30px;
            margin-bottom: 100px;

            .generation__main-block {
                display: flex;
                gap: 20px;
                position: relative;

                .generation__sweet-items-container {
                    display: flex;
                    flex-direction: column;
                    width: 50%;
                    gap: 30px;
                    align-items: center;

                    // justify-content: center;
                    .generation__nav-list {
                        display: flex;
                        gap: 50px;

                        .generation__nav-list-item {
                            font-size: 24px;
                            font-family: "YanoneKaffeesatz-regular";
                            text-transform: uppercase;
                            cursor: pointer;
                            color: #000;
                        }
                    }

                    .generation__sweet-items {
                        display: flex;
                        gap: 20px;
                        flex-wrap: wrap;
                        justify-content: space-around;

                        .generation__sweet-item {
                            background-color: #CCD7BA;
                            border: 2px solid #CCD7BA;
                            font-family: "Pacifico-regular";
                            color: #411212;
                            font-size: 24px;
                            padding: 10px;
                            border-radius: 25px;
                        }
                    }
                }

                .generation__carousel {
                    width: 650px;
                    border-radius: 25px;
                }

                .generation__carousel-subtitle {
                    font-family: "YanoneKaffeesatz-regular";
                    font-size: 20px;
                    color: #E02A2A;
                    position: absolute;
                    right: 0;
                    bottom: -20px;
                }

            }

            .generation__main-block-btns {
                display: flex;
                align-items: center;
                justify-content: space-around;

                .generation__main-block-btn {
                    padding: 10px;
                    background: linear-gradient(#FDF7F7 0%, #BCC7C3 100%);
                }
            }
        }
    }
}
</style>