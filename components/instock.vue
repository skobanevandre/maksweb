<template>
  <div class="square" :style="setBgColor">
    <i :class="setIcon" />
  </div>
</template>

<style scoped>
  .square {
    width: 35px;
    height: 25px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    justify-items: center;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
  }

</style>

<script>
export default {
  props: { 
    checked: {
      type: Boolean,
      default: false,
    },  
  },

  computed: {
    setBgColor() {
      if ( this.checked )
        return { 'background-color': 'green' }
      else   
        return { 'background-color': 'red' }
    },

    setIcon() {
      if ( this.checked )
        return 'bx bx-check'
      else   
        return 'bx bx-x'   
    },

  }
}
</script>