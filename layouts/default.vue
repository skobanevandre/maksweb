<template>
  <div>

    <header>
      <div>
        <header-default />
      </div>  
    </header>
    
    <vs-row justify="space-between" align="flex-start">

        <div style="max-width: fit-content;">
          <nav>
            <sidenav />
          </nav>  
        </div>

        <div style="flex:1;">
          <main>
            <topnav />
            <Nuxt />
          </main>  
        </div>

    </vs-row>  

    <footer>
      <vs-row justify="center" align="flex-start">
        <footerleft style="flex-grow: 1;"/> 
        <footercenter style="flex-grow: 1;"/> 
        <footerright style="flex-grow: 1;"/> 
      </vs-row>
    </footer>

    <center>
  </div>
</template>

<script>
export default {

  data() {
    return {
      screenWidth: 0,
    }
  },
  
  mounted() {
    this.$store.commit( 'cart/init' );
    this.$store.commit( 'favorites/init' );
    this.screenWidth = window.innerWidth;
  }

}
</script>

<style scoped>


</style>
