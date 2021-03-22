<template>
  <div>
    <vs-row justify="space-between" align="center">

      <div>
        <span>Оптовая цена, %:</span>
        <vs-input type="number" v-model="settings.wholesalepricepercent" style="width: 150px; margin-top: 10px;" /> 
      </div>  

      <div>
        <span>Цена распродажи, %</span>
        <vs-input type="number" v-model="settings.salepricepercent" style="width: 150px; margin-top: 10px;" /> 
      </div>  

      <div>
        <span>Цена ликвидации, %</span>
        <vs-input type="number" v-model="settings.licvidationpricepercent" style="width: 150px; margin-top: 10px;" /> 
      </div>

      <div>
        <vs-button @click="setSettings" >Сохранить</vs-button>
      </div>

    </vs-row>

  </div>
</template>

<script >

export default {

  data() {
    return {
      settings: {}
    }  
  },

  methods: {
    async setSettings() {
        await this.$axios.$put( `/settings`, { settings: this.settings } );
        this.$store.commit( 'getData', await this.$axios.$get( `/settings` ) );
    },

  },

  created() {
    this.settings = Object.assign( {}, this.$store.state.settings );
  }


}
</script>