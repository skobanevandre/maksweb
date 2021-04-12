<template>
  <div>
    <vs-sidebar relative open notShadow v-model="active">

      <template #logo>
        <img src="/images/template/logo.png">

        <vs-row justify="center" class="margin-top">
          <vs-button icon >
            <i class='bx bx-cart' style="font-size: 1.5em;" />
          </vs-button>

          <vs-button icon >
            <i class='bx bx-user' style="font-size: 1.5em;" />
          </vs-button>
        </vs-row>

      </template>

      <vs-sidebar-group 
        v-for = "( category, i ) in navCategories"
        :key = "i" 
        :id = "category.id"
        v-if = "category.child.length > 0"
        >

        <template #header>
          <vs-sidebar-item arrow :id="category.id.toString()">
            <template #icon><i class='bx bx-cookie' /></template>
            {{ category.name }}
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item 
          v-for = "( child, i ) in category.child"
          :key = "i" 
          :id = 'child.id.toString()'>
          <template #icon><div style="margin-left: 15px"><i class='bx bx-cookie' /></div></template>          
          {{ child.name }}
        </vs-sidebar-item>
      </vs-sidebar-group>  

      <vs-sidebar-item v-else :id = "category.id.toString()" >
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