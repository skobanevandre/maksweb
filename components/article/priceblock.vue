<template>
  <vs-row justify="space-around" align="center" >
    <div class="priceTag" v-if="currentPrice > 0">
      <span v-if="currentPrice == '1'">Скидка</span>
      <span v-if="currentPrice == '2'">Распродажа</span>
      <span v-if="currentPrice == '3'">Ликвидация</span>
    </div>

    <div class="standartPrice" v-if="currentPrice > 0">
      {{ Number( $attrs.item.price.standart ).toFixed( 2 ) }} ₽	
    </div>

    <div class="price">
      {{ $attrs.item.price.wholesale }} ₽	
    </div>

  </vs-row>
</template>

<script>
export default {
  model: {
    prop: 'item'
  },

  data() {
    return {
      notStandartPrice : false,
      currentPrice: this.$attrs.item.price.current,
    }
  },
  
}
</script>

<style scoped>
  
  .priceTag{
    color: white;
    font-weight: bold;
    padding: 10px;
    background-color: red;
    border: 1px solid silver;
    border-radius: 5px;
  }

  .price {
    font-weight: bold;
    font-size: 2em;
    color: red;
  }

  .standartPrice {
    font-weight: bold;
    font-size: 1.5em;
    color: silver;
    position: relative;
  }

.standartPrice:before {
    border-bottom: 3px solid red;
    position: absolute;
    content: "";
    width: 150%;
    height: 50%;
    left: -25%;
    transform: rotate(17deg);
}
</style>