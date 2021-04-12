<template>
  <div>
    <img
      :src = "$attrs.image.url" 
      :alt = "$attrs.image.alt"
      class = "itemImg" > 
        
      <vs-button icon :shadow = "isMain" size="small" class="mainImage" @click="setMainImage( $attrs.image.url )">
        <i class='bx bx-star'></i>
      </vs-button>

      <vs-button icon shadow size="small" class="altImage" @click="imageAlt=$attrs.image.alt; dialog=true;">
        Описание
      </vs-button> 

      <vs-dialog width="500px" prevent-close v-model="dialog">
        
        <template #header>
          <h4>Описание картинки ( alt )</h4>
        </template>

        <div>
          <vs-input v-model="imageAlt" ></vs-input>
        </div>

        <template #footer>
          <vs-row justify="flex-end">
            <vs-button @click="$attrs.image.alt=imageAlt; dialog=false;" class="margin-right">
              Применить
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
    return{
      imageAlt: '',
      dialog: false,
    }
  },

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

    setMainImage( img ) {
      // console.log( 'mainImage=', img )
      this.$emit( 'newtitleimage', img );
      // this.$props.titleimage = img;
    },

  },

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

