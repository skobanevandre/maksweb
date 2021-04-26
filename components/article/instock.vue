<template>
  <div style="font-weight: bold; font-size: 1.2em;">
    <span v-if = "item.ordered.id == 1" style="color: green;">В наличии</span>
    <span v-if = "item.ordered.id == 2" style="color: brown;">Под заказ</span>
    <span v-if = "item.ordered.id == 3" style="color: red;">Осталось {{ item.ordered.val }} шт</span>
  </div>  
</template>

<script>
export default {
  model: {
    prop: 'item',
  },

  data() {
    return {
      item: this.$attrs.item,
    }
  },
}
</script>

<style scoped>

</style>