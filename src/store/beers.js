import axios from 'axios';

export default {
  namespaced: true,
  state: {
    items: [],
    filterBy: 'name',
    filter: null,
    isLoading: false,
    selection: null,
  },
  mutations: {
    setItems: (state, items) => {
      state.items = items;
    },
    setLoading: (state, v) => {
      state.isLoading = v;
    },
    setFilter: (state, v) => {
      state.filter = v;
    },
    setFilterBy: (state, v) => {
      state.filterBy = v;
    },
    setSelection: (state, v) => {
      console.log(v);
      state.selection = v;
    },
  },
  actions: {
    fetchItems: async ({ commit }) => {
      commit('setLoading', true);

      const response = await axios({
        method: 'get',
        url: `https://api.punkapi.com/v2/beers`,
      });

      commit('setLoading', false);
      commit('setItems', response.data);
    },
  },
  getters: {
    // items: ({ items, filter, filterBy }) =>
    //   items.filter((item) => item[filterBy].search(filter)),
    items: ({ items, filter, filterBy }) => {
      if (!filter) return items;

      const filterLC = filter.toLowerCase();
      console.log(filterBy);
      return items.filter((item) =>
        item[filterBy].toLowerCase().includes(filterLC)
      );
    },
    filter: ({ filter }) => filter,
    filterBy: ({ filterBy }) => filterBy,
    isLoading: ({ isLoading }) => isLoading,
    // items({ items }) {
    //   return items;
    // },
  },
};
