import { defineStore } from 'pinia';
import productImgB1 from '../assets/products/berrys/berry1.png'
import productImgB2 from '../assets/products/berrys/berry2.png'
import productImgB3 from '../assets/products/berrys/berry3.png'
import productImgB4 from '../assets/products/berrys/berry4.png'
import productImgB5 from '../assets/products/berrys/berry5.png'
import productImgB6 from '../assets/products/berrys/berry6.png'
import productImgD1 from '../assets/products/drieds/dried1.png'
import productImgD2 from '../assets/products/drieds/dried2.png'
import productImgD3 from '../assets/products/drieds/dried3.png'
import productImgD4 from '../assets/products/drieds/dried4.png'
import productImgD5 from '../assets/products/drieds/dried5.png'
import productImgD6 from '../assets/products/drieds/dried6.png'
import productImgF1 from '../assets/products/fruits/fruit1.png'
import productImgF2 from '../assets/products/fruits/fruit2.png'
import productImgF3 from '../assets/products/fruits/fruit3.png'
import productImgF4 from '../assets/products/fruits/fruit4.png'
import productImgF5 from '../assets/products/fruits/fruit5.png'
import productImgF6 from '../assets/products/fruits/fruit6.png'
import productImgN1 from '../assets/products/new/new1.png'
import productImgN2 from '../assets/products/new/new2.png'
import productImgN3 from '../assets/products/new/new3.png'
import productImgN4 from '../assets/products/new/new4.png'
import productImgN5 from '../assets/products/new/new5.png'
import productImgN6 from '../assets/products/new/new6.png'
import productImgNu1 from '../assets/products/nuts/nuts1.png'
import productImgNu2 from '../assets/products/nuts/nuts2.png'
import productImgNu3 from '../assets/products/nuts/nuts3.png'
import productImgNu4 from '../assets/products/nuts/nuts4.png'
import productImgNu5 from '../assets/products/nuts/nuts5.png'
import productImgNu6 from '../assets/products/nuts/nuts6.png'
import productImgS1 from '../assets/products/sweets/sweet1.png'
import productImgS2 from '../assets/products/sweets/sweet2.png'
import productImgS3 from '../assets/products/sweets/sweet3.png'
import productImgS4 from '../assets/products/sweets/sweet4.png'
import productImgS5 from '../assets/products/sweets/sweet5.png'
import productImgS6 from '../assets/products/sweets/sweet6.png'
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
        img: productImgN3
      },
      {
        id: 2,
        name: 'Фрукты',
        img: productImgF2
      },
      {
        id: 3,
        name: 'Конфеты',
        img: productImgS3
      },
      {
        id: 4,
        name: 'Ягоды',
        img: productImgB3
      },
      {
        id: 5,
        name: 'Орехи',
        img: productImgNu3
      },
      {
        id: 6,
        name: 'Сухофрукты',
        img: productImgD4
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
    // catalogItems: (state: useMainStore): Array<TProductCard> => state.catalogItems,
    // allNew: (state: useMainStore): Array<TProductCard> => state.allNew,
    // fruits: (state: useMainStore): Array<TProductCard> => state.fruits,
    // candies: (state: useMainStore): Array<TProductCard> => state.candies,
    // berries: (state: useMainStore): Array<TProductCard> => state.berries,
    // nuts: (state: useMainStore): Array<TProductCard> => state.nuts,
    // driedFruits: (state: useMainStore): Array<TProductCard> => state.driedFruits,
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
