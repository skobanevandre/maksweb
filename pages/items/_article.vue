<template>
  <div class="article">
    
    <h1 class="articleTitle">{{ item.title }}</h1>

    <div class="itemLayout">

      <div class="itemImage">
        <img :src=item.titleimage :alt=item.title>
      </div>

      <div class="itemInfo">
        
        <article-priceblock v-model="item" />
        <vs-hr />

        <vs-row justify="space-between" align="center">
          <div style="display:flex; flex-wrap: wrap; align-items: flex-end;">
            <span class="margin-right">Артикул:</span>
            <span class="itemArticle">{{ item.article }}</span>
          </div>  

          <div style="display:flex; flex-wrap: wrap; align-items: flex-end;">
            <span class="margin-right">В наличии:</span>
            <article-instock v-model="item"/>  
          </div>  

        </vs-row>

         <vs-hr />

        <vs-row justify="space-between">
          <div>Высота: 120 мм</div>
          <div>Ширина: 65 мм</div>
          <div>Глубина: 10 мм</div>  
          <div>Вес: 20 гр</div>  
        </vs-row>  

        <vs-hr />

        <vs-row justify="space-between" align="center" class="margin-bottom">
          <div style="flex-grow: 0; margin-right: 20px;">
            Количество:
          </div>
          <div style="flex-grow: 1;">
            <vs-input type="number" v-model="qty" flat/>
          </div>
        </vs-row>

        <vs-button primary block size="large" style="margin-bottom: 20px;">
          <i class='bx bx-cart-alt margin-right' />
          Оформить заказ
        </vs-button>       

        <vs-row justify="space-between" align="flex-end" class="margin-bottom">
          <div class="commblock">
            <span>Возникли вопросы?</span>
            <vs-button block color="#23a900" size="large">
              <i class='bx bx-cart-alt margin-right' />
              Напишите нам
            </vs-button>             
          </div>
          <div class="commblock">
            <span>Добавьте товар в избранное</span>
            <vs-button block color="#c98e00" size="large">
              <i class='bx bx-cart-alt' style="margin-right: 10px;" />
              Добавить
            </vs-button>             
          </div>
        </vs-row>

        <article-social /> 

      </div>
    </div>  
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: this.$route.params.article,
      qty: 1,
    }
  },
  
  async asyncData({ params, $axios }) {
    const item = await $axios.$get( '/item/' + params.article );
    return { 'item' : item }; 
  }

}
</script>

<style scoped>
  .commblock {
    display: flex; 
    justify-items: center; 
    flex-direction: column;
    text-align: center;
    margin: 20px 0px;
    flex-grow: 0;
  }

.articleTitle {
  text-align: center; 
  margin-top: 0px; 
  margin-bottom: 30px;
}

.itemImage img{
  border-radius: 20px;
  width: 100%;
  object-fit: contain;
}

.itemImage {
  max-width: 47%;
  width: 100%;
  padding: 0px 10px;
}

.article{
  background-color: transparent;
}

.itemInfo {
  max-width: 49%;
  width: 100%;
}

.itemPrice {
  color: red;
  font-weight: bold;
  font-size: 1.3em;
}

.itemArticle {
  color:black;
  font-weight: bold;
  font-size: 1.3em;
}

.itemInStock {
  color:green;
  font-weight: bold;
  font-size: 1.3em;
}

.socialGroup {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}

</style>