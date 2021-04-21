<template>
  <div>
    <h1 class="center">Корзина</h1>

    <vs-row justify="flex-start" align="center"
      class="row"
      v-for="( data, i ) in $store.state.cart.items"
      :key="i" >

      <img :src="data.item.titleimage" width="70" :alt="data.item.title" class="margin-right itemImage">

      <div class="dataCell margin-right">
        <span class="itemTitle">{{ data.item.title }}</span>  
      </div>  

      <div class="priceCell margin-right">
          <span class="itemPrice">{{ Number( data.item.price.standart ).toFixed( 2 ) }} ₽	</span>  
      </div>  

      <vs-row justify="space-between" align="center" class="qtyCell margin-right">
        <i class="bx bx-minus qtyButton" @click="$store.commit( 'cart/decrease', data.item.article )" />
          <span class="itemQty">{{ data.qty }}</span>  
        <i class="bx bx-plus qtyButton" @click="$store.commit( 'cart/increase', data.item.article )" />
      </vs-row>  

      <vs-row justify="center" align="center" class="costCell margin-right">
          <span class="itemCost">{{ Number( data.item.price.standart * data.qty ).toFixed( 2 ) }} ₽	</span>  
      </vs-row>        

      <div class="trashCell">
        <i class="bx bxs-trash trashIcon" />
      </div> 

    </vs-row>

    <vs-row justify="flex-end" class="summ margin-top"> Всего: {{ $store.getters['cart/csum'] }}</vs-row>

  </div>    
</template>

<style scoped>
  .row {
    margin-bottom: 10px;
  }

  .trashIcon {
    font-size: 1.3em;
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
  }

  .itemImage {
    border-radius: 10px;
  }

  .itemCost {
    font-weight: bold;
    font-size: 1.2em;
  }


  .dataCell {
    flex-grow: 1;
  }

  .priceCell {
    flex-basis: 80px;
  }

  .costCell {
    flex-basis: 100px;
  }

  .qtyCell {
    flex-basis: 80px;
  }
</style>