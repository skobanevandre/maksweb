<template>
  <div>
    <vs-select v-model="item.price.current">
      <vs-option value="0" label="Стандартная цена">Стандартная цена</vs-option>
      <vs-option value="1" label="Скидка">Скидка</vs-option>
      <vs-option value="2" label="Распродажа">Распродажа</vs-option>
      <vs-option value="3" label="Ликвидация">Ликвидация</vs-option>
    </vs-select>
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
  }
}
</script>