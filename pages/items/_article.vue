<template>
  <div class="article">

    <div class="itemLayout">
      <div class="itemImage">
        <img :src=item.image :alt=item.title>
      </div>

      <div class="itemInfo">
        <h2 style="text-align: center;">{{ item.title }}</h2>

        <div class="socialGroup">

          <vs-button icon color="facebook" >
            <i class='bx bxl-facebook-square'></i>
          </vs-button>

          <vs-button icon color="twitter" >
            <i class='bx bxl-twitter'></i>
          </vs-button>

          <vs-button icon color="whatsapp" >
            <i class='bx bxl-whatsapp'></i>
          </vs-button>

          <vs-button icon color="blue" >
            <i class='bx bxl-vk'></i>
          </vs-button>

          <vs-button icon warn >
            <i class='bx bxl-ok-ru'></i>
          </vs-button>

          <vs-button icon danger >
            <i class='bx bxl-pinterest'></i>
          </vs-button>
        </div>  

         <hr style="margin: 20px; border: none; border-bottom: 1px dotted #ccc;">

        <div class="rowspacebetween" style="margin-bottom: 10px;">
          <div>Артикул: <span class="itemArticle">{{ item.article }}</span></div>  
          <div>В наличии: <span class="itemInStock">Есть</span></div>  
          <div>Стоимость: <span class="itemPrice">{{ item.price }} ₽</span></div>  
        </div>

         <hr style="margin: 20px; border: none; border-bottom: 1px dotted #ccc;">

        <div class="itemDimensions">
          <div>Высота: 120 мм</div>
          <div>Ширина: 65 мм</div>
          <div>Глубина: 10 мм</div>  
          <div>Вес: 20 гр</div>  
        </div>  

        <hr style="margin: 20px; border: none; border-bottom: 1px dotted #ccc;">

        <dl>
          <dt>Количество</dt>
          <dd><vs-input type="number" v-model="qty" flat/></dd>  
        </dl>

        <vs-button primary block size="large" style="margin-bottom: 20px;">
          <i class='bx bx-cart-alt' style="margin-right: 10px;" />
          Оформить заказ
        </vs-button>       

        <div class="rowspacebetween">
          <div class="commblock">
            <span>Возникли вопросы?</span>
            <vs-button block color="#23a900" size="large">
              <i class='bx bx-cart-alt' style="margin-right: 10px;" />
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
        </div>

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
    const item = await $axios.$get( `/item/${params.article}` );
    return { 'item' : item[0] }; 
  }

}
</script>

<style scoped>
  .commblock {
    max-width: 280px; 
    width: 100%; 
    display: flex; 
    justify-items: center; 
    flex-direction: column;
    text-align: center;
    margin: 20px 0px;
  }
</style>