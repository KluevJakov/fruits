import { defineStore } from 'pinia';
import cat1 from '../assets/products/cat1.png'
import cat2 from '../assets/products/cat2.png'
import cat3 from '../assets/products/cat3.png'
import cat4 from '../assets/products/cat4.png'
import cat5 from '../assets/products/cat5.png'
import cat6 from '../assets/products/cat6.png'
import { type TProductCard } from '@/types/ProductCardType'
import { type TClientInfo } from '@/types/ClientInfoType'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { da } from 'vuetify/locale';

export const useMainStore = defineStore('mainStore', {

  state: () => ({
    // admin new item
    adminNewItems: [] as TProductCard[],
    adminOrders: [] as TClientInfo[],
    userOrders: [] as TClientInfo[],
    //корзина булеан
    isCartOpen: false,

    //cart items
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as TProductCard[],

    //client info
    cartFormInfo: {} as TClientInfo,

    //вид карточек на странице каталога
    fruitsView: false,
    allNewView: true,
    candiesView: false,
    berriesView: false,
    nutsView: false,
    driedFruitsView: false,

    // контент карточек
    catalogItems: [
      {
        id: 1,
        name: 'Все новинки',
        img: cat1
      },
      {
        id: 2,
        name: 'Фрукты',
        img: cat4
      },
      {
        id: 3,
        name: 'Конфеты',
        img: cat2
      },
      {
        id: 4,
        name: 'Ягоды',
        img: cat5
      },
      {
        id: 5,
        name: 'Орехи',
        img: cat3
      },
      {
        id: 6,
        name: 'Сухофрукты',
        img: cat6
      }
    ] as TProductCard[],
    allNew: [] as TProductCard[],
    fruits: [] as TProductCard[],
    candies: [] as TProductCard[],
    berries: [] as TProductCard[],
    nuts: [] as TProductCard[],
    driedFruits: [] as TProductCard[],

    //состав
    allFruits: [],
    allCandies: [],
    allBerries: [],
    allNuts: [],
    allDriedFruits: []
  }),
  getters: {

  },
  actions: {
    async loadProductsFromBackend() {
      try {
        const response0 = await fetch('http://localhost:8080/bouquets/new');
        const data0 = await response0.json();
        this.allNew = data0;

        const response1 = await fetch('http://localhost:8080/bouquets/cat/0c94587e-8654-4583-acdd-c5b51ae96f56');
        const data1 = await response1.json();
        this.fruits = data1;

        const response2 = await fetch('http://localhost:8080/bouquets/cat/a55225ed-4c65-46cb-b9d7-79a5d89235ce');
        const data2 = await response2.json();
        this.candies = data2;

        const response3 = await fetch('http://localhost:8080/bouquets/cat/e88b0a37-f583-40a0-8efe-7d1422b96ec5');
        const data3 = await response3.json();
        this.berries = data3;

        const response4 = await fetch('http://localhost:8080/bouquets/cat/ae0abfe9-c7d5-4959-9240-40b3d912b76d');
        const data4 = await response4.json();
        this.nuts = data4;

        const response5 = await fetch('http://localhost:8080/bouquets/cat/55ac2221-ac1c-4d62-a47d-44f412a6364c');
        const data5 = await response5.json();
        this.driedFruits = data5;
      } catch (error) {
        console.error('Ошибка загрузки данных из бэкенда:', error);
      }
    },
    async loadIngredientsFromBackend() {
      try {
        const response1 = await fetch('http://localhost:8080/ingredients/0c94587e-8654-4583-acdd-c5b51ae96f56');
        const data1 = await response1.json();
        this.allFruits = data1;

        const response2 = await fetch('http://localhost:8080/ingredients/a55225ed-4c65-46cb-b9d7-79a5d89235ce');
        const data2 = await response2.json();
        this.allCandies = data2;

        const response3 = await fetch('http://localhost:8080/ingredients/e88b0a37-f583-40a0-8efe-7d1422b96ec5');
        const data3 = await response3.json();
        this.allBerries = data3;

        const response4 = await fetch('http://localhost:8080/ingredients/ae0abfe9-c7d5-4959-9240-40b3d912b76d');
        const data4 = await response4.json();
        this.allNuts = data4;

        const response5 = await fetch('http://localhost:8080/ingredients/55ac2221-ac1c-4d62-a47d-44f412a6364c');
        const data5 = await response5.json();
        this.allDriedFruits = data5;
      } catch (error) {
        console.error('Ошибка загрузки данных из бэкенда:', error);
      }
    },
    async loadOrdersFromBackend() {
      try {
        const response6 = await fetch('http://localhost:8080/orders');
        const data6 = await response6.json();
        this.adminOrders = data6;
      } catch (error) {
        console.error('Ошибка загрузки данных из бэкенда:', error);
      }
    },
    async loadMyOrdersFromBackend() {
      try {
        const response6 = await fetch('http://localhost:8080/orders/my', {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwt")!).jwt}`
          }
        });
        const data7 = await response6.json();
        this.userOrders = data7;
      } catch (error) {
        console.error('Ошибка загрузки данных из бэкенда:', error);
      }
    },
    async loadBouquetsFromBackend() {
      try {
        const response6 = await fetch('http://localhost:8080/bouquets/default');
        const data6 = await response6.json();
        this.adminNewItems = data6;
      } catch (error) {
        console.error('Ошибка загрузки данных из бэкенда:', error);
      }
    },

    //admin
    loadOrders() {
      this.loadOrdersFromBackend();
    },
    loadBouquets() {
      this.loadBouquetsFromBackend();
    },
    addNewItemAdmin(data: TProductCard) {
      return this.adminNewItems.push(data)
    },
    addNewOrderAdmin(data: TClientInfo) {
      return this.adminOrders.push(data)
    },

    async removeOrderFromAdmin(data: TClientInfo) {
      try {
        const response = await fetch(`http://localhost:8080/order/${data.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Заказ успешно удалён');
          this.loadOrdersFromBackend();
        } else {
          console.error('Error deleting order:', response.statusText);
          alert('Failed to delete order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    },
    async approveOrderFromAdmin(data: TClientInfo) {
      try {
        const response = await fetch(`http://localhost:8080/order/${data.id}`, {
          method: 'PUT',
        });
        if (response.ok) {
          alert('Заказ успешно подтвержден');
          this.loadOrdersFromBackend();
        } else {
          console.error('Error deleting order:', response.statusText);
          alert('Failed to delete order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    },

    //cart
    setCartValue(data: boolean) {
      return (this.isCartOpen = data)
    },
    setCartFormInfo(data: TClientInfo) {
      return (this.cartFormInfo = data)
    },
    addItemToCart(data: TProductCard) {
      const $toast = useToast();
      let instance = $toast.success("Букет: '" + data.name + "' успешно добавлен в корзину!");
      const exists = this.cartItems.find((c) => c?.id === data?.id && c?.name === data?.name);
      if (exists) {
        exists.quantity += 1
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      } else {
        let result = this.cartItems.push(data);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        return result;
      }
    },
    removeItemFromCart(data: TProductCard) {
      let result = this.cartItems.splice(data, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      return result;
    },
    removeItemsFromCart() {
      this.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    decrementItemsFromCart(item: any) {
      item.quantity--;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },

    //product view
    doAllNewView(data: boolean) {
      return (this.allNewView = data)
    },
    doFruitsView(data: boolean) {
      return (this.fruitsView = data)
    },
    doCandiesView(data: boolean) {
      return (this.candiesView = data)
    },
    doBerriesView(data: boolean) {
      return (this.berriesView = data)
    },
    doNutsView(data: boolean) {
      return (this.nutsView = data)
    },
    doDriedFruitsView(data: boolean) {
      return (this.driedFruitsView = data)
    }
  }
})
