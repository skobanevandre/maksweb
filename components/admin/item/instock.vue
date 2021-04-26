<template>
  <vs-row justify="flex-start" align="center">
    <vs-select v-model="$attrs.item.ordered.id" style="width: 250px; margin-right: 10px;">
      <vs-option label="В наличии" value="1" >В наличии</vs-option>
      <vs-option label="Под заказ" value="2" >Под заказ</vs-option>
      <vs-option label="Осталось" value="3" >Осталось</vs-option>
    </vs-select>

    <vs-input v-if = "$attrs.item.ordered.id == 3" class="nearInput" v-model="$attrs.item.ordered.val"></vs-input>
    <span v-if = "$attrs.item.ordered.id == 3">шт</span>
  </vs-row>  
</template>

<script>
export default {

  model: {
    prop: 'item'
  },

}
</script>

<style scoped>
  .nearInput {
    width: 80px; 
    pointer-events: auto; 
    margin-right: 10px;
  }
</style>