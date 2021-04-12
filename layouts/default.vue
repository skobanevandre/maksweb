<template>
  <div>

    <header>
      <div class="container headercontainer">
      </div>  
    </header>

      <topnav />
    
    <div class="container maincontainer">
      <nav>
        <div class="sidenav">
          <sidenav />
        </div>  
      </nav>  

      <main>
        <div class="content">
          <Nuxt />
        </div>  
      </main>  
    </div>  

    <footer>
      <div class="container">
        <footerleft/> 
        <footercenter/> 
        <footerright/> 
      </div>
    </footer>
  </div>
</template>

<style scoped>

  .sidenav {
    width: 265px;
  }

  .content {
    width: 930px;
  }

  .maincontainer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .headercontainer {
    height: 300px;
    border-radius: 20px;
    background-image: url("/images/template/logo.png") ;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 60%;
  }

</style>
