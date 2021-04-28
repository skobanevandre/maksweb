export const state = () => ({
  items: [],
  dialog: [],
});

export const mutations = {

  init( state ) {
    if ( localStorage.cart ) {
      state.items = JSON.parse( localStorage.cart );    
    }  
  },
  
  add( state, data ) {
    let index = state.items.findIndex( element => element.item.article == data.item.article );
    if ( index >= 0 ) 
      state.items[index].qty = Number( state.items[index].qty ) + Number( data.qty );
    else   
      state.items.push( { 'item': data.item, 'qty': 1 } );
    localStorage.cart = JSON.stringify( state.items );
  },

  del ( state, item ) {
    state.items.splice( state.items.findIndex( element => element.item.article == item.article ), 1 );
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

  tagItem( state, element ) {
    state.items[ element.index ].item = element.item;
    state.items[ element.index ].qty = 0; 
    localStorage.cart = JSON.stringify( state.items );
    state.dialog.push( 'Цены на некоторые товары были изменены. Их количество помечено как 0.' );
  },

  setItemQty( state, data ) {
    state.items[ data.index ].qty = data.qty; 
    localStorage.cart = JSON.stringify( state.items );
    state.dialog.push( 'Остатки на некоторые товары больше чем заказано. Исправляем до состояния остатков.' );
  },

  clearDialog( state ) {
    console.log( 'clearing dialogs' );
    state.dialog = [];
  }

};

export const getters = {

    csum: ( state ) => {
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

};

export const actions = {

  async verification( context ) {
    let articles = await this.$axios.$get('/item');
    context.state.items.forEach( el => {
      articles.forEach( ael => { 
        if ( el.item.article == ael.article ) { 

          // Проверяем на соответствие цены
          if ( 
            el.item.price.current !== ael.price.current || el.item.price.standart !== ael.price.standart ||  
            el.item.price.sale !== ael.price.sale || el.item.price.wholesale !== ael.price.wholesale ||  
            el.item.price.licvidation !== ael.price.licvidation  
          ) { 
            let idx = context.state.items.findIndex( element => element.item.article == el.item.article );
            context.commit( 'tagItem', { 'item': ael, 'index': idx } );
          }  
        
          // Проверяем на соотвествии количества остатков
          if ( Number( el.item.ordered.id ) == 3 ) {
            console.log( 'el.item.ordered.id:', el.item.ordered.id )
            console.log( 'el.qty:', el.qty, 'ael.ordered.val:', ael.ordered.val )
            if ( Number( el.qty ) > Number( ael.ordered.val ) ) {
              let idx = context.state.items.findIndex( element => element.item.article == el.item.article );
              context.commit( 'setItemQty', { 'qty': Number( ael.ordered.val ), 'index': idx } );
              console.log( 'setItemQty' );
            }  
          }
        }  
      })
    }); 
  },

};


