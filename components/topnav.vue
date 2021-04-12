<template>
  <vs-row class="navBlock margin-top margin-bottom" justify="center" align="center">
    <a href="/" class="margin-right">Главная</a>
    <a href="/" class="margin-right">Как заказать</a>
    <a href="/" class="margin-right">Доставка</a>
    <a href="/" class="margin-right">Оплата</a>
    <a href="/" class="margin-right">Контакты</a>
  </vs-row>
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

  .navBlock {
    background-color: #7c483c;
    height: 50px;
    font-weight: bold;
    font-size: 1.1em;
  }
  
  a {
    color: white;
    text-decoration: none;;
  }

</style>