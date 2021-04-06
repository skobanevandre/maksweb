<template>
  <div style="position: relative;">
    <div style="width: 300px; height: 300px;">
      <img
        :src = "$attrs.category.image" 
        :alt = "$attrs.category.imagealt"
        class = "itemImg" > 
    </div>  

      <vs-button size="small" class="altImage" @click="imageAlt=$attrs.category.imagealt; altDialog=true;">
        Описание
      </vs-button> 

      <vs-button size="small" class="delImage" @click="imageAlt=$attrs.category.imagealt; altDialog=true;">
        Удалить
      </vs-button> 

      <vs-dialog width="500px" prevent-close v-model="altDialog">
        
        <template #header>
          <h4>Описание картинки ( alt )</h4>
        </template>

        <div>
          <vs-input v-model="imageAlt" ></vs-input>
        </div>

        <template #footer>
          <vs-row justify="flex-end">
            <vs-button @click="$attrs.category.imagealt=imageAlt; altDialog=false;" class="margin-right">
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
    prop: 'category'
  },

  props: [
    'titleimage',
  ],

}
</script>

<style scoped>

  .itemImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
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

