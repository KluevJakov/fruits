<template>
  <div class="cart-overlay" v-if="isCartOpen">
    <div class="cart-overlay__content-wrapper">
      <v-btn icon="mdi-close" class="close-btn rounded-btn" @click="store.setCartValue(false)"></v-btn>
      <p class="title pa-16" v-if="cartItems.length == 0">Корзина пуста</p>
      <div class="cart-overlay__content" v-if="cartItems.length > 0">
        <p class="title">Ваш заказ</p>

        <div class="cart__items-container">
          <div class="cart__item" v-for="item in cartItems" :key="item?.id">
            <div class="cart__item-img-container">
              <img :src="item?.img" alt="" class="cart__item-img" />
            </div>

            <div class="cart__item-description">
              <p class="cart__item-name">
                {{ item?.name }}
              </p>
              <p class="cart__item-id">
                {{ item?.id }}
              </p>
              <p class="cart__item-alert">В букете присутствуют аллергены *</p>
            </div>

            <div class="cart__item-quantity-container">
              <v-btn icon="mdi-minus" class="rounded-btn" @click="quantityDecrement(item)"> </v-btn>
              <p class="cart__item-quantity">
                {{ item?.quantity }}
              </p>
              <v-btn icon="mdi-plus" class="rounded-btn" @click="item.quantity++"> </v-btn>
            </div>

            <v-btn @click="store.removeItemFromCart(item)" class="rounded-btn" icon="mdi-close">
            </v-btn>
          </div>
        </div>

        <div class="cart__form">
          <form @submit.prevent="sendForm(cartFormInfo)">
            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Как вас зовут?</p>
              <input v-model="cartFormInfo.customerName" type="text" class="cart__form-input" placeholder="Ваше имя"
                required />
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Ваш телефон</p>
              <input v-model="cartFormInfo.phoneCustomer" type="tel" class="cart__form-input" placeholder="+7"
                required />
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Ваш email</p>
              <input v-model="cartFormInfo.email" type="email" class="cart__form-input" placeholder="example@mail.com"
                required />
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Телефон получателя</p>
              <input v-model="cartFormInfo.phoneReceiver" type="tel" class="cart__form-input" placeholder="+7"
                required />
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Доставка</p>
              <v-radio-group v-model="cartFormInfo.delivery" required>
                <v-radio label="Самовывоз (бесплатно)" value="PICKUP" color="#4A1A14">
                </v-radio>
                <v-radio label="Доставка курьером (рассчитывается индивидуально при подтверждении заказа)"
                  value="TRANSFER" color="#4A1A14">
                </v-radio>
              </v-radio-group>
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Дата доставки</p>
              <input v-model="cartFormInfo.deliveryDate" type="date" class="cart__form-input" placeholder="+7"
                required />
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Адрес доставки</p>
              <input v-model="cartFormInfo.address" type="text" class="cart__form-input" required />
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Комментарий</p>
              <input v-model="cartFormInfo.comment" type="text" class="cart__form-input" />
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Способ оплаты</p>
              <v-radio-group v-model="cartFormInfo.paymentMethod" required>
                <v-radio label="Картой" value="CARD" color="#4A1A14"> </v-radio>
                <v-radio label="Наличными при получении" value="CASH" color="#4A1A14">
                </v-radio>
              </v-radio-group>
            </div>

            <div class="cart__form-input-container">
              <p class="cart__form-input-title">Правила использования (* - обязательно для заполнения)</p>
              <v-checkbox v-model="accept1" label="Даю согласие на обработку персональных данных" value="true"
                color="#4A1A14" required>
              </v-checkbox>
              <v-checkbox v-model="accept2"
                label="Ознакомлен с наполнением букета и согласен с наличием аллергенов в составе" value="true"
                color="#4A1A14" required>
              </v-checkbox>
            </div>

            <button :disabled="!accept1 || !accept2" class="cart__form-submit" type="submit">
              Перейти к оплате
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '../stores/index'
import { type TClientInfo } from '@/types/ClientInfoType'
import axios from 'axios';
import router from '@/router'

const store = useMainStore()

const isCartOpen = computed(() => store.isCartOpen)

const cartItems = computed(() => store.cartItems)

const accept1 = ref(false)
const accept2 = ref(false)

const cartFormInfo = ref({
  customerName: '',
  phoneCustomer: '',
  email: '',
  phoneReceiver: '',
  delivery: '',
  deliveryDate: '',
  address: '',
  comment: '',
  paymentMethod: '',

  bouquets: cartItems.value
})

async function sendForm(data: any) {
  //alert(JSON.stringify(data));
  const response = await axios.post('http://localhost:8080/order', JSON.stringify(data), {
    headers: {
      "Content-Type": 'application/json',
    }
  });
  store.removeItemsFromCart();
  router.push('/thanks');
}

function quantityDecrement(item: any) {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    store.removeItemFromCart(item)
  }
}

function setCartFormInfo(data: any) {

  //return store.setCartFormInfo(data) && store.addNewOrderAdmin(data)
}
</script>
<style lang="scss">
.v-radio {
  label {
    font-family: 'YanoneKaffeesatz-light';
    font-size: 30px;
  }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;
}

.rounded-btn {
  background: transparent;
  color: #411212;
  border: 1px solid #411212;
}

.cart-overlay {
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  overflow-y: scroll;
  z-index: 99999;

  .cart-overlay__content-wrapper {
    position: relative;
    max-width: 1024px;
    width: 80%;
    margin: 100px auto 0px;
    background: linear-gradient(#dee6d1 0%, #f3f5ef 31%, #ffffff 52%, #dee6d1 100%);
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .cart-overlay__content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // margin: 100px auto 0px;
      // max-width: 1024px;
      // width: 80%;
      // background: linear-gradient(#DEE6D1 0%, #F3F5EF 31%, #FFFFFF 52%, #DEE6D1 100%);
      // border-radius: 25px;
      gap: 30px;
      padding: 40px;

      .cart__items-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 30px;
        align-items: center;
        width: 100%;
        border-top: 1px solid black;

        .cart__item {
          display: flex;
          padding: 30px 0;
          align-items: center;
          // justify-content: center;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 30px;
          border-bottom: 1px solid black;
          width: 100%;

          .cart__item-img {
            max-width: 280px;
            max-height: 280px;
            border-radius: 30px;
            box-shadow: 0px 5px 10px #00000023;
          }

          .cart__item-description {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;

            .cart__item-name {
              font-family: 'YanoneKaffeesatz-light';
              font-size: 48px;
              font-weight: 300;
            }

            .cart__item-id {
              font-family: 'YanoneKaffeesatz-light';
              font-size: 32px;
              font-weight: 300;
            }

            .cart__item-alert {
              font-family: 'YanoneKaffeesatz-regular';
              font-size: 30px;
              color: #e02a2a;
            }
          }

          .cart__item-quantity-container {
            display: flex;
            align-items: center;
            gap: 20px;

            .cart__item-quantity {
              font-family: 'YanoneKaffeesatz-light';
              font-size: 40px;
              font-weight: 300;
            }
          }
        }
      }

      .cart__form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 15px;
        padding: 40px;

        .cart__form-input-container {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .cart__form-input-title {
            font-family: 'YanoneKaffeesatz-light';
            font-size: 32px;
          }

          .cart__form-input {
            width: 100%;
            border: 1px solid #411212;
            border-radius: 20px;
            padding: 15px;
            font-family: 'YanoneKaffeesatz-light';
            font-size: 32px;
          }

          .cart__form-input::placeholder {
            color: rgba(0, 0, 0, 0.4);
            font-family: 'YanoneKaffeesatz-light';
            font-size: 32px;
          }
        }

        .cart__form-submit {
          font-family: 'YanoneKaffeesatz-regular';
          padding: 20px;
          border-radius: 20px;
          font-size: 32px;
          width: 100%;
          color: #411212;
          border: 1px solid #411212;
          background: linear-gradient(#cad3bc 0%, #828c65 100%);
          transition: .4s;
        }

        .cart__form-submit:disabled,
        .cart__form-submit[disabled] {
          filter: blur(2px);
          transition: .4s;
        }
      }
    }
  }
}
</style>
