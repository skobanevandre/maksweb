<template>
  <vs-row justify="space-between" align="flex-end">

    <vs-row justify="center" class="logo">
      <a href="/"><img src="/images/template/l.png" class="logoimg" alt="Формы для пряников"></a>
    </vs-row>  

    <div>
      <vs-row justify="flex-start">
        <vs-input placeholder="Поиск" class="search" v-model="searchString" @keyup.enter="search( searchString )">
          <template #icon>
            <i class='bx bx-search'></i>
          </template>
        </vs-input>
        <vs-button icon @click="search( searchString )">
          <i class='bx bx-search'></i>
        </vs-button>
      </vs-row>
    </div>  

    <vs-row justify="flex-end" align="center" class="user">

      <vs-button border class="fav">
          <i class='bx bx-heart'/>
      </vs-button>

      <vs-button border class="cart">
          <i class='bx bx-cart' style="margin-right: 10px;"/>
          0 / 0₽
      </vs-button>

    </vs-row>

  </vs-row>
</template>

<script>
export default {
  data() {
    return {
      searchString: '',
    }
  },

  methods: {
    search( val ) {
      if ( val.length > 2 ) {
        this.$router.push({ path:'/search', query:{ searchstring: val } } );
        this.searchString = '';
      } else 
        alert( 'минимум 3 символа въ поиске' );
    },
  },
}
</script>

<style scoped>
  .logo {
    width: 270px;
  }

  .logoimg {
    width: 230px;
  }

  .user {
    width: 200px;
  }

  .headerContent {
    width: 250px;
  }

  .cart{
    font-size: 1.2em;
    font-weight: bold;
    margin: 0px;
  }

  .search {
    border: 1px solid silver;
    border-radius: 10px;
    width: 500px;
  }

  .fav {
    font-size: 1.5em;
    font-weight: bold;
  }

</style>