<template>
  <div class="margin-top">
      <div class="imageSheet">
        <div
          v-for="( image, i ) in $attrs.item.images"
          :key = "i"      
          class="imageContainer" >  
            <admin-item-image v-model="$attrs.item.images[i]" :titleimage="$attrs.item.titleimage" @newtitleimage="setTitleImage"/>          
        </div>
      </div>

      <div class="fileButtonBlock">
        <input type="file" ref="imageSelect" @change="handleImage" accept="image/*" class="hidden"/>
        <vs-button  @click="$refs.imageSelect.click();" >Добавить изображение</vs-button>
      </div>  
    </div>
</template>

<script>
export default {
  model: {
    prop: "item"
  },


  methods: {
    setTitleImage( img ) {
      this.$attrs.item.titleimage = img;
    },

    handleImage( event ) {
      let selectedImage = event.target.files[0];
      this.sendImage( selectedImage );
    },
  },

}
</script>

<style scoped>
  .imageSheet {
    overflow-x: auto ;  
    display: flex;
    scroll-snap-type: x mandatory;
    height: 225px;
    border-radius: 10px;
  }

  .imageContainer {
    scroll-snap-align: start;
    height: 200px;
    position: relative;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px dotted silver;
  }

  .fileButtonBlock {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .hidden {
    width: 1px;
    height: 1px;
    display: none;
    visibility: hidden;
  }

</style>