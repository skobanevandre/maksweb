<template>
  <div class="margin-top">
      <div class="imageSheet">
        <div
          v-for="( image, i ) in $attrs.item.images"
          :key = "i"      
          class="imageContainer" >  
            <admin-item-image v-model="$attrs.item.images[i]" :titleimage="$attrs.item.titleimage" @newtitleimage="setTitleImage"/>          

            <vs-button icon shadow size="small" class="delImage" @click="delImage( i )">
              <i class='bx bx-x'></i>
            </vs-button>

        </div>
        <div class="imageContainer">
          <vs-button flat border class="plusButton" @click="$refs.imageSelect.click()">
            <i class="bx bx-plus" />
          </vs-button>
        </div>
      </div>

      <div class="fileButtonBlock">
        <input type="file" ref="imageSelect" @change="handleImage" accept="image/*" class="hidden"/>
      </div>  

      <vs-dialog width="300px" prevent-close v-model="dialog">
        
        <template #header>
          <h4>Удалить картинку?</h4>
        </template>

        <img :src="dialogImage" width = "250" class="center">

        <template #footer>
          <vs-row justify="flex-end">
            <vs-button @click="$attrs.item.images.splice( dialogItem, 1 ); dialog=false;" class="margin-right">
              Удалить
            </vs-button>

            <vs-button @click="dialog=false;">
              Отмена
            </vs-button>
          </vs-row>

        </template> 
      </vs-dialog>

    </div>
</template>

<script>
export default {

  data() {
    return {
      dialog: false,
      dialogImage: "",
      dialogItem: -1,
    }
  },

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

    async sendImage( image ) {
      let fd = new FormData();
      fd.append('image', image )
      fd.append('article', this.$attrs.item.article )

      this.$attrs.item.images.push( { url: await this.$axios.$post( '/image/' + this.$attrs.item.article, fd ), alt:""  } );
    },

    delImage( i ) {

      this.dialogImage = this.$attrs.item.images[ i ].url;
      this.dialogItem = i;
      this.dialog = true;
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

  .plusButton {
    align-items: center;
    height: 190px;
    font-weight: bold;
    font-size: 3em;
  }

   .delImage {
    position: absolute;
    top: 10px;
    right: 10px;
  }

</style>