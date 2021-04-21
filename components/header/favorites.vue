<template>
  <NuxtLink to="/favorites" class="link">
    <vs-row justify="flex-end" align="center" direction="row">
      <div style="margin-right: 10px;">
        <i class="bx bx-heart favorites"/>
      </div>
      <vs-row justify="center" direction="column" align="center" class="items">  
        <span style="font-weight:bold;">ИЗБРАННОЕ</span>
        <div class="hr" />
        <span> {{ $store.getters[ "favorites/count" ] }}</span>
      </vs-row>  
    </vs-row>  
  </NuxtLink>  
</template>

<style scoped>
  .favorites {
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

  .items {
    width: 130px;
  }

  .link {
    text-decoration: none;
    color: black;
  }
</style>