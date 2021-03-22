<template>
  <div class="container">
    <div class="a">
      <adminSideNav class="sn"/>
      <div class="ctn"><Nuxt /></div>
    </div>
  </div>
</template>

<style scoped>
.a{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
}

.sn {
  width: 25%;
}

.ctn {
  width: 74%;
}

</style>
