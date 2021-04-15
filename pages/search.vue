<template>
  <div>
    <vs-row justify="flex-start" align="center">
      <vs-input v-model="searchString" />
      <vs-button @click="search()">ПОИСК</vs-button>
    </vs-row>
    <vs-hr />  

    <vs-row justify="flex-start" align="center">
      <card 
        v-for="( item, j) in items"
        :key="j"
        :title="item.title" 
        :image="item.titleimage" 
        :price="item.price.standart" 
        :url="item.article" />
    </vs-row>

    <pre> {{ $data }} </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchString: '',
      items: [],
    }
  },

  methods: {
    async search() {
      if ( this.searchString.length == 0 ) {
        this.items=[];
        return;
      }  
      this.items = await this.$axios.$get( '/search', { params:{ searchstring: this.searchString } } );
      this.$router.push({ path:'/search', query:{ searchstring: this.searchString } } )      
    }
  },

  mounted() {
    if ( this.$route.query.searchstring ) {
      this.searchString = this.$route.query.searchstring;
      this.search();  
    }  
  },
}
</script>