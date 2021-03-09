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
        <footerleft/> 
        <footercenter/> 
        <footerright/> 
      </div>
    </footer>
  </div>
</template>

