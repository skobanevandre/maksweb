<template>
  <div>
    <h1 class="center">Корзина</h1>

  <div v-if="$store.state.cart.items.length > 0">
    <vs-row justify="flex-start" align="center"
      class="row"
      v-for="( data, i ) in $store.state.cart.items"
      :key="i" >

      <img :src="data.item.titleimage" width="70" :alt="data.item.title" class="margin-right itemImage">

      <div class="dataCell margin-right">
        <div class="dataCellItem">
          <div style="margin-bottom: 10px;">
            <span >Арткул: <strong>{{ data.item.article }}</strong></span>
            <span class="priceTag" v-if="data.item.price.current == 1">Скидка</span>
            <span class="priceTag" v-if="data.item.price.current == 2">Распродажа</span>
            <span class="priceTag" v-if="data.item.price.current == 3">Ликвидация</span>
          </div>  
          <span class="itemTitle">{{ data.item.title }}</span>  
        </div>
      </div>  

      <div class="priceCell margin-right">
        <span v-if="Number( data.item.price.current ) > 0" class="standartPrice">{{ Number( data.item.price.standart ).toFixed( 2 ) }} ₽ </span>
        <span v-if="Number( data.item.price.current ) == 0" class="itemPrice">{{ Number( data.item.price.standart ).toFixed( 2 ) }} ₽	</span>  
        <span v-if="Number( data.item.price.current ) == 1" class="itemPrice">{{ Number( data.item.price.sale ).toFixed( 2 ) }} ₽	</span> 
        <span v-if="Number( data.item.price.current ) == 2" class="itemPrice">{{ Number( data.item.price.wholesale ).toFixed( 2 ) }} ₽	</span> 
        <span v-if="Number( data.item.price.current ) == 3" class="itemPrice">{{ Number( data.item.price.licvidation ).toFixed( 2 ) }} ₽	</span> 
      </div>  

      <vs-row justify="space-between" align="center" class="qtyCell margin-right">
        <i class="bx bx-minus qtyButton" @click="$store.commit( 'cart/decrease', data.item.article )" />
          <span class="itemQty">{{ data.qty }}</span>  
        <i class="bx bx-plus qtyButton" @click="$store.commit( 'cart/increase', data.item.article )" />
      </vs-row>  

      <vs-row justify="center" align="center" class="costCell margin-right">
          <span v-if="Number( data.item.price.current ) == 0" class="itemCost">{{ Number( data.item.price.standart * data.qty ).toFixed( 2 ) }} ₽	</span>  
          <span v-if="Number( data.item.price.current ) == 1" class="itemCost">{{ Number( data.item.price.sale * data.qty ).toFixed( 2 ) }} ₽	</span> 
          <span v-if="Number( data.item.price.current ) == 2" class="itemCost">{{ Number( data.item.price.wholesale * data.qty ).toFixed( 2 ) }} ₽	</span> 
          <span v-if="Number( data.item.price.current ) == 3" class="itemCost">{{ Number( data.item.price.licvidation * data.qty ).toFixed( 2 ) }} ₽	</span> 
      </vs-row>        

      <div class="trashCell">
        <i class="bx bxs-trash trashIcon" @click="$store.commit( 'cart/del', data.item )"/>
      </div> 

    </vs-row>

    <vs-row justify="flex-end" class="summ margin-top"> Итого: {{ $store.getters['cart/summ'] }}</vs-row>

    <vs-row justify="center">
      <NuxtLink to="/user">
        <vs-button class="margin-top">Оформить заказ</vs-button>
      </NuxtLink>  
    </vs-row>  

  </div>  

  <div v-else>
    <span class="center"> Корзина пуста</span>
  </div>

  </div>    
</template>

<style scoped>
  .row {
    margin-bottom: 10px;
  }

  .trashIcon {
    font-size: 1em;
    color: white;
    background-color: #7c483c;
    padding: 10px;
    border-radius: 10px;
  }

  .qtyButton {
    font-size: 1.5em;
    color: #7c483c;
  }

  .itemQty {
    font-weight: bold;
    font-size: 1.2em;
  }

  .summ {
    font-weight: bold;
    font-size: 1.2em;
  }

  .itemTitle {
    font-weight: bold;
    word-wrap:break-word;
  }

  .itemImage {
    border-radius: 10px;
  }

  .itemPrice {
    font-weight: bold;
    font-size: 1.1em;
  }

  .itemCost {
    font-weight: bold;
    font-size: 1.2em;
  }

  .standartPrice {
    font-size: 0.9em;
    position: relative;
  }

  .standartPrice::before {
    border-bottom: 2px solid red;
    position: absolute;
    content: "";
    width: 120%;
    height: 50%;
    left: -10%;
    transform: rotate(9deg);
  }

  .priceTag {
    background-color: maroon;
    color: white;
    padding: 5px;
    border-radius: 10px;
  }

  .dataCell {
    flex-grow: 1;
  }

  .dataCellItem {
    word-wrap: break-word;
    max-width: fit-content;
  }

  .priceCell {
    flex-basis: 80px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }

  .costCell {
    flex-basis: 100px;
  }

  .qtyCell {
    flex-basis: 80px;
  }
</style>