<template>
  <div>
    <h1 class="center">Выбор доставки</h1>
    <div class="bold margin-top">
        <vs-radio v-model="delivery" val="1">Самовывоз со склада в Ростове</vs-radio>
        <vs-radio class="margin-top" v-model="delivery" val="2">CDEK</vs-radio>
        <vs-radio class="margin-top" v-model="delivery" val="5">Почта России</vs-radio> 
        <vs-radio class="margin-top" v-model="delivery" val="6">DHL</vs-radio> 
        <vs-radio class="margin-top" v-model="delivery" val="7">DPD</vs-radio> 
    </div>    

    <div class="center margin-top">
      <NuxtLink to="/payment">
        <vs-button>Перейти к оплате</vs-button>
      </NuxtLink>  
    </div>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      delivery: 0,
    }
  },

}
</script>

<style scoped>
  .bold {
    font-weight: bold;
  }

</style>