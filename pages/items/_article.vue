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

        <dl>
          <dt>Артикул</dt>
          <dd>{{ item.article }}</dd>  

          <dt>В наличии</dt>
          <dd><instock checked /></dd>  

          <dt>Стоимость</dt>
          <dd><span class="itemPrice">{{ item.price }} ₽</span></dd>  

          <dt>Высота</dt>
          <dd>мм</dd>            

          <dt>Ширина</dt>
          <dd>мм</dd>            

          <dt>Глубина</dt>
          <dd>мм</dd>            

          <dt>Количество</dt>
          <dd><vs-input type="number" v-model="qty" flat/></dd>  
        </dl>

        <vs-button primary block size="large">
          <i class='bx bx-cart-alt' style="margin-right: 10px;" />
          Оформить заявку
        </vs-button>       

      </div>
    </div>  

    <pre> {{ item }}</pre>
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