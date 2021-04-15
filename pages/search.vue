<template>
  <div>
    <vs-row justify="center" align="center">
      <vs-input v-model="searchString" />
      <vs-button @click="search()" class="margin-right">ПОИСК</vs-button>
      <span style="margin-right: 5px;">Сортировка:</span>
      <vs-select v-model="sort" style="width: 250px;" class="margin-right">
        <vs-option value="1" label="По возрастанию цены">По возрастанию цены</vs-option>
        <vs-option value="2" label="По убыванию цены">По убыванию цены</vs-option>
        <vs-option value="3" label="По хрен знает как">По хрен знает как</vs-option>
      </vs-select>
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
      sort: '1',
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