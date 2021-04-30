<template>
  <div>
    <h1 class="center">Избранное</h1>

    <div class="cards margin-top">
      <card 
        favorites="true"
        v-for="( item, j) in items"
        :key="j"
        :item="item" />
    </div>

  </div>    
</template>

<script>
export default {
  data() {
    return {
    }
  },

  computed: {

    items() {
      return this.$store.getters[ "favorites/items" ];
    }

  },

  mounted() {

  }
}
</script>

<style scoped>
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
</style>