<template>
  <vs-input class="margin-top" v-model="$attrs.item.title"/>
</template>

<script>
export default {
  model: {
    prop: 'item',
  }


}
</script>