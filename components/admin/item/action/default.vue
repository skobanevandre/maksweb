<template>
  <vs-select v-model="doAction" style="width: 100%; margin-top: 6px;">
    <vs-option label=" ... " value="0"> ... </vs-option>
    <vs-option label="Дублировать" value="1">Дублировать</vs-option>
    <vs-option label="Редактировать" value="2">Редактировать</vs-option>
    <vs-option label="Удалить" value="3">Удалить</vs-option>
  </vs-select>
</template>

<style scoped>

</style>

<script>
export default {

  props: {
    item: Object,
  },

  computed: {
    doAction:{
      
      get() {
        return 0;
      },
      
      set( val ) {
        // if ( val == '2' ) this.$router.push( { path: '/admin/itemedit', params: { id : this.item.id } } );
        if ( val == '2' ) this.$router.push( '/admin/item/' + this.item.article );

      }

    }
  }

}
</script>