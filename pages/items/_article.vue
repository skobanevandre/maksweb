<template>
  <pre> {{ $data }}</pre>
</template>

<script>
export default {
  data() {
    return {
      article: this.$route.params.article,
    }
  },
  
  async asyncData({ params, $axios }) {
    return await $axios.$get( `/item/${params.article}` );
  }

}
</script>