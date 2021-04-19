<template>
  <div>
    <vs-row justify="center" align="center">

      <vs-input v-model="searchString" @keyup.enter="search()" />

      <vs-button @click="search()" class="margin-right">ПОИСК</vs-button>

      <span style="margin-right: 5px;">Сортировка:</span>
      <vs-select v-model="sort" style="width: 250px;" class="margin-right" @change="doSort()">
        <vs-option value="1" label="Рекомендуемые">Рекомендуемые</vs-option>
        <vs-option value="2" label="По возрастанию цены">По возрастанию цены</vs-option>
        <vs-option value="3" label="По убыванию цены">По убыванию цены</vs-option>
      </vs-select>

    </vs-row>
    <vs-hr />  

    <vs-row v-if="items.length == 0" justify="center" align="center">
      <h2>Вы явно не то  ищите... нет у меня такого :)</h2>
    </vs-row>

    <vs-row v-else justify="flex-start" align="center">
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
      this.doSort();
      this.$router.push({ path:'/search', query:{ searchstring: this.searchString } } )      
    },

    doSort( ) {
      switch( this.sort ) {
        case '1': // Сначала Рекомендуемые ( самые продаваемые )
          this.items.sort( ( a, b ) => ( a.sold < b.sold && 1 ) || ( a.sold > b.sold && -1 ) || 0 );
          break;
        case '2': // По возрастанию цены
          this.items.sort( ( a, b ) => ( a.price.standart < b.price.standart && -1 ) || ( a.price.standart > b.price.standart && 1 ) || 0 );
          break;
        case '3': // По убыванию цены
          this.items.sort( ( a, b ) => ( a.price.standart < b.price.standart && 1 ) || ( a.price.standart > b.price.standart && -1 ) || 0 );
          break;
      }
    },

  },

    afterRouteUpdate(to, from, next) {
      this.searchString = this.$route.query.searchstring; 
    next();
  },

  mounted() {
    console.log( 'search page mounted' )
    if ( this.$route.query.searchstring ) {
      this.searchString = this.$route.query.searchstring;
      this.search();  
    }  
  },
}
</script>