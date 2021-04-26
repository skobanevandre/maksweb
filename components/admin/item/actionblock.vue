<template>
  <vs-row justify="space-between" align="center" class="margin-top">

    <vs-row justify="flex-start" align="center" class="margin-right wdt">
      <span class="margin-right">Активен:</span>
      <vs-switch  v-model="itemActive" />
    </vs-row>

    <vs-row justify="flex-start" align="center" class="margin-right wdt">
      <span class="margin-right">На главной:</span>
      <vs-switch v-model="itemIndexpage" />
    </vs-row>

    <div class="margin-right wdt">
      <admin-item-instock v-model="$attrs.item" class="wdt" /> 
    </div>

    <div class="margin-right wdt">
      <admin-item-pricing v-model="$attrs.item" class="wdt" /> 
    </div>

  </vs-row>
</template>

<script>
export default {
  model: {
    prop: 'item',
  },

  computed:{
    itemActive: {
      get() {
        return Boolean( this.$attrs.item.active );
      },
      set( val ) {
        this.$attrs.item.active = Number( val );
      }
    },

    itemIndexpage: {
      get() {
        return Boolean( this.$attrs.item.indexpage );
      },
      set( val ) {
        this.$attrs.item.indexpage = Number( val );
      }
    }
  },

}
</script>

<style scoped>
.wdt {
  width: 200px;
}
</style>