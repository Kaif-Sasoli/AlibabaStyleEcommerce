// src/data/dummyData.js

import Watch from './assets/Watch.png';
import Laptop from './assets/Laptop.png';
import GoProCamera from './assets/GoProCamera.png';
import Headphones from './assets/Headphones.png';
import CanonMobiles from './assets/CanaonMobiles.png';

import Chair from './assets/Chair.png';
import Lamp from './assets/Lamp.png';
import KitchenDishes from './assets/KitchenDishes.png';
import Pot from './assets/Pot.png';
import KitchenMixer from './assets/KitchenMixer.png';
import Blender from './assets/Blender.png';
import HomeAppliances from './assets/HomeAppliances.png';
import Flower from './assets/Flower.png';

import TShirt from './assets/TShrit.png';
import Jacket from './assets/Jacket.png'
import Coat from './assets/Coat.png'
import Wallet from './assets/Wallet.png'
import Bag from './assets/Bag.png'

import Iphone12 from './assets/Ipone12.png'
import Samsung from './assets/Samsung.png'
import CanonMob from './assets/CanaonMob.png'

export const categories = [
        'Automobiles',
        'Clothes and wear',
        'Home interiors',
        'Computer and tech',
        'Tools, equipments',
        'Sports and outdoor',
        'Animal and pets',
        'Machinery tools',
        'More category',
]

export const products = [
  {
    name: 'Watch',
    image: Watch,
    discount: '23',
  },
  {
    name: 'Laptop',
    image: Laptop,
    discount: '15',
  },
  {
    name: 'GoProCameras',
    image: GoProCamera,
    discount: '40',
  },
  {
    name: 'Headphones',
    image: Headphones,
    discount: '25',
  },
  {
    name: 'Canon Mobiles',
    image: CanonMobiles,
    discount: '32',
  },
];

export const items = [
  {
    title: 'Chair',
    price: '19',
    images: Chair,
  },
  {
    title: 'Lamp',
    price: '10',
    images: Lamp,
  },
  {
    title: 'Kitchen Dishes',
    price: '15',
    images: KitchenDishes,
  },
  {
    title: 'Pot',
    price: '15',
    images: Pot,
  },
  {
    title: 'Kitchen Mixer',
    price: '15',
    images: KitchenMixer,
  },
  {
    title: 'Blender',
    price: '25',
    images: Blender,
  },
  {
    title: 'Home Applinaces',
    price: '25',
    images: HomeAppliances,
  },
  {
    title: 'Flower',
    price: '15',
    images: Flower,
  },
];

export const containerProducts = [
      {
        image : TShirt,
        price : 20,
        title : "T-shirts with multiple colors, for men"
      },
      {
        image: Jacket,
        price: 20,
        title: "Jacket",
      },{
        image: Bag,
        price: 20,
        title: "Girls bag",
      },
      {
        image: Jacket,
        price: 20,
        title: "Jacket with multiple colors",
      },
      {
        image : TShirt,
        price : 20,
        title : "T-shirts with multiple colors, for men"
      },
      {
        image: Jacket,
        price: 20,
        title: "Jacket with multiple colors",
      },{
        image: Bag,
        price: 20,
        title: "Girls bag",
      },
      {
        image: Jacket,
        price: 20,
        title: "Jacket with multiple colors",
      }
]

export const recommededProducts = [
  {
    image: TShirt,
    price: 20,
    title: "T-shirts with multiple colors, for men",
  },
  {
    image: Jacket,
    price: 20,
    title: "Jacket with multiple colors",
  },
  {
    image: Coat,
    price: 20,
    title: "Coat for mens in blue color",
  },
  {
    image: Wallet,
    price: 20,
    title: "Blue wallet",
  },
  {
    image: Bag,
    price: 20,
    title: "Girls bag",
  },
  {
    image: TShirt,
    price: 20,
    title: "T-shirts with multiple colors, for men",
  },
  {
    image: Jacket,
    price: 20,
    title: "Jacket with multiple colors",
  },
  {
    image: Coat,
    price: 20,
    title: "Coat for mens in blue color",
  },
  {
    image: Wallet,
    price: 20,
    title: "Blue wallet",
  },
  {
    image: Bag,
    price: 20,
    title: "Girls bag",
  },
];


export const searchResultProducts = [
  {
    image: Iphone12,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "5.0",
    orders: "154",
    shipping: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },

  {
    image: Samsung,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },

  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "",
    rating: "4.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    image: CanonMob,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    newPrice: "998.00",
    oldPrice: "1128.00",
    rating: "3.0",
    orders: "154",
    shipping: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
]
