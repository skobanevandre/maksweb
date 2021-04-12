<template>
  <div>
    <vs-row justify="center">
      <h1>Вход пользователя</h1>
    </vs-row>  

    <vs-row justify="center" style="margin-bottom: 20px;">
      <vs-input placeholder="Имя пользователя"  v-model="username" style="width: 250px;" />
    </vs-row>  

    <vs-row justify="center" style="margin-bottom: 20px;">
      <vs-input placeholder="Пароль" type="password" style="width: 250px;" v-model="password"/>
    </vs-row>  

    <vs-row justify="center" style="margin-bottom: 20px;">
      <vs-button style="width: 250px;" @click = "loginUser()" >
        <i class="bx bx-log-in-circle" style="margin-right: 10px; "/>
        Войти
      </vs-button>  
    </vs-row>  
  </div>  
</template>

<script>
export default {
  layout: 'blank',

  data() {
    return {
        username: '',
        password: '',
    }
  },

  methods: {
    async loginUser() {
      try {
        let res = await this.$auth.loginWith( 'local', 
          { data : { username: this.username, password: this.password } } )
          .then( result => { if (this.$auth.loggedIn) this.$router.push('/admin/'); } );
      } catch( err ) {
        // console.log( err )
      }
    }

  },

}
</script>