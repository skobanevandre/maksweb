<template>
  <div>
    <vs-sidebar relative open square v-model="active">
        <template #logo>
          <center><h2>АДМИНКА</h2></center>
          <img src="/images/template/logo.png">
        </template>

        <vs-sidebar-item id="home" to="/admin">
          <template #icon><i class='bx bx-home'></i></template>
          Главная
        </vs-sidebar-item>

        <vs-sidebar-item id="market">
          <template #icon><i class='bx bx-user'></i></template>
          Пользователи
        </vs-sidebar-item>

        <vs-sidebar-item id="menu">
          <template #icon><i class='bx bx-menu'></i></template>
          Меню
        </vs-sidebar-item>

        <vs-sidebar-item id="category" to="/admin/category">
          <template #icon><i class='bx bx-category' ></i></template>
          Категории
        </vs-sidebar-item>

        <vs-sidebar-item id="item" to="/admin/item">
          <template #icon><i class='bx bx-task'></i></template>
          Товары
        </vs-sidebar-item>

        <vs-sidebar-item id="pages" >
          <template #icon><i class='bx bx-book-open'></i></template>
          Страницы
        </vs-sidebar-item>

        <vs-sidebar-item id="settings" to="/admin/settings">
          <template #icon><i class='bx bxs-cog'></i></template>
          Настройки
        </vs-sidebar-item>

        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar>
              <img src="" alt="">
            </vs-avatar>
            <div>
              <b>{{ $auth.user }}</b>

              <router-link to="/admin/logout">
                <vs-button size="small">Выйти</vs-button>
              </router-link>
            </div>
          </vs-row>
        </template>

      </vs-sidebar>
</div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.path
    }
  },

  mounted() {
    console.log( this.$auth );
  }
}
</script>