<template>
  <div>
    <vs-navbar v-model="activeNav" notLine>

      <template #left>
        <img src = "/images/template/logo.png" class="logo" >
      </template>

      <vs-navbar-item :active="activeNav == 'index'" id="index" to="/">
        Главная
      </vs-navbar-item>

      <vs-navbar-item :active="activeNav == 'forms'" id="forms">
        Формы для пряников
      </vs-navbar-item>

      <vs-navbar-item :active="activeNav == 'package'" id="package">
        Упаковка
      </vs-navbar-item>

      <vs-navbar-item :active="activeNav == 'cheftools'" id="cheftools">
        Инструменты кондитера
      </vs-navbar-item>

      <vs-navbar-item :active="activeNav == 'decor'" id="decor">
        Декор
      </vs-navbar-item>

      <vs-navbar-item :active="activeNav == 'masterclasses'" id="masterclasses">
        Мастер-классы
      </vs-navbar-item>

      <vs-navbar-item :active="activeNav == 'contacts'" id="contacts">
        Контакты
      </vs-navbar-item>

    </vs-navbar>  
  </div>  

</template>

<script>
export default {
  data() {
    return {
      activeNav: '',
    }
  }
}
</script>

<style scoped>
  .logo {
    width: 150px;
  }
</style>