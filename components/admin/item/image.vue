<template>
  <div>
    <img
      :src = "$attrs.image.url" 
      :alt = "$attrs.image.alt"
      class = "itemImg" > 

      <vs-button icon shadow size="small" class="delImage" @click="delImage( $attrs.image.url )">
        <i class='bx bx-x'></i>
      </vs-button>
        
      <vs-button icon :shadow = "isMain" size="small" class="mainImage" @click="setMainImage( $attrs.image.url )">
        <i class='bx bx-star'></i>
      </vs-button>

      <vs-button icon shadow size="small" class="altImage" @click="altImage( $attrs.image.url )">
        Описание
      </vs-button> 
  </div>
</template>

<script>
export default {

  model: {
    prop: 'image'
  },

  props: [
    'titleimage',
  ],

  computed:{
    isMain: {
      get() {
        return this.$props.titleimage == this.$attrs.image.url ? false : true;
      } 
    },
  },

  methods: {
    delImage( img ) {

    },

    setMainImage( img ) {
      console.log( 'mainImage=', img )
      this.$emit( 'newtitleimage', img );
      // this.$props.titleimage = img;
    },

    altImage( img ) {
      this.$attrs.image.alt = "asdfasdfasdf";
    },
  }
}
</script>

<style scoped>

  .itemImg {
    height: 200px;
  }

  .delImage {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .altImage {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }

  .mainImage {
    position: absolute;
    top: 10px;
    left: 10px;
  }

</style>

