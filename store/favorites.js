import item from "~/mixins/item";

export const state = () => ({
  items: [],
});

export const mutations = {

  add( state, item ) {
    state.items.push( item );
    localStorage.favorites = JSON.stringify( state.items );
  },

  remove( state, item ) {
    state.items.splice( state.items.findIndex( element => element.article == item.article ), 1 );
    localStorage.favorites = JSON.stringify( state.items );
  },

  init( state ) {
    if ( localStorage.favorites )
      state.items = JSON.parse( localStorage.favorites );
  },

};

export const getters = {

    count: ( state ) => {
      if ( state.items.length == 0 ) return 'ПУСТО';
      return state.items.length;
    },

    items: ( state ) => {
      return state.items;
    },

};

export const actions = {



}


