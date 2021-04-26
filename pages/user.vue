<template>
  <div>
    <h1 class="center">Идентификация пользователя</h1>

    <p class="center">Для оформления заказа введите свой номер телефона. На него придет СМС с одноразовым паролем.</p>

    <vs-row justify="center" direction="column" align="center">
      <span class="margin-top"><strong>Номер телефона:</strong></span>
      <vs-input v-model="user" class="margin-top"></vs-input>

      <vs-button 
        @click="showPass=true" 
        class="margin-top" 
        :disabled="showPass">
        Получить одноразовый пароль
      </vs-button>

      <div v-if="showPass" class="margin-top">
        <span><strong>Введите одноразовый пароль:</strong></span>
        <vs-input v-model="pass" class="margin-top"></vs-input>
      </div>  

      <NuxtLink to="/deliver">
        <vs-button v-if="pass.length>0" class="margin-top">Продолжить</vs-button>
      </NuxtLink>  

    </vs-row>

    
  </div>
</template>

<script>
export default {

  data() {
    return {
      showPass: false,
      pass: '',
      user: '',
    }
  }
  
}
</script>

<style scoped>
.tel {
  width: 250px;
}

</style>
