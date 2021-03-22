<template>
  <div>
    <NuxtLink :to=setUrl>
    <vs-card class="card">

      <template #title>
        <h3>{{title}}</h3>
      </template>

      <template #img>
        <img :src=image :alt=title>
      </template>

    <template #text>
      <div class="amountblock">
        <center><span class="itemPrice">{{price}} ₽</span></center>      
        <vs-button danger flat>
          В корзину
        </vs-button>
      </div>
    </template>

    <template #interactions>
      <vs-button danger size="small">
        <i class='bx bx-heart'></i>
      </vs-button>
    </template>

    </vs-card>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: [ 'title', 'image', 'price', 'url'],
  data() {
    return {
      amount: 0,
    }
  },
  computed:{
    setUrl() {
      return '/items/' + this.url;
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
</style>
