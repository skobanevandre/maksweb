<template>
      <div class="categoriesblock margin-top">
      <div 
        v-for="( category, i ) in categories"
        :key= "i"
        class="categoryItem" >
        <vs-checkbox  :val="category.id.toString()" >{{ category.name }}</vs-checkbox>
      </div>
    </div>

</template>

<script>
export default {
  model: {
    prop: 'item',
    event: 'change'
  },

  data() {
    return {
      categories: [],
    }
  },

  async mounted() {
    this.categories = await this.$axios.$get( `/category` );

  }
  
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