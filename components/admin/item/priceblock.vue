<template>
  <div>
    <vs-row style="margin-top: 10px;" justify="space-between" >

      <div style="margin-right: 10px;">
        <center>Стоимость:</center>
          <div class="rowleft">
            <vs-input type="number" v-model="setPrice" style="width: 100px; pointer-events: auto;" />
            <vs-button 
              icon 
              flat 
              :disabled="initData==initPrice" 
              @click="saveButtonClick"
              style="pointer-events: auto;">
              <i class='bx bx-save'></i>
            </vs-button>
          </div>  
      </div>

        <div>
          <div style="margin-bottom: 9px; text-align: center;">
            <span>Опт:</span>
          </div>
          <div style="width: 100%; text-align: center;">
            <span class="itemPrice">{{ wholesalePrice }}</span>
          </div>
        </div>

        <div>
          <div style="margin-bottom: 9px; text-align: center;">
            <span>Распродажа:</span>
          </div>
          <div style="width: 100%; text-align: center;">
            <span class="itemPrice">{{ salePrice }}</span>
          </div>
        </div>

        <div>
          <div style="margin-bottom: 9px; text-align: center;">
            <span>Ликвидация:</span>
          </div>
          <div style="width: 100%; text-align: center;">
            <span class="itemPrice">{{ licvidationPrice }}</span>
          </div>
        </div>

    </vs-row> 
  </div>
</template>

<script>
export default {
  props: [
    'item',
  ],

  data() {
    return {
      initPrice: this.item.price,
      wholesalePrice: 0,
      salePrice: 0,
      licvidationPrice: 0,
      initData: this.item.price,
    }
  },

  computed: {
    setPrice: {
      get() {
        return this.initPrice;
      },
      set( val ) {
        this.wholesalePrice = this.fixPrice( this.calculatePrice( val, this.$store.state.settings.wholesalepricepercent ) );
        this.salePrice = this.fixPrice( this.calculatePrice( val, this.$store.state.settings.salepricepercent ) );
        this.licvidationPrice = this.fixPrice( this.calculatePrice( val, this.$store.state.settings.licvidationpricepercent ) );
        this.initPrice = val;
        return val;
      }
    },
  },

  methods:{
    saveButtonClick() {
      // SAVE ACTION
      this.$vs.notification({
        position: 'top-right',
        color: 'success',
        title: 'Documentation Vuesax 4.0+',
        text: `These documents refer to the latest version of vuesax (4.0+),
        to see the documents of the previous versions you can do it here 👉 Vuesax3.x`
      })
      this.initData = this.initPrice;
    },

    /**
     * Определяем цену товара основываясь на процентах от стандартной цены
     */
    calculatePrice( initValue, percentage ){
      return  ( initValue * ( ( 100 - percentage ) / 100 ) ).toFixed( 2 );
    },

    /**
     * Выравниваем цену товара до близжайших **9.00 
     */
    fixPrice( price ) {
      return ( ( ( parseFloat( ( price / 10 ).toFixed( ) ) + 1 ) * 10 ) - 1 ).toFixed( 2 );
    }  
},

  mounted() {
    this.setPrice = this.item.price;
  },

}
</script>