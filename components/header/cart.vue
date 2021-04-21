<template>
  <NuxtLink to="/cart" class="link">
    <vs-row justify="flex-end" align="center" direction="row">
      <div style="margin-right: 10px;">
        <i class="bx bx-cart cart"/>
      </div>
      <vs-row justify="center" direction="column" align="center" class="cartItems">  
        <span style="font-weight:bold;">КОРЗИНА</span>
        <div class="hr" />
        <span> {{ $store.getters[ "cart/csum" ] }}</span>
      </vs-row>  
    </vs-row>  
  </NuxtLink>  
</template>

<script>
export default {
  computed :{

    getCart() {
      
    }

  },
}
</script>

<style scoped>
  .cart {
    font-size: 1.5em;
    color: white;
    background-color: #7c483c;
    padding: 10px;
    border-radius: 10px;
  }

  .hr {
    height: 1px;
    margin: 3px;
    border-bottom: 1px dotted silver;
    width: 100%;
  }

  .cartItems {
    width: 130px;
  }

  .link {
    text-decoration: none;
    color: black;
  }
</style>