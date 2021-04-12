<template>
  <div>
    <adminTitle>РЕДАКТИРОВАНИЕ КАТЕГОРИИ № {{ category.id }}</adminTitle>

    <vs-row justify="flex-end" align="center" class="margin-bottom">
      <vs-button @click="saveDialog=true;">Сохранить</vs-button>
      <vs-button @click="$router.go(-1)">Отмена</vs-button>
    </vs-row>

    <vs-row direction="row" wrap="nowrap" align= "flex-start">
      <div class="imageblock" @click="addImage()">
        <img
          v-if = "category.image"
          :src = "category.image" 
          :alt = "category.imagealt"
          class = "categoryImg" > 

        <vs-button v-if = "category.image" size="small" class="altImage" @click="imagealt = category.imagealt; altDialog=true;">Описание</vs-button> 
        <vs-button v-if = "category.image" size="small" class="delImage" @click="delDialog=true;">Удалить</vs-button> 
        <input type="file" ref="imageSelect" @change="handleImage" accept="image/*" class="hidden"/>       
      </div>  

      <div class="datablock">

        <vs-row justify="flex-start" align="center">
          <vs-row justify="flex-start" style="width: 33%;" align="center">
            <span style="margin-right: 20px;">Активно:</span>
            <vs-switch v-model="active"></vs-switch>
          </vs-row>

          <vs-row justify="flex-start" style="width: 33%;" align="center">
            <span style="margin-right: 20px;">На главной:</span>
            <vs-switch v-model="indexpage"></vs-switch>
          </vs-row>  

          <vs-row justify="flex-start" style="width: 33%;" align="center">
            <span style="margin-right: 20px;">В меню:</span>
            <vs-switch v-model="menu"></vs-switch>
          </vs-row> 

        </vs-row>

        <span class="title margin-top center">Наименование категории:</span>
        <vs-input class="margin-top" v-model="category.name"></vs-input>

        <span class="title margin-top center">Родительская категория:</span>
        <vs-select v-model="category.parentcategory" class="margin-top">
          <vs-option 
            v-for = "( parentcategory, i ) in categories"
            :label = "parentcategory.name" 
            :value = "parentcategory.id"
            :key = "i"
            >
            {{ parentcategory.name }}
          </vs-option>
        </vs-select>

      </div>
    </vs-row>

    <span class="title margin-top margin-bottom center">Описание категории:</span>
    <admin-category-editor v-model="category"/>

    <vs-dialog v-model="saveDialog">
      <template #header>
        <h4>Сохранить и продолжить редактирование?</h4>
      </template>

      <span>Или вернуться на предыдущую страницу после сохранения ?</span> 

      <template #footer>
        <vs-row justify="flex-end" align="center" >
          <vs-button @click=" saveCategory(); $router.go( -1 )">Выйти</vs-button>
          <vs-button @click=" saveCategory(); $router.go( )">Продолжить</vs-button>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog v-model="altDialog">
      <template #header>
        <h4>Введите описание картинки ( alt )</h4>
      </template>

      <vs-input v-model="imagealt"/> 

      <template #footer>
        <vs-row justify="flex-end" align="center" >
          <vs-button @click="category.imagealt=imagealt; altDialog=false;">Применить</vs-button>
          <vs-button @click="altDialog=false;">Отмена</vs-button>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog v-model="delDialog">
      <template #header>
        <h4>Удалить картинку?</h4>
      </template>

      <center><img :src = "category.image" style="width: 300px;"></center>

      <template #footer>
        <vs-row justify="flex-end" align="center" >
          <vs-button @click="delImage(); delDialog=false;">Удалить</vs-button>
          <vs-button @click="altDialog=false;">Отмена</vs-button>
        </vs-row>
      </template>
    </vs-dialog>

    <pre>{{ $data }}</pre>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      altDialog: false,
      delDialog: false,
      saveDialog: false,
      imagealt: null,
    }
  },
  
  async asyncData({ params, $axios }) {
    const category = await $axios.$get( '/category/' + params.category );
    const categories = await $axios.$get( '/category/' );
    
    return { 
      'category' : category[0], 
      'categories': categories 
    }; 
  },
  
  computed: {
 
    active: {
      get() {
        return Boolean( this.category.active );
      },
      set( val ){
        this.category.active = Number( val );
      }
    },

    indexpage: {
      get() {
        return Boolean( this.category.indexpage );
      },
      set( val ){
        this.category.indexpage = Number( val );
      }
    },

    menu: {
      get() {
        return Boolean( this.category.menu );
      },
      set( val ){
        this.category.menu = Number( val );
      }
    },

  },

  methods: {

    async saveCategory() {
      this.saveDialog=false; 
      await this.$axios.$put( '/category' , this.category )
      // this.$router.go( -1 );      
    },

    addImage() {
      if ( !this.category.image )
        this.$refs.imageSelect.click();
    },

    delImage() {
      this.category.image = null;
      // Ссылка на АПИ для удажения картинки

    },

    async sendImage( image ) {
      // Ссылка на АПИ для сохранения категории
      let fd = new FormData();
      fd.append('image', image )

      this.category.image = await this.$axios.$post( '/catimage' , fd )
    },

    handleImage( event ) {
      let selectedImage = event.target.files[0];
      this.sendImage( selectedImage );
    },
  },

}
</script>

<style scoped>
  .imageblock {
    width: 300px;
    height: 300px;
    border: 1px dotted silver;
    flex-grow: 0;
    margin-right: 20px;
    background-image: url( /images/category/add.png );
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
  }

  .datablock {
    flex-grow: 1;
    align-content :flex-start;
  }

  .categoryImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

   .delImage {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .altImage {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }
  
  .hidden {
    width: 1px;
    height: 1px;
    display: none;
    visibility: hidden;
  }

</style>