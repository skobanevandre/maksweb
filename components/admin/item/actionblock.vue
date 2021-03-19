<template>
  <vs-row justify="space-between" align="center">

    <vs-switch v-model="setActive" style="pointer-events: auto;">
      <i class='bx bx-check-double'></i>
    </vs-switch>

    <vs-switch v-model="setIndexPage" style="pointer-events: auto;">На Главной</vs-switch>

    <div>
      <AdminItemActionInstock />
    </div>

    <vs-checkbox style="pointer-events: auto;">Выбор</vs-checkbox>
  </vs-row>
</template>

<script>
export default {
  props: [
    'item'
  ],

  data() {
    return {
      active: Boolean( this.item.active ),
      indexPage: Boolean( this.item.indexpage ),
    }
  },

  computed: {
    setActive: {
      async set( val ) {
        this.item.active = !this.item.active
        await this.$axios.$put( `/item`, { item: this.item } );
        this.$vs.notification({
          position: 'top-right',
          color: 'rgb(75,118,112)',
          title:  
            !this.item.active ? 
              `Вы успешно деактивировали товар.`
              :
              `Вы успешно активировали товар.`,
          text: 
            !this.item.active ? 
              `Следите за товаром надлезжайшим образом, ибо он может в очень скором времени понадобиться.`
              :
              `Теперь он будет показываться в списках категорий и возможно, если только очень этого захотитеи нажмете на соответствующую кнопку, то и на главной странице. Всего хорошоего до новых встреч.`,
        })
      },
      get() {
        return this.active ;
      }
    },

    setIndexPage: {
      async set( val ) {
        this.item.indexpage = !this.item.indexpage
        await this.$axios.$put( `/item`, { item: this.item } );
        this.$vs.notification({
          position: 'top-right',
          color: 'rgb(75,118,112)',
          title:  
            !this.item.indexpage ? 
              `Теперь товар на главной странице.`
              :
              `Вы убрали товар с главной страницы.`,
          text: 
            !this.item.indexpage ? 
              `Вы успешно поставили товар на отображение на главной странице. Теперь он будет там отображаться. .`
              :
              `Теперь товар не будет отображатьсся на главной странице. Больше так не делайте. Больше контента на главной - больше информации приходится читать. Запомните это. Искренне ваш - САЙТ !`,
        })
      },
      get() {
        return this.indexPage;
      }
    }

  }, // Computed

  methods: {

  }
}
</script>