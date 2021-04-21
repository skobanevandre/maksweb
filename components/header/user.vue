<template>
  <NuxtLink to="/" class="link">
    <vs-row justify="flex-end" align="center" direction="row">
      <div style="margin-right: 10px;">
        <i class="bx bx-user user"/>
      </div>
      <vs-row justify="center" direction="column" align="center" class="items">  
        <span style="font-weight:bold;">ВОЙТИ</span>
        <div class="hr" />
        <span>РЕГИСТРАЦИЯ</span>
      </vs-row>  
    </vs-row>  
  </NuxtLink>  
</template>

<style scoped>
  .user {
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