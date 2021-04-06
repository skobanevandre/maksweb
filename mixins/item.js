export default {
  methods :{

    /**
     * 
     * @returns Object
     */
    emptyItem() {
      let item = 
        {
          "article" : "00000000",
          "title" : "",
          "description" : "",
          "price" : {
            "sale" : "00.00",
            "standart" : "00.00",
            "wholesale" : "00.00",
            "licvidation" : "00.00",
            "wholesaleqty" : "0"
          },
          "indexpage" : 0,
          "active" : 0,
          "dimensions": {
            "deep":"0",
            "width":"0",
            "height":"0",
            "weight":"0",
            "pack": { 
              "deep":"0",
              "width":"0",
              "height":"0",
              "weight":"0" 
            }
          },
          "images" : [],
          "ordered" : {
            "id":"1",
            "val":"0"
          },
          "titleimage" : "",
          "categories":[]
        };

        return item;
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
  }
}