export const state = () => ({
  items: [],
});

export const mutations = {

  init( state ) {
    if ( localStorage.cart ) {
      state.items = JSON.parse( localStorage.cart );
      console.log( 'ititializing done' )      
    }  
  },
  
  add( state, item ) {
    let index = state.items.findIndex( element => element.item.article == item.article );
    if ( index > 0 ) 
      state.items[index].qty++;
    else   
      state.items.push( { 'item': item, 'qty': 1 } );
    localStorage.cart = JSON.stringify( state.items );
  },

  del ( state, item ) {
    state.items.splice( state.items.findIndex( element => element.item.article == item.article ), 1 );
  },

  increase( state, article ) {
    state.items.forEach( element => {
      if ( element.item.article == article ) element.qty++;
    });
    localStorage.cart = JSON.stringify( state.items );
  },

  decrease( state, article ) {
    state.items.forEach( element => {
      if ( element.item.article == article && element.qty > 1) element.qty--;
    });
    localStorage.cart = JSON.stringify( state.items );
  },

};

export const getters = {

    csum: ( state ) => {
      console.log( 'getting summ and count of cart' );
      if ( state.items.length == 0 ) return 'ПУСТА';
      let sum = 0;
      let qty = 0;

      state.items.forEach( element => { 
        qty += element.qty; 
        switch( Number( element.item.price.current ) ) {
          case 0: sum += Number( element.qty ) * Number( element.item.price.standart ); break;
          case 1: sum += Number( element.qty ) * Number( element.item.price.sale ); break;
          case 2: sum += Number( element.qty ) * Number( element.item.price.wholesale ); break;
          case 3: sum += Number( element.qty ) * Number( element.item.price.licvidation ); break;
        } 
      })

      return sum.toFixed( 2 ) + '₽ ( ' + qty + ' )';
    },

    summ: ( state ) => {
      let sum = 0;
      state.items.forEach( element => { 
        switch( Number( element.item.price.current ) ) {
          case 0: sum += Number( element.qty ) * Number( element.item.price.standart ); break;
          case 1: sum += Number( element.qty ) * Number( element.item.price.sale ); break;
          case 2: sum += Number( element.qty ) * Number( element.item.price.wholesale ); break;
          case 3: sum += Number( element.qty ) * Number( element.item.price.licvidation ); break;
        } 
      })
      return sum.toFixed( 2 ) + '₽';
    },

}


