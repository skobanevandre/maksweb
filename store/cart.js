export const state = () => ({
  items: [],
});

export const mutations = {

  init( state ) {
    if ( localStorage.cart )
      state.items = JSON.parse( localStorage.cart );
  },
  
  add( state, item ) {
    state.items.push( { 'item': item, 'qty': 1 } );
    localStorage.cart = JSON.stringify( state.items );
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
      if ( state.items.length == 0 ) return 'ПУСТА';
      let sum = 0;
      for ( let data of state.items )
        sum += Number( data.item.price.standart ) * data.qty;
      return sum.toFixed( 2 ) + '₽ ( ' + state.items.length + ' )';
    }

}


