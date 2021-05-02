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
            "current": "standart",
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
    },
    
    /**
     * 
     * @param {*} field 
     * @param { NUMBER } order 
     * @returns 
     */
    compare( field, order ) {
      var len = arguments.length;
      
      if(len === 0) { 
        return ( a, b ) => ( a < b && -1 ) || ( a > b && 1 ) || 0; 
      }
      
      if(len === 1) {
        switch( typeof field ) {
          case 'number':
            return field < 0 ? 
              ( ( a, b ) => ( a < b && 1 ) || ( a > b && -1 ) || 0 ) :
              ( ( a, b ) => ( a < b && -1 ) || ( a > b && 1 ) || 0 );
            case 'string':
              return ( a, b ) => ( a[ field ] < b[ field ] && -1 ) || ( a[ field ] > b[ field ] && 1 ) || 0;
          } 
      }
      
      if( len === 2 && typeof order === 'number' ) {
        return order < 0 ?
          ( ( a, b ) => ( a[ field ] < b[ field ] && 1 ) || ( a[ field ] > b[ field ] && -1 ) || 0 ) :
          ( ( a, b ) => ( a[ field ] < b[ field ] && -1 ) || ( a[ field ] > b[ field ] && 1 ) || 0 );
      }
      var fields, orders;
      if( typeof field === 'object' ) {
        fields = Object.getOwnPropertyNames( field );
        orders = fields.map( key => field[ key ] );
        len = fields.length;
      } else {
        fields = new Array( len );
        orders = new Array( len );
        for( let i = len; i--; ) {
          fields[ i ] = arguments[ i ];
          orders[ i ] = 1;
        }
      }
      return ( a, b ) => {
        for( let i = 0; i < len; i++ ) {
          if( a[ fields[ i ] ] < b[ fields[ i ] ] ) return orders[ i ];
          if( a[ fields[ i ] ] > b[ fields[ i ] ] ) return -orders[ i ];
        }
        return 0;
      };
    },

  }
}