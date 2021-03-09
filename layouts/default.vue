<template>
  <div>
    <header>
      <div class="container">
        <slot name ="qqq" />
        <center>Jumbo-Combo</center>
      </div>  
    </header>
    
    <nav>
      <div class="container">
        <topnav />
      </div>  
    </nav>  

    <main>
      <div class="container">
        <Nuxt />
      </div>  
    </main>  

    <footer>
      <div class="container">
        <center> FOOTER </center>
      </div>
    </footer>
  </div>
</template>

