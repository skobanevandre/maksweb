export default {
  methods :{
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
  }
}