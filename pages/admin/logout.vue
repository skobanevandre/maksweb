/<template>
  
</template>

<script>
export default {
  layout: 'blank',
  mounted() {
    this.$auth.logout();
  }
}
</script>
