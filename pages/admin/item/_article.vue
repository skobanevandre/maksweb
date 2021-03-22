<template>
  <div>
    <adminTitle>РЕДАКТИРОВАНИЕ ТОВАРА</adminTitle>
    Займемся загрузкой изображения
    <vs-hr />
    
    <pre>
      {{ item }}
    </pre>  

    <vs-input type="file" name="picture" @change="handleImage" accept="image/*" /> 
    <vs-button @click="qqq">Send</vs-button>
  </div>

</template>

<script>

export default {
  layout:'admin',

  data() {
    return{
      image: '',
    }
  },

  methods: {
    async qqq(  ) {
      let fd = new FormData();
      fd.append('image', this.image )
      fd.append('article', this.item.article )

      let result = await this.$axios.$post( '/item/image/' + this.item.article, fd )
    },

    handleImage( event ) {
      this.image = event.target.files[0]
    },

},

  async asyncData({ params, $axios }) {
    const item = await $axios.$get( '/item/' + params.article );
    return { 'item' : item[0] }; 
  },
 
}
</script>