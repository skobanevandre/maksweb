<template>
  <div class="container">
    <div class="a">

      <adminSideNav class="sn" />

      <div class="ctn">
        <Nuxt />
      </div>

    </div>
  </div>
</template>

<script>
export default {
    middleware: 'auth',
}
</script>

<style scoped>
.a{
  display: flex;
  justify-content: space-between;
}

.sn {
  width: 275px;
}

.ctn {
  width: 920px;
}

</style>
