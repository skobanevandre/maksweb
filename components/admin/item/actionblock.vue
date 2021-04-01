<template>
  <vs-row justify="space-between" class="margin-top">

    <div class="rowleft v-center margin-right">
      <span class="margin-right">Активен:</span>
      <vs-switch  v-model="itemActive" />
    </div>

    <div class="rowleft v-center margin-right">
      <span class="margin-right">На главной:</span>
      <vs-switch v-model="itemIndexpage" />
    </div>

    <div class="rowleft v-center margin-right">
      <admin-item-instock v-model="$attrs.item" /> 
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