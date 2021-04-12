<template>
  <vs-row justify="space-between" align="flex-end">

    <vs-row justify="center" class="logo">
      <a href="/"><img src="/images/template/l.png" class="logoimg" alt="Формы для пряников"></a>
    </vs-row>  

    <div>
      <vs-input placeholder="Поиск" class="search">
        <template #icon>
          <i class='bx bx-search'></i>
        </template>
      </vs-input>
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

<style scoped>
  .logo {
    width: 270px;
  }

  .logoimg {
    width: 100px;
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