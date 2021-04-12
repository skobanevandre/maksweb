<template>
  <div>
    <vs-row justify="center" align="center">
      <adminTitle>РЕДАКТИРОВАНИЕ ТОВАРА:: АРТИКУЛ № {{ item.article }} </adminTitle>
    </vs-row>  

    <vs-row justify="flex-end" align="center" class="margin-bottom">
      <vs-button @click="saveDialog=true;">Сохранить</vs-button>
      <vs-button @click="$router.push('/admin/item/');">Отмена</vs-button>
    </vs-row>
      

    <admin-item-actionblock v-model="item" />

    <span class="title margin-top center">Наименование:</span>
      <admin-item-titleblock v-model="item" />

    <span class="title margin-top center">Состоит в категориях:</span>
      <admin-item-categoriesblock v-model="item" />

    <span class="title margin-top center">Изображения:</span>
      <admin-item-imageblock v-model="item" />

    <div class="title center margin-top">Стоимость:</div>
      <admin-item-priceblock v-model="item" />

    <span class="title center margin-top">Габариты:</span>
      <admin-item-dimensionblock v-model="item" />

    <span class="title margin-top center">Габариты упаковки:</span>
      <admin-item-packdimensionblock v-model="item" />

    <span class="title center margin-top margin-bottom">Описание:</span>
      <admin-item-editor v-model="item" />

    <vs-dialog v-model="saveDialog" >
      <template #header>
        <h4>Сохранить и продолжить редактирование?</h4>
      </template>

      <span>Или вернуться на предыдущую страницу после сохранения ?</span>

      <template #footer>
        <vs-row justify="flex-end">
          <vs-button @click="updateItem(); saveDialog=false;">Продолжить</vs-button>
          <vs-button @click="updateItem(); saveDialog=false; $router.push('/admin/item/');">Выйти</vs-button>       
        </vs-row>
      </template>

    </vs-dialog>
  </div>  
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      saveDialog: false,
    }
  },

  async asyncData({ params, $axios }) {
    const item = await $axios.$get( '/item/' + params.article );
    return { 
      'item' : item, 
    }; 
  },

  methods: {
    async updateItem() {
      // console.log( 'SAVING ITEM' );
      let r = await this.$axios.$put( '/item/', this.item );
      // this.$router.go();
    }
  }

}
</script>

<style scoped>

</style>
