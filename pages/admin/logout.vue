/<template>
  <center><h1>Выход пользователя</h1></center>
</template>

<script>
export default {
  layout: 'blank',
  mounted() {
    this.$auth.logout();
    this.$router.push('/');
  }
}
</script>
