<template>
  <div>
    <adminTitle>РЕДАКТИРОВАНИЕ ТОВАРА</adminTitle>
    <vs-hr />
    Картинки:
    <div class="itemImages">
      <img
        v-for="( img, i ) in images"
        :src = "'/images/item/' + article + '/' + img" 
        :key = "i" 
        class="itemImage">
    </div>
    <vs-input type="file" name="picture" @change="handleImage" accept="image/*" /> 
    <vs-button @click="qqq">Send</vs-button>

    <pre>{{ item }}</pre>  
    <pre>{{ images }}</pre>

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

  computed: { 
    getImageUrl( img ) {
      return '/images/item/' + this.article + '/' + img;
    }

  },

  methods: {
    async qqq(  ) {
      let fd = new FormData();
      fd.append('image', this.image )
      fd.append('article', this.item.article )

      this.images = await this.$axios.$post( '/item/image/' + this.item.article, fd )

    },

    handleImage( event ) {
      this.image = event.target.files[0]
    },
  },

  async asyncData({ params, $axios }) {
    const item = await $axios.$get( '/item/' + params.article );
    const images = await $axios.$get( '/item/image/' + params.article );
    return { 'images' : images, 'item' : item[0], 'article' : params.article  }; 
  },
 
}
</script>

<style scoped>
  .itemImage {
    width: 250px;
  }
  .itemImages {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>