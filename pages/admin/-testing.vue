<template>
  <div>
    <span>props</span>
    <pre>
      {{ $props }}
    </pre>

    <span>params</span>
    <pre>
      {{ $route.params }}
    </pre>

  </div>
</template>

<script>
export default {
  layout: 'admin',

  props: {
    item: Object,
  },

}
</script>