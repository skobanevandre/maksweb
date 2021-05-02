<template>
  <div class="margin-top">
    <vs-row class="topBlock" justify="center" align="center">
      <i class='bx bx-menu' style="margin-right: 10px; font-size: 1.2em;"/>
      КАТАЛОГ ТОВАРОВ
    </vs-row>

    <vs-input 
      class="margin-top search" 
      placeholder="Поиск..." 
      v-model="searchString" 
      @keyup.enter="search( searchString )" 
      v-if = "$route.path != '/search'" 
    >
      <template #icon><i class='bx bx-search' /></template>
    </vs-input>

    <vs-sidebar relative open notShadow v-model="active">

      <vs-sidebar-group 
        v-for = "( category, i ) in navCategories"
        :key = "i" 
        :id = "category.id"
        v-if = "category.child.length > 0"
        >

        <template #header>
          <vs-sidebar-item arrow :id="category.id.toString()" >
            <template #icon><i class='bx bx-cookie' /></template>
            {{ category.name }}
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item 
          v-for = "( child, i ) in category.child"
          :key = "i" 
          :id = 'child.id.toString()'
          :to = "'/category/' + child.id">
          <template #icon><div style="margin-left: 15px"><i class='bx bx-cookie' /></div></template>          
          {{ child.name }}
        </vs-sidebar-item>
      </vs-sidebar-group>  

      <vs-sidebar-item v-else 
        :id = "category.id.toString()" 
        :to = "'/category/' + category.id" >
        <template #icon><i class='bx bx-cookie' /></template>
        {{ category.name }}
      </vs-sidebar-item>
      
    </vs-sidebar>

  </div>
</template>

<script>
export default {

  data() {
    return {
      categories: [],
      active: '',
      searchString: '',
    }
  },

  async fetch() {
    this.categories = await this.$axios.$get('/category');
  },

  methods: {

    childCategories( parentCategory ) {
      let cats = [];

      for ( let category of this.categories ) {
        if ( category.parentcategory == parentCategory ) {
          cats.push( category );
        }
      }
      return cats;
    },

    search( val ) {
      if ( val.length > 2 ) {
        this.$router.push({ path:'/search', query:{ searchstring: val } } );
        this.searchString = '';
      } else 
        alert( 'минимум 3 символа въ поиске' );
    },

  },

  computed: {

    navCategories() {
      let topContent = this.childCategories( 1 );
      
      for ( let topItem of topContent ) 
        topItem.child = this.childCategories( topItem.id );
      
      return topContent; 
    },


     
  },

}
</script>

<style scoped>
  .topBlock {
    background-color: #7c483c;
    color: white;
    height: 50px;
    font-weight: bold;
    font-size: 1.1em;
  }

  .search {
    border: 1px solid silver; 
    border-radius: 10px;
  }
</style>