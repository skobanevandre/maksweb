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
          <span class="itemPrice">{{ price }} ₽</span>
        </center>
        <vs-button danger flat @click="toCart( item )">
          В корзину
        </vs-button>
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

    price() {
      return  Number( this.item.price.standart ).toFixed( 2 );
    },

  },

  methods: {
    toCart( item ) {
      this.$store.commit('cart/add', item )
    }
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
</style>
