<template>
  <div class="margin-top">
    <titletext class="center">{{ category.name }}</titletext>
    
    <vs-row justify="center" align="center" class="margin-top">
      <span class="margin-right">Сортировать по: </span>
      <vs-select v-model="sort" class="sort" @change="doSort()">
        <vs-option label="Рекомендуемые" value="0">Рекомендуемые</vs-option>
        <vs-option label="Возрастанию цены" value="1">Возрастанию цены</vs-option>
        <vs-option label="Убыванию цены" value="2">Убыванию цены</vs-option>
      </vs-select>
    </vs-row>
    
    <div class="cards margin-top">
      <card 
        v-for="( item, j ) in ritems"
        :key="j"
        :item="item" />
    </div>

  </div>  
</template>

<script>

export default {

  data() {
    return {
      sort: '0',
      ritems: [],
    }
  },

  methods: {

    doSort( ) {
      switch( this.sort ) {
        case '0':
          this.ritems.splice( 0, this.ritems.length );
          this.$nextTick( () => {
            this.ritems = Object.assign( [], this.items.sort( ( a, b ) => ( Number( a.sold ) < Number( b.sold ) && 1 ) || ( Number( a.sold ) > Number( b.sold ) && -1 ) || 0 ) ); 
          } );  
        break;

        case '1': 
          this.ritems.splice( 0, this.ritems.length );
          this.$nextTick( () => {
            this.ritems = Object.assign( [], this.items.sort( ( a, b ) => ( Number( a.price.standart ) > Number( b.price.standart ) && 1 ) || ( Number( a.price.standart ) < Number( b.price.standart ) && -1 ) || 0 ) ); 
          } );  
        break;

        case '2': 
          this.ritems.splice( 0, this.ritems.length );
          this.$nextTick( () => {
            this.ritems = Object.assign( [], this.items.sort( ( a, b ) => ( Number( a.price.standart ) < Number( b.price.standart ) && 1 ) || ( Number( a.price.standart ) > Number( b.price.standart ) && -1 ) || 0 ) ); 
          } )  
        break;
      }
    },

  },

  mounted( ) {
    this.doSort();
  },

  async asyncData({ params, $axios }) {
    const result = await $axios.$get( '/categoryitems/' + params.category );
    return { 'items' : result.items, 'category': result.category[0] }; 
  },
}
</script>

<style scoped>
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .sort {
    width: 200px;  
  }
</style>

