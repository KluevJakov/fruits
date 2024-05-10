import { defineStore } from 'pinia'
import productImg from '../assets/pictures/product.png'
import { type TProductCard } from '@/types/ProductCardType'
import { type TClientInfo } from '@/types/ClientInfoType'

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    // admin new item
    adminNewItems: [] as TProductCard[],
    adminOrders: [] as TClientInfo[],
    //корзина булеан
    isCartOpen: false,

    //cart items
    cartItems: [] as TProductCard[],

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
        img: productImg
      },
      {
        id: 2,
        name: 'Фрукты',
        img: productImg
      },
      {
        id: 3,
        name: 'Конфеты',
        img: productImg
      },
      {
        id: 4,
        name: 'Ягоды',
        img: productImg
      },
      {
        id: 5,
        name: 'Орехи',
        img: productImg
      },
      {
        id: 6,
        name: 'Сухофрукты',
        img: productImg
      }
    ] as TProductCard[],
    allNew: [
      {
        id: 1,
        name: 'Все новинки 1',
        img: productImg,
        quantity: 1
      },
      {
        id: 2,
        name: 'Все новинки 2',
        img: productImg,
        quantity: 1
      },
      {
        id: 3,
        name: 'Все новинки 3',
        img: productImg,
        quantity: 1
      },
      {
        id: 4,
        name: 'Все новинки 4',
        img: productImg,
        quantity: 1
      },
      {
        id: 5,
        name: 'Все новинки 5',
        img: productImg,
        quantity: 1
      },
      {
        id: 6,
        name: 'Все новинки 6',
        img: productImg,
        quantity: 1
      }
    ] as TProductCard[],
    fruits: [
      {
        id: 1,
        name: 'Фрукты 1',
        img: productImg,
        quantity: 1
      },
      {
        id: 2,
        name: 'Фрукты 2',
        img: productImg,
        quantity: 1
      },
      {
        id: 3,
        name: 'Фрукты 3',
        img: productImg,
        quantity: 1
      },
      {
        id: 4,
        name: 'Фрукты 4',
        img: productImg,
        quantity: 1
      },
      {
        id: 5,
        name: 'Фрукты 5',
        img: productImg,
        quantity: 1
      },
      {
        id: 6,
        name: 'Фрукты 6',
        img: productImg,
        quantity: 1
      }
    ] as TProductCard[],
    candies: [
      {
        id: 1,
        name: 'Конфеты 1',
        img: productImg,
        quantity: 1
      },
      {
        id: 2,
        name: 'Конфеты 2',
        img: productImg,
        quantity: 1
      },
      {
        id: 3,
        name: 'Конфеты 3',
        img: productImg,
        quantity: 1
      },
      {
        id: 4,
        name: 'Конфеты 4',
        img: productImg,
        quantity: 1
      },
      {
        id: 5,
        name: 'Конфеты 5',
        img: productImg,
        quantity: 1
      },
      {
        id: 6,
        name: 'Конфеты 6',
        img: productImg,
        quantity: 1
      }
    ] as TProductCard[],
    berries: [
      {
        id: 1,
        name: 'Ягоды 1',
        img: productImg,
        quantity: 1
      },
      {
        id: 2,
        name: 'Ягоды 2',
        img: productImg,
        quantity: 1
      },
      {
        id: 3,
        name: 'Ягоды 3',
        img: productImg,
        quantity: 1
      },
      {
        id: 4,
        name: 'Ягоды 4',
        img: productImg,
        quantity: 1
      },
      {
        id: 5,
        name: 'Ягоды 5',
        img: productImg,
        quantity: 1
      },
      {
        id: 6,
        name: 'Ягоды 6',
        img: productImg,
        quantity: 1
      }
    ] as TProductCard[],
    nuts: [
      {
        id: 1,
        name: 'Орехи 1',
        img: productImg,
        quantity: 1
      },
      {
        id: 2,
        name: 'Орехи 2',
        img: productImg,
        quantity: 1
      },
      {
        id: 3,
        name: 'Орехи 3',
        img: productImg,
        quantity: 1
      },
      {
        id: 4,
        name: 'Орехи 4',
        img: productImg,
        quantity: 1
      },
      {
        id: 5,
        name: 'Орехи 5',
        img: productImg,
        quantity: 1
      },
      {
        id: 6,
        name: 'Орехи 6',
        img: productImg,
        quantity: 1
      }
    ] as TProductCard[],
    driedFruits: [
      {
        id: 1,
        name: 'Сухофрукты 1',
        img: productImg,
        quantity: 1
      },
      {
        id: 2,
        name: 'Сухофрукты 2',
        img: productImg,
        quantity: 1
      },
      {
        id: 3,
        name: 'Сухофрукты 3',
        img: productImg,
        quantity: 1
      },
      {
        id: 4,
        name: 'Сухофрукты 4',
        img: productImg,
        quantity: 1
      },
      {
        id: 5,
        name: 'Сухофрукты 5',
        img: productImg,
        quantity: 1
      },
      {
        id: 6,
        name: 'Сухофрукты 6',
        img: productImg,
        quantity: 1
      }
    ] as TProductCard[],

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
   async loadIngredientsFromBackend() {
      try {
        const response1 = await fetch('http://localhost:8080/ingredients/0c94587e-8654-4583-acdd-c5b51ae96f56');
        const data1 = await response1.json();
        this.allFruits = data1.allFruits;

        const response2 = await fetch('http://localhost:8080/ingredients/a55225ed-4c65-46cb-b9d7-79a5d89235ce');
        const data2 = await response2.json();
        this.allCandies = data2.allCandies;

        const response3 = await fetch('http://localhost:8080/ingredients/e88b0a37-f583-40a0-8efe-7d1422b96ec5');
        const data3 = await response3.json();
        this.allBerries = data3.allBerries;

        const response4 = await fetch('http://localhost:8080/ingredients/ae0abfe9-c7d5-4959-9240-40b3d912b76d');
        const data4 = await response4.json();
        this.allNuts = data4.allNuts;

        const response5 = await fetch('http://localhost:8080/ingredients/55ac2221-ac1c-4d62-a47d-44f412a6364c');
        const data5 = await response5.json();
        this.allDriedFruits = data5.allDriedFruits;
      } catch (error) {
        console.error('Ошибка загрузки данных из бэкенда:', error);
      }
    },

    //admin
    addNewItemAdmin(data: TProductCard) {
      return this.adminNewItems.push(data)
    },
    addNewOrderAdmin(data: TClientInfo) {
      return this.adminOrders.push(data)
    },
    removeOrderFromAdmin(data: TClientInfo) {
      return this.adminOrders.splice(data, 1)
    },

    //cart
    setCartValue(data: boolean) {
      return (this.isCartOpen = data)
    },
    setCartFormInfo(data: TClientInfo) {
      return (this.cartFormInfo = data)
    },
    addItemToCart(data: TProductCard) {
      const exists = this.cartItems.find((c) => c?.id === data?.id && c?.name === data?.name)
      if (exists) {
        exists.quantity += 1
      } else {
        return this.cartItems.push(data)
      }
    },
    removeItemFromCart(data: TProductCard) {
      return this.cartItems.splice(data, 1)
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
