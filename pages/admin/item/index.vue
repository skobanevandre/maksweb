<template>
  <div>
    <adminTitle>СПИСОК ТОВАРА</adminTitle>

    <div class="adminTopBar">
      <div class="adminTopBarLeft">

        <vs-button flat @click="newItem">
          <i class="bx bx-plus" style="margin-right: 10px;"/>
          Добавить
        </vs-button>
        <vs-button flat :disabled=!selected >
          <i class="bx bx-edit" style="margin-right: 10px;"/>
          Редактировать
        </vs-button>
        <vs-button flat danger :disabled=!selected >
          <i class="bx bx-trash" style="margin-right: 10px;"/>
          Удалить
        </vs-button>
      </div>

      <div class="adminTopBarRight"> 

        <vs-input v-model="searchString" placeholder="Поиск">
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
          <vs-th>Данные</vs-th>
        </vs-tr>
      </template>

      <template #tbody>
        <vs-tr
          v-for="(item, i) in items"          
          :key="i"
          :data="item"
          :is-selected="selected == item"
        >
          <vs-td style="text-align: center;">
            <img :src="item.titleimage" width="150" >
          </vs-td>

          <vs-td style="width: 100%;">
          
            <div style="margin-bottom: 10px;"> 
              {{ item.article }} :: <b>{{ item.title }}</b>
            </div> 

            <div style="margin-bottom: 10px; display: flex; justify-content: flex-start; align-items: center;">
              <vs-button transparent :href="editHref( item.article )">Редактировать</vs-button>
                <span> | </span>
              <vs-button transparent @click="currentItem = item; duplicateDialog = true;">Дублировать</vs-button>
                <span> | </span>
              <vs-button transparent @click="currentItem = item; deleteDialog = true;">Удалить</vs-button>
            </div>
               
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <!-- duplicateDialog -->

    <vs-dialog v-model="duplicateDialog" >
      <template #header>
        <h4>Продублировать товар ?</h4>
      </template>

      <vs-row direction="column" align="center">
        <img :src="currentItem.titleimage" width="300" class="margin-bottom">
        <div><strong>{{ currentItem.title }} </strong></div>
      </vs-row>  
     
      <template #footer>
        <vs-row justify="flex-end">
          <vs-button @click="duplicateItem">Продублировать</vs-button>
          <vs-button @click="duplicateDialog=false;">Отмена</vs-button>       
        </vs-row>
      </template>
    </vs-dialog>

    <!-- deleteDialog -->

    <vs-dialog v-model="deleteDialog" >
      <template #header>
        <div class="deletedialog">
          <center><h4>Удалить товар ?</h4></center>
          <center><h4>Артикул № {{ currentItem.article }}</h4></center>
        </div>  
      </template>

      <vs-row direction="column" align="center">
        <img :src="currentItem.titleimage" width="300" class="margin-bottom">
        <div><strong>{{ currentItem.title }} </strong></div>
      </vs-row>  
     
      <template #footer>
        <vs-row justify="flex-end">
          <vs-button @click="deleteItem">Удалить</vs-button>
          <vs-button @click="deleteDialog=false;">Отмена</vs-button>       
        </vs-row>
      </template>
    </vs-dialog>

  </div>
</template>

<script>
import mixin from '@/mixins/item';
export default {
  layout: 'admin',

  mixins: [ mixin ],

  data() {
    return {
      selected: null,
      searchString: '',
      duplicateDialog: false,
      deleteDialog: false,
      currentItem: {
        titleImage:'',
        title:'',
      },
    }
  },

  methods: {

    async newItem( ) {
      let newArticle = await this.$axios.$post( '/item/', this.emptyItem() );
      this.$router.push( '/admin/item/' +  newArticle.article );
    },

    editHref( article ) {
      return '/admin/item/' + article
    },

    async duplicateItem( ) {
      await this.$axios.$post( '/item/', this.currentItem );
      this.$router.go();
    },

    async deleteItem( ) {
      await this.$axios.$delete( '/item/' + this.currentItem.article );
      this.$router.go();
    },

  },

  async asyncData({ params, $axios }) {
    const items = await $axios.$get( `/item` );
    return { 'items' : items }; 
  },

}
</script>

<style scoped>
  .deletedialog { 
    width: 100%; 
    height: 100%; 
    background-color: darkred;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>