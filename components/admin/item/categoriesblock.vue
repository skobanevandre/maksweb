<template>
  <div>
  <vs-row justify="flex-start" wrap="wrap" class="margin-top">
    <div v-for = "( category, i ) in categories" :key="i" style="width: 33%;">  
      <vs-row justify="flex-start" align="center" style="margin-bottom: 10px;">
        <div style=" width: 50px; margin-right: 10px;">
          <vs-checkbox v-model="$attrs.item.categories" :val="category" />
        </div> 
        <div style="">
          {{ category.name }}
        </div> 
      </vs-row>  
    </div>
  </vs-row>  

  </div>
</template>

<script>
export default {
  model: {
    prop: 'item',
  },

  data() {
    return {
      categories: [],
    }
  },

  async mounted() {
    this.categories = await this.$axios.$get( `/category` );
  },
  
}
</script>

<style scoped>
  .categoriesblock {
  border: 1px dotted #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
}

.categoryItem {
  flex-grow:1;
}
</style>