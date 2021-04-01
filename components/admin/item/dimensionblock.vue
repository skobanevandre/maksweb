<template>
      <vs-row class="margin-top" justify="space-between">

      <div class="v-center margin-right col">
        <span>Высота:</span>
        <vs-input type="number" style="width: 150px;" v-model="$attrs.item.dimensions.height" />
      </div>

      <div class="v-center margin-right col">
        <span>Ширина:</span>
        <vs-input type="number" style="width: 150px;" v-model="$attrs.item.dimensions.width" />
      </div>

      <div class="v-center margin-right col">
        <span>Глубина:</span>
        <vs-input type="number" style="width: 150px;" v-model="$attrs.item.dimensions.deep" />
      </div>

      <div class="v-center margin-right col">
        <span>Вес:</span>
        <vs-input type="number" style="width: 150px;" v-model="$attrs.item.dimensions.weight" />
      </div>

    </vs-row>
</template>

<script>
export default {
  model: {
    prop: 'item',
  }
}
</script>