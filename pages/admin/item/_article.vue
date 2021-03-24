<template>
  <div>
    <adminTitle>РЕДАКТИРОВАНИЕ ТОВАРА :: АРТИКУЛ № {{ article }} </adminTitle>

    <div class="rowleft margin-top v-center">
      <div class="margin-right" style="flex-grow:0;">
        <span>Наименование:</span>
      </div>

      <div style="flex-grow:1;">
        <vs-input class="itemTitle" style="flex-grow:0;" v-model="item.title"/>
      </div>  
    </div>

    <div class="rowleft margin-top v-center">
      <div class="margin-right" style="flex-grow: 0;">
        <span>Категория:</span>
      </div>

      <div style="flex-grow:1;">
        <vs-select v-model="item.category" style="flex-grow:1;">
          <vs-option
          v-for="( category, i ) in categories" 
          :key = i
          :label="category.name" 
          :value="category.id" >
            {{ category.name }}
          </vs-option>
        </vs-select>
      </div>  
    </div>

    <vs-row justify="space-between" class="margin-top">

      <div class="rowleft v-center margin-right">
        <span class="margin-right">Активен:</span>
        <vs-switch v-model="item.active == 1 ? true : false" />
      </div>

      <div class="rowleft v-center margin-right">
        <span class="margin-right">На главной:</span>
        <vs-switch v-model="item.indexpage == 1 ? true : false" />
      </div>

      <div class="rowleft v-center margin-right">
        <span class="margin-right">В наличии:</span>
        <vs-switch />
      </div>

    </vs-row>

    <div class="rowcenter">
      <span class="title margin-top">Изображение:</span>
    </div>  

    <div class="margin-top">
      <div class="imageSheet">
        <div
          v-for="( img, i ) in images"
          :key = "i"      
          class="imageContainer" >
      
          <img
            :src = "'/images/item/' + article + '/' + img" 
            class = "itemImg" >

          <vs-button icon shadow size="small" class="delImage" @click="delImage(img)">
            <i class='bx bx-x'></i>
          </vs-button>
        
          <vs-button icon :shadow = "!isMainImage(img)" size="small" class="mainImage" @click="setMainImage(img)">
            <i class='bx bx-star'></i>
          </vs-button>

        </div>
      </div>

      <div class="fileButtonBlock">
        <input type="file" ref="imageSelect" @change="handleImage" accept="image/*" class="hidden"/>
        <vs-button @click="selectClick" >Добавить изображение</vs-button>
      </div>  
    </div>

    <div class="rowcenter">
      <span class="title margin-top">Стоимость:</span>
    </div>   

    <vs-row class="margin-top" justify="space-between">

      <div class="v-center margin-right col">
        <span>Стандарт:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Опт:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Распродажа:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Ликвидация:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

    </vs-row>

    <div class="rowcenter">
      <span class="title margin-top">Габариты:</span>
    </div>  

    <vs-row class="margin-top" justify="space-between">

      <div class="v-center margin-right col">
        <span>Высота:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Ширина:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Глубина:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Вес:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

    </vs-row>

    <div class="rowcenter">
      <span class="title margin-top">Габариты упаковки:</span>
    </div>  

    <vs-row class="margin-top" justify="space-between">

      <div class="v-center margin-right col">
        <span>Высота:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Ширина:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Глубина:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

      <div class="v-center margin-right col">
        <span>Вес:</span>
        <vs-input type="number" style="width: 150px;" >{{ item.price }}</vs-input>
      </div>

    </vs-row>

   <div class="rowcenter">
      <vs-button class="margin-top" size="large" style="font-weight: bold;">Сохранить</vs-button>
    </div>  
    

  </div>

</template>

<script>

export default {
  layout:'admin',

  data() {
    return{
      image: '',

    }
  },

  computed: { 
    getImageUrl( img ) {
      return '/images/item/' + this.article + '/' + img;
    },
  },

  methods: {
    async sendImage( image ) {
      let fd = new FormData();
      fd.append('image', image )
      fd.append('article', this.item.article )

      this.images = await this.$axios.$post( '/item/image/' + this.item.article, fd );
    },

    selectClick() {
      console.log( this.$refs.imageSelect );
      this.$refs.imageSelect.click();
    }, 

    handleImage( event ) {
      let selectedImage = event.target.files[0];
      this.sendImage( selectedImage );
    },

    async delImage( imageName ) {
      /**
       * Обязательно прикрутить модальное окно.
       */

      this.images = await this.$axios.$delete( '/item/image/' + this.item.article, 
        { 
          data: { image: imageName } 
        } 
      );
    },

    setMainImage( imageName ) {
      /**
       * В Общем... При нажатии на кнопку - записываем в базу данную картинку
       * При отрисовке будем сверяться с данными с базы.
       * Если наименование совпадает - то ставим метку что она главная.
       * 
       * Потом, может Быть, сделаю так, что она будет отображаться первой.
       */

      this.item.image = '/images/item/' + this.item.article + '/' + imageName;
    },

    isMainImage( imageName ) {
      if ( imageName == this.item.image.split('/').pop() ) 
        return true;
      else 
        return false;  
    },

  },

  async asyncData({ params, $axios }) {
    const item = await $axios.$get( '/item/' + params.article );
    const images = await $axios.$get( '/item/image/' + params.article );
    const categories = await $axios.$get( `/category` );
    return { 
      'images' : images, 
      'item' : item[0], 
      'article' : params.article, 
      'categories': JSON.parse( JSON.stringify( categories ) ) 
    }; 
  },

  mounted() {
    console.log( 'categories:', this.categories )
  }
 
}
</script>

<style scoped>

  .imageSheet {
    overflow-x: auto ;  
    display: flex;
    scroll-snap-type: x mandatory;

    height: 250px;
    background-color: #f4f7f8;
    border-radius: 10px;
  }

  .imageContainer {
    scroll-snap-align: start;
    height: 200px;
    position: relative;
  }

  .itemImg {
    height: 100%;
    border-radius: 10px;
    margin: 10px;
  }

  .delImage {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .mainImage {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .fileButtonBlock {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .hidden {
    width: 1px;
    height: 1px;
    display: none;
    visibility: hidden;
  }

  .itemTitle { 
    width:100%; 
    margin-top: 10px;
    font-size: 1.2em;
  }

</style>