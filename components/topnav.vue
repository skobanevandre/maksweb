<template>
  <vs-row class="navblock" justify="center" align="center">
    <vs-row class="a" justify="space-between" align="center">
      <vs-row justify="center" align="center" style="width: 800px;">
        <span class="margin-right">Главная</span>
        <span></span>
        <span>Контакты</span>
      </vs-row>

      <vs-row justify="center" align="center" style="width: 280px; color: black; font-weight: normal;">
        <vs-input placeholder="Поиск">
          <template #icon>
            <i class='bx bx-search'></i>
          </template>
        </vs-input>
      </vs-row>

      <vs-row justify="flex-end" align="center" style="width: 120px;">
          <vs-button icon shadow>
            <i class='bx bx-cart' style="font-size: 1.5em;" />
          </vs-button>

          <vs-button icon shadow>
            <i class='bx bx-user' style="font-size: 1.5em;" />
          </vs-button>
      </vs-row>

    </vs-row>  
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

  .navblock {
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #7c483c;   
    color: white;
    height: 60px;
    font-size: 1.1em;
    font-weight: bold;
  }

  .a {
    width: 1200px;
  }
  
</style>