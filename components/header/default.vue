<template>
  <vs-row justify="space-between" align="center" class="margin-top">

    <vs-row justify="center" class="logo">
      <a href="/"><img src="/images/template/l.png" class="logoimg" alt="Формы для пряников"></a>
    </vs-row>  

    <vs-row justify="flex-end" align="center" class="cart">
      <header-favorites class="margin-right" /> 
      <header-cart class="margin-right" />
      <header-user class="margin-right" />
    </vs-row>

  </vs-row>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },

  methods: {
    
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

  .cart {
    width: 920px;
  }

</style>