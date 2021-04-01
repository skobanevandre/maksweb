<template>
  <div>
    <adminTitle>РЕДАКТИРОВАНИЕ ТОВАРА :: АРТИКУЛ № {{ item.article }} </adminTitle>

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

    


    <pre> {{ $data }} </pre>
  </div>  
</template>

<script>
export default {
  layout: 'admin',

  async asyncData({ params, $axios }) {
    const item = await $axios.$get( '/item/' + params.article );
    return { 
      'item' : item, 
    }; 
  },

}
</script>

<style scoped>

</style>
