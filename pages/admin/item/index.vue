<template>
  <div>
    <adminTitle>СПИСОК ТОВАРА</adminTitle>

    <div class="adminTopBar">
      <div class="adminTopBarLeft">

        <vs-button flat >
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
            <img :src = item.image style="width: 150px;; border-radius: 20px;">
            <admin-item-action-default :item="item" />
          </vs-td>

          <vs-td style="width: 100%;">
            <div @click = "selected = item" style="margin-bottom: 10px;"> 
              {{ item.article }} :: <b>{{ item.title }}</b>
            </div>
            <div @click = "selected = item">
              Категория: {{ item.category }}
            </div>  

            <AdminItemPriceblock :item = "item" style="pointer-events: none; margin-bottom: 10px;" />           
            <AdminItemActionblock :item = "item" style="pointer-events: none;" />

          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    

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
    }
  },

  async asyncData({ params, $axios }) {
    const items = await $axios.$get( `/item` );
    return { 'items' : items }; 
  },

}
</script>