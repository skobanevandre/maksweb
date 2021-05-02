<template>
  <div>

    <header>
      <div class="container">
        <header-default />
      </div>  
    </header>
    
    <vs-row class="" justify="center" align="flex-start">
      <nav>
        <div class="sidenav">
          <sidenav />
        </div>  
      </nav>  

      <main>
        <div class="content">
          <topnav />
          <Nuxt />
        </div>  
      </main>  

    </vs-row>  

    <footer>
      <div class="container">
        <footerleft/> 
        <footercenter/> 
        <footerright/> 
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  
  mounted() {
    this.$store.commit( 'cart/init' );
    this.$store.commit( 'favorites/init' );
    console.log( 'browser width: ', window.innerWidth );
  }

}
</script>

<style scoped>

  .sidenav {
    max-width: 265px;
  }

  .content {
    max-width: 930px;
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
