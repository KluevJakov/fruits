<template>
  <div class="admin-page">
    <div class="admin-page__header"></div>

    <div class="admin-page__main">
      <div class="admin-page__nav">
        <h2 class="admin-page__nav-title">Съедобный букет</h2>

        <div class="admin-page__nav-action">
          <button class="admin-page__nav-btn admin-page__btn" @click="changeView()">
            <p v-if="ordersView">Добавление</p>
            <p v-if="addingView">Заказы</p>
          </button>
          <v-text-field
            class="search-field"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            rounded="pill"
            hide-details
          ></v-text-field>
        </div>
      </div>

      <div class="admin-page__order-items" v-if="ordersView">
        <div class="admin-page__order-item" v-for="item in adminOrders" :key="item.id">
          <div
            class="admin-page__order-item-img-container"
            v-for="product in item.bouquets"
            :key="product.id"
          >
            <img :src="product.img" alt="" class="admin-page__order-item-img" />
          </div>

          <div class="admin-page__order-item-info-container">
            <div class="admin-page__order-item-info">
              <p class="admin-page__order-item-info-title">
                Заказ №: <br />
                {{ item.id }}
              </p>

              <p class="admin-page__order-item-info-title">
                Заказчик: <br />
                {{ item.customerName }}
              </p>

              <p class="admin-page__order-item-info-title">
                Телефон: <br />
                {{ item.phoneCustomer }}
              </p>

              <p class="admin-page__order-item-info-title">
                Email: <br />
                {{ item.email }}
              </p>

              <p class="admin-page__order-item-info-title">
                Адрес: <br />
                {{ item.address }}
              </p>
            </div>

            <div class="admin-page__order-item-info">
              <p class="admin-page__order-item-info-title">
                Аллергены: <br />
                присутствуют
              </p>

              <p class="admin-page__order-item-info-title">
                Комментарий: <br />
                {{ item.comment }}
              </p>
            </div>
          </div>

          <div class="admin-page__order-item-composition-container">
            <!--<div class="admin-page__order-item-composition">
                            <span>
                                Состав:
                            </span>
                            <div class="admin-page__order-item-composition-item-container">
                                <p class="admin-page__order-item-composition-item">
                                    {{ item.name }}
                                </p>
                                <p class="admin-page__order-item-composition-item">
                                    {{ item.name }}
                                </p>
                                <p class="admin-page__order-item-composition-item">
                                    {{ item.name }}
                                </p>
                            </div>
                            
                        </div>-->

            <div class="admin-page__order-item-actions" v-if="!item.approved">
              <button class="admin-page__btn" @click="store.removeOrderFromAdmin(item)">
                <p>Отказ</p>
              </button>
              <button class="admin-page__btn" @click="store.approveOrderFromAdmin(item)">
                <p>Подтвердить</p>
              </button>
            </div>

            <div class="admin-page__order-item-actions" v-if="item.approved">
              <p>ЗАКАЗ ПОДТВЕРЖДЕН</p>
            </div>
          </div>
        </div>
      </div>

      <!-- add item block -->
      <div class="admin-page__adding-items" v-if="addingView">
        <div class="admin-page__adding-item">
          <div class="admin-page__adding-item-description">
            <p class="admin-page__adding-item-description-title">
              Название: <input type="text" v-model="newBouquet.name" />
            </p>
          </div>

          <div class="admin-page__adding-item-description">
            <p class="admin-page__adding-item-description-title">
              Описание: <input type="text" v-model="newBouquet.description" />
            </p>
          </div>

          <div class="admin-page__adding-item-description">
            <p class="admin-page__adding-item-description-title">
              Цена: <input type="number" v-model="newBouquet.price" />
            </p>
          </div>

          <div class="admin-page__adding-item-description">
            <p class="admin-page__adding-item-description-title">
              Категория: <input type="text" v-model="newBouquet.category.name" />
            </p>
          </div>

          <div class="admin-page__adding-item-img-container">
            <img
              v-for="file in previewImages"
              :key="file"
              :src="file.imageUrl"
              alt=""
              class="admin-page__adding-item-img"
            />
            <input
              v-if="showFileInput"
              @change="onFilesSelected($event)"
              accept="image/*"
              type="file"
              multiple
              class="picture-input"
            />
          </div>

          <div class="admin-page__adding-item-actions">
            <button
              class="admin-page__btn"
              @click="store.addNewItemAdmin(newBouquet) && clearAllInputs()"
            >
              <p>Добавить</p>
            </button>
          </div>
        </div>

        <!-- added items block -->
        <div
          class="admin-page__adding-item"
          v-for="bouquet in adminNewBouquets"
          :key="bouquet.id"
        >
          <div class="admin-page__adding-item-description">
            <p class="admin-page__adding-item-description-title">
              Название: {{ bouquet.name }}
            </p>
          </div>

          <div class="admin-page__adding-item-description">
            <p class="admin-page__adding-item-description-title">
              Описание: {{ bouquet.description }}
            </p>
          </div>

          <div class="admin-page__adding-item-description">
            <p class="admin-page__adding-item-description-title">
              Цена: {{ bouquet.price }}
            </p>
          </div>

          <div class="admin-page__adding-item-description">
            <p class="admin-page__adding-item-description-title">
              Категория: {{ bouquet.category.name }}
            </p>
          </div>

          <div class="admin-page__adding-item-img-container">
            <img
              :src="bouquet.images[0]?.imgData"
              alt=""
              class="admin-page__adding-item-img"
            />
          </div>

          <div class="admin-page__adding-item-actions">
            <!-- <button class="admin-page__btn">
                <p>Редактирование</p>
            </button> -->
            <button class="admin-page__btn" @click="store.deleteBouquetAdmin(bouquet.id)">
              <p>Удалить</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "@/stores/index";
import productImg from "@/assets/pictures/product.png";

const store = useMainStore();

onMounted(async () => {
  store.loadOrdersFromBackend();
});

const ordersView = ref(true);
const addingView = ref(false);

const adminNewItems = computed(() => store.adminNewItems);

const previewImages = ref([]);

const adminOrders = computed(() => store.adminOrders);

const newBouquet = ref({
    name: '',
    description: '',
    price: '',
    category: {
    name: ''
    },
    images: []
});

function changeView() {
  if (ordersView.value == true) {
    ordersView.value = false;
    addingView.value = true;
  } else {
    ordersView.value = true;
    addingView.value = false;
  }
}

function clearAllInputs() {
  previewImages.value = [];
  newBouquet.value = {
    name: '',
    description: '',
    price: '',
    category: {
    name: ''
    },
    images: []
  };
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve({
        imgData: reader.result,
        name: file.name,
      });
    reader.onerror = reject;
  });

const onFilesSelected = async (event) => {
  const files = event.target.files;
  console.log(files);
  if (!files?.length) return;

  await Promise.all(
    Array.from(files)
      .filter((i) => i.type.startsWith("image/"))
      .map((f) => (f.imageUrl = URL.createObjectURL(f)))
  );

  const imgData = await Promise.all(
    Array.from(files)
      .filter((i) => i.type.startsWith("image/"))
      .map((f) => toBase64(f))
  );

  previewImages.value.push(...Array.from(files));
  newBouquet.value.images.push(...imgData);
};

function showFileInput() {
  let fileArrLength = previewImages.value.length;
  if (fileArrLength < 1) {
    return true;
  } else {
    return false;
  }
}
</script>
<style lang="scss">
.admin-page__text {
  font-size: 32px;
  color: #411212;
  font-family: "YanoneKaffeesatz-regular";
}

.admin-page__btn {
  border: 1px solid #411212;
  padding: 3px 20px;
  border-radius: 25px;
  font-size: 24px;
  font-family: "YanoneKaffeesatz-regular";
}

.admin-page__btn:hover {
  transition: 0.1s all 0.1s ease;
  background-color: rgba(65, 18, 18, 0.1);
}
.admin-page__btn:active {
  transition: 0.1s all 0.1s ease;
  background-color: rgba(65, 18, 18, 0.3);
}

.admin-page {
  .admin-page__header {
    height: 191px;
    background-position: center;
    background-size: 140%;
  }

  .admin-page__main {
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px;

    .admin-page__nav {
      display: flex;
      align-items: start;
      justify-content: center;
      position: relative;
      border-bottom: 1px solid #4a1a14;
      height: 160px;
      .admin-page__nav-title {
        font-size: 36px;
        color: #411212;
        font-family: "Pacifico-regular";
        // margin: auto;
      }

      .admin-page__nav-action {
        position: absolute;
        // margin-left: auto;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 30px;

        .admin-page__nav-btn {
          width: 182px;
          font-size: 32px;
        }
      }
    }

    .admin-page__order-items {
      display: flex;
      flex-direction: column;

      .admin-page__order-item {
        display: flex;
        flex-wrap: wrap;
        padding: 30px 0px;
        justify-content: space-between;
        gap: 20px;
        border-bottom: 1px solid #4a1a14;

        .admin-page__order-item-img-container {
          display: flex;
          flex-direction: column;
          width: 280px;
          .admin-page__order-item-img {
            width: 100%;
            height: auto;
          }
        }

        .admin-page__order-item-info-container {
          display: flex;
          gap: 30px;
          .admin-page__order-item-info {
            .admin-page__order-item-info-title {
              color: #411212;
              font-family: "YanoneKaffeesatz-regular";
              font-size: 32px;
              border-bottom: 1px solid #4a1a14;
              padding: 10px 0px;
            }
          }
        }

        .admin-page__order-item-composition-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .admin-page__order-item-composition {
            display: flex;
            gap: 30px;
            font-family: "YanoneKaffeesatz-regular";
            font-size: 32px;
          }
          .admin-page__order-item-actions {
            display: flex;
            gap: 20px;
          }
        }
      }
    }

    .admin-page__adding-items {
      display: flex;
      flex-direction: column;
      .admin-page__adding-item {
        display: flex;
        font-family: "YanoneKaffeesatz-regular";
        font-size: 32px;
        justify-content: space-between;
        gap: 20px;
        border-bottom: 1px solid #411212;
        padding: 30px 0px;
        .admin-page__adding-item-description {
          display: flex;
          flex-direction: column;
          gap: 30px;
          .admin-page__adding-item-description-title input {
            border-bottom: 1px solid #411212;
            padding: 10px;
          }
        }

        .admin-page__adding-item-img-container {
          width: 250px;
          height: 250px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          border: 1px solid black !important;
          background-color: rgba(255, 255, 255, 0.83) !important;

          input span {
            display: none !important;
          }
          .admin-page__adding-item-img,
          input {
            width: 100%;
          }
        }

        .admin-page__adding-item-actions {
          margin-top: auto;
          display: flex;
          gap: 15px;
        }
      }
    }
  }
}
</style>
