<template>
  <div class="a">
    <center>
      <h1>
        <slot />  
      </h1>  
    </center>  
    <hr class="b">    
  </div>  
</template>

<style scoped>
.a {
  margin-bottom: 15px;
}

.b {
  border: none;
  border-bottom: 1px dotted #ccc;
}
</style>