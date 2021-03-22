<template>
  <vs-row justify="flex-start" align="center">
    <vs-select v-model="instock" style="pointer-events: auto; width: 150px; margin-right: 10px;">
      <vs-option label="В наличии" value="1">
        В наличии
      </vs-option>

      <vs-option label="Осталось" value="2">
        Осталось
      </vs-option>

      <vs-option label="Под заказ" value="3">
        Под заказ
      </vs-option>
    </vs-select>

    <vs-input v-if = "instock == 2" style="width: 80px; pointer-events: auto; margin-right: 10px;"></vs-input>
    <span v-if = "instock == 2" style="margin-right: 10px;">шт</span>
  </vs-row>  
</template>

<script>
export default {
  data() {
    return {
      instock: 1 
    }
  }
}
</script>