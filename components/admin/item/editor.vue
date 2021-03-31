<template>
  <editor
    api-key="9aquvozdn07h5s4sgaux990jqucd0l9e6773i57ll47ceptz"
    :init="{
      height: 500,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
    }"
    v-model = "$attrs.item.description"
  ></editor>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default { 
  model: {
    prop: 'item',
    event: 'change'
  },

  components: {
   'editor': Editor
  },

}
 </script>