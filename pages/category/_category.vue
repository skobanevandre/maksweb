<template>
  <div class="margin-top">
    <titletext class="center">{{ category.name }}</titletext>
    <div class="cards margin-top">
      <card 
        v-for="( item, j) in items"
        :key="j"
        :item="item" />
    </div>

  </div>  
</template>

<script>
export default {

  async asyncData({ params, $axios }) {
    const result = await $axios.$get( '/categoryitems/' + params.category );
    return { 'items' : result.items, 'category': result.category[0] }; 
  },
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>

