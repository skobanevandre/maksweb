<template>
  <div style="margin-top: 20px;">
    <span 
      v-for="( category, i) in categories "
      :key="i"
    > {{ category.name }}
      <div class="cards">
        <card 
          v-for="( item, j) in category.items"
          :key="j"
          :title="item.title" 
          :image="item.titleimage" 
          :price="259" 
          :url="item.article" />
      </div>
    </span>

  </div>  
</template>

<script>
export default {

  async asyncData({ params, $axios }) {
    const categories = await $axios.$get( `/indexpage` );
    return { 'categories' : categories }; 
  },
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

