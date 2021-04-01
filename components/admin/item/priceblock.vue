<template>
  <vs-row class="margin-top" justify="space-between" align="center" >

      <div class="v-center margin-right col">
        <span>Стоимость:</span>
        <vs-input type="number" style="width: 150px;" v-model="$attrs.item.price.standart" />
      </div>

      <div class="v-center margin-right col">
        <span>Опт / Кол-во</span>
        <vs-row justify="center" align="center">
          <vs-input type="number" style="width: 100px; margin-right: 10px;"  v-model="$attrs.item.price.wholesale" />
          <vs-input type="number" style="width: 100px;"  v-model="$attrs.item.price.wholesaleqty" />
        </vs-row>  
      </div>

      <div class="v-center margin-right col">
        <span>Распродажа:</span>
        <vs-input type="number" style="width: 150px;"  v-model="$attrs.item.price.sale" />
      </div>

      <div class="v-center margin-right col">
        <span>Ликвидация:</span>
        <vs-input type="number" style="width: 150px;"  v-model="$attrs.item.price.licvidation" />
      </div>

      <div class="v-center margin-right col">
        <vs-button icon shadow border @click="calculate">
          <i class="bx bx-refresh" />
        </vs-button>  
      </div>

    </vs-row>
</template>

<script>
import mixin from '@/mixins/item';

export default {
  mixins: [ mixin ],

  model: {
    prop: 'item',
  },

  methods: {
    calculate() {
      this.$attrs.item.price.wholesale = this.fixPrice( this.calculatePrice( this.$attrs.item.price.standart, this.$store.state.settings.wholesalepricepercent ) );
      this.$attrs.item.price.sale = this.fixPrice( this.calculatePrice( this.$attrs.item.price.standart, this.$store.state.settings.salepricepercent ) );
      this.$attrs.item.price.licvidation = this.fixPrice( this.calculatePrice( this.$attrs.item.price.standart, this.$store.state.settings.licvidationpricepercent ) );
    }
  },

}
</script>