<template>
  <div>
    <vs-card class="card">

      <template #title>
        <NuxtLink :to=setUrl>
          <h3>{{ item.title }}</h3>
        </NuxtLink>
      </template>

      <template #img>
        <NuxtLink :to=setUrl>
          <img :src="item.titleimage" :alt="item.title" class="img">
          <span v-if="item.price.current == 1" class="tag">Скидка</span>
          <span v-if="item.price.current == 2" class="tag">Распродажа</span>
          <span v-if="item.price.current == 3" class="tag">Ликвидация</span>
        </NuxtLink>
      </template>

    <template #text>
      <div class="amountblock">
        <center>
          <div v-if="Number( item.price.current ) > 0">
            <span  class="oldPrice">{{ price( item.price.standart ) }} ₽</span>
            <br>
          </div>  
          <span v-if="Number( item.price.current ) == 0" class="itemPrice">{{ price( item.price.standart ) }} ₽</span>
          <span v-if="Number( item.price.current ) == 1" class="itemPrice">{{ price( item.price.sale ) }} ₽</span>
          <span v-if="Number( item.price.current ) == 2" class="itemPrice">{{ price( item.price.wholesale ) }} ₽</span>
          <span v-if="Number( item.price.current ) == 3" class="itemPrice">{{ price( item.price.licvidation ) }} ₽</span>
        </center>
        <span @click="toCart( item )" class="inCart">В корзину</span>
      </div>
    </template>

    <template #interactions>
      <vs-button danger @click=" $store.commit( 'favorites/add', item )">
        <i class='bx bx-heart' />
      </vs-button>
    </template>

    </vs-card>
  </div>
</template>

<script>
export default {

  data() {
    return {
      amount: 0,
      item: this.$attrs.item,
    }
  },

  computed:{

    setUrl() {
      return '/items/' + this.item.article;
    },

  },

  methods: {
    toCart( item ) {
      this.$store.commit('cart/add', { 'item': item, 'qty': 1 } )
    },

    price( val ) {
      return  Number( val ).toFixed( 2 );
    },

  }

}
</script>


<style scoped>
  .card {
    margin: 10px;
  }

  .amountblock {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }

  .img {
    position: relative;
  }

  .tag{ 
    position: absolute;
    top: 12px;
    right: 0px;
    background-color: brown;
    color: white;
    font-weight: bold;
    padding: 7px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .itemPrice {
    color: red;
    font-weight: bold;
    font-size: 1.2em;
  }

  .oldPrice {
    color: black;
    /* font-weight: bold; 
    font-size: 0.8em;*/
    position: relative;
  }

  .oldPrice::before {
    border-bottom: 2px solid red;
    position: absolute;
    content: "";
    width: 120%;
    height: 50%;
    left: -10%;
    transform: rotate(9deg);
  }

  .inCart {
    padding: 7px;
    color: white;
    border: 1px solid silver;
    border-radius: 10px;
    background-color: #7c483c;
    font-weight: bold;
  }
</style>
