export const state = () => ({
  settings: {},
})

export const mutations = {

  async getData( state, settings ) {
    state.settings = settings;
  },
}

export const actions = {
  async nuxtServerInit ({ commit }, { req } ) {
    commit( 'getData', await this.$axios.$get( `/settings` ) );
  }
}  

