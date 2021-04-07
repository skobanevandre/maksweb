<template>
  <div>
    <adminTitle>КАТЕГОРИИ ТОВАРОВ</adminTitle>

    <div class="adminTopBar">
      <div class="adminTopBarLeft">

        <vs-button flat @click="newDialog=true">
          <i class="bx bx-plus" style="margin-right: 10px;"/>
          Добавить
        </vs-button>
        <vs-button flat :disabled=!selected @click="$router.push( '/admin/category/' + selected.id )">
          <i class="bx bx-edit" style="margin-right: 10px;"/>
          Редактировать
        </vs-button>
        <vs-button flat danger :disabled=!selected @click="deleteDialog=!deleteDialog">
          <i class="bx bx-trash" style="margin-right: 10px;"/>
          Удалить
        </vs-button>
      </div>

      <div class="adminTopBarRight"> 

        <vs-input v-model="filterCategory" placeholder="Поиск">
          <template #icon>
            <i class='bx bx-search'></i>
          </template>
        </vs-input>

      </div>  
    </div>
    
    <vs-table striped v-model="selected">
      <template #thead>
        <vs-tr>
          <vs-th>#</vs-th>
          <vs-th>Наименование</vs-th>
          <vs-th>Родительская Категория</vs-th>
          <vs-th>Описание</vs-th>
        </vs-tr>
      </template>

      <template #tbody>
        <vs-tr
          v-for="(category, i) in filteredCategories"          
          :key="i"
          :data="category"
          :is-selected="selected == category"
        >
          <vs-td>{{ category.id }}</vs-td>
          <vs-td>{{ category.name }}</vs-td>
          <vs-td>{{ category.parentname }}</vs-td>
          <vs-td>{{ category.description }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
    
    <!-- Удаление -->

    <vs-dialog prevent-close v-model="deleteDialog" blur>
      <template #header>
        Удаление категории:
      </template>

      <div>
        <span style="display: flex; justify-content: center; font-size: 1.1em; margin-bottom: 10px;">
          Удалить категорию
        </span>

        <span style="display: flex; justify-content: center;">
          № {{  selected ? selected.id : null }} - {{  selected ? selected.name : null }} ?
        </span>
      </div>

      <template #footer>
        <div class="rowright">
          <vs-button @click="delCategory( selected )"> 
            <i class="bx bx-check" style="margin-right: 10px;"/>
            Да
          </vs-button>
          <vs-button @click="deleteDialog=!deleteDialog">
            <i class="bx bx-x" style="margin-right: 10px;"/>
            Отмена
          </vs-button>
        </div>  
      </template>      
    </vs-dialog>  

    <!-- Создание -->

    <vs-dialog prevent-close v-model="newDialog" blur width="100%">
      <template #header>
        Добавление категории
      </template>

      <div style="padding: 30px 30px 0 30px;">
        <vs-input label-placeholder="Наименование" v-model="cat.name"  style=" margin-bottom: 40px;"/>
        
        <vs-select 
          label-placeholder="Родительская категория" 
          v-model="cat.parentcategory" 
          style=" margin-bottom: 40px; width: 100%;"
        >
          <vs-option 
            v-for = "sel_category in categories"
            :label = "sel_category.name" 
            :value = "sel_category.id"
            :key = "sel_category.id" 
          >
            {{ sel_category.name }}
          </vs-option>
        </vs-select>

        <vs-input type="textarea" label-placeholder="Описание" v-model="cat.description"  style=" margin-bottom: 40px;"/>
      </div>

      <template #footer>
        <div class="rowright">
          <vs-button @click="newCategory( cat )"> 
            <i class="bx bx-check" style="margin-right: 10px;"/>
            Применить
          </vs-button>
          <vs-button @click="newDialog=false">
            <i class="bx bx-x" style="margin-right: 10px;"/>
            Отмена
          </vs-button>
        </div>  
      </template>      
    </vs-dialog>  

    <pre>{{ selected }} </pre>

    
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      selected: null,
      searchString: '',
      filteredCategories: '',
      deleteDialog: false,
      newDialog: false,
      editDialog: false,

      editSelected: {
        name: '',
        parentcategory: '',
        description: '',        
      },

      cat: {
        name: '',
        parentcategory: '',
        description: '',
      },
      insertSuccess: '',
    }
  },

  async asyncData({ params, $axios }) {
    const categories = await $axios.$get( `/category` );
    return { 'categories' : categories }; 
  },

  computed: {
    filterCategory: {
      get: function() {
        if ( !this.searchString ) 
          this.filteredCategories = this.categories;
        else 
          this.filteredCategories = this.categories.filter( 
            category => {
              if ( category.id == this.searchString ) return true;
              if ( category.name && category.name.toUpperCase().includes( this.searchString.toUpperCase() ) ) return true;
              if ( category.parentname && category.parentname.toUpperCase().includes( this.searchString.toUpperCase() ) ) return true;
              if ( category.description && category.description.includes( this.searchString ) ) return true;
            }
          )
        return this.searchString;        
      },

      set: function( val ) {
        this.searchString = val;              
      },
    }, // filterCategory
  }, // computed

  methods: {
    async delCategory( category ) {
      await this.$axios.$delete(  `/category/${category.id}` )
        .then( response => { 
          if ( response.success ) {
            this.deleteDialog=false;
            sessionStorage.delcat = true; 
            this.$router.go();
          }
        } )
     }, //delCategory

    async newCategory( newCategory ) {
      await this.$axios.$post( `/category`, newCategory )
        .then( response => { 
          if ( response.success ) {
            sessionStorage.newcat = true; 
            this.$router.go();
          } 
        } 
      );
    }, //newCategory

    async editCategory( category ) {
      await this.$axios.$put( `/category`, category )
        .then( response => { 
          if ( response.success ) {
            sessionStorage.editcat = true; 
            this.$router.go();
          } 
        } );
      this.editDialog=false;
      this.$router.go();
    }, //newCategory

    editCategoryClick ( selected ) {
      this.editSelected = Object.assign( {}, selected );
      this.editDialog = true;
    },

    newCatNotification() {
      const noti = this.$vs.notification({
            position: 'top-right',
            color: 'success',
            title: 'Поздравляем !!!!',
            text: `Вы добавили новый элемент в список категорий.`
          })
    },

    editCatNotification() {
      const noti = this.$vs.notification({
            position: 'top-right',
            title: 'Поздравляем !!!!',
            text: `Вы отредактировали категорию.`
          })
    },

    delCatNotification() {
      const noti = this.$vs.notification({
            color: 'danger',
            position: 'top-right',
            title: 'Жаль ((((',
            text: `Вы удалили возможно очень нужную категорию. Обратно ее не восстановишь. В следующий раз подумайте Семь раз чтобы не повторять своих ошибок.`
          })
    },
    
    problemNotification() {
      const noti = this.$vs.notification({
            color: 'danger',
            position: 'top',
            title: 'Внимание !!!!',
            text: `Возникли проблемы с обработкой запроса. Попробуйте еще раз. Если ошибка не исчезнет, свяжитесь пожалуйста с администратором сайта.`
          })
    } 
  }, // methods

  mounted() {
    if ( sessionStorage.newcat ) {
      this.newCatNotification();
      sessionStorage.removeItem( 'newcat' );
    }

    if ( sessionStorage.editcat ) {
      this.editCatNotification();
      sessionStorage.removeItem( 'editcat' );
    }

    if ( sessionStorage.delcat ) {
      this.delCatNotification();
      sessionStorage.removeItem( 'delcat' );
    }

  },

}
</script>