<template>
  <vs-dialog v-model="$attrs.showModal">
    <template #header>
      <span class="center">Описание к картинке</span>
    </template>

    <div>
      <div>
        <img :src="image.url" />
      </div>
      <vs-input v-model="image.alt" />
    </div>

    <template #footer>
      <vs-button>ok</vs-button>
      <vs-button>cancel></vs-button>
    </template>
  </vs-dialog>
</template>
  data() {
    return {
      
    }
  }
<script>
export default {
  model: {
    prop: 'showmodal',
    event: 'change'
  },

  props: [ 'image' ],


  methods: {
    cancelButton() {
      this.$attrs.showmodal = false;
    }
  }
    
}
</script>