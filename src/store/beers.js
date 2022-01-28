import axios from 'axios';

export default {
  namespaced: true,
  state: {
    items: [],
    searchByOptions: [
      { text: 'Name', value: 'beer_name' },
      { text: 'Yeast', value: 'yeast' },
      { text: 'Hops', value: 'hops' },
      { text: 'Malt', value: 'malt' },
      { text: 'Food', value: 'food' },
      // { text: 'Yeast', value: 'ids' },
    ],
    sortByOptions: [
      { text: 'Name', value: 'name' },
      { text: 'Tagline', value: 'tagline' },
      { text: 'Abv', value: 'abv' },
      { text: 'Ibu', value: 'ibu' },
      { text: 'Ebc', value: 'ebc' },
    ],
    sortDesc: false,
    searchBy: 'beer_name',
    page: 1,
    itemsPerPage: 25,
    sortBy: 'name',
    search: null,
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
      state.filter = v ? v : null;
    },
    setFilterBy: (state, v) => {
      state.searchBy = v;
    },
    setValue: (state, payload) => {
      state[payload.key] = payload.value;
    },
  },
  actions: {
    fetchItems: async ({ commit, state }) => {
      const { search, searchBy, page, itemsPerPage } = state;
      const params = { page, per_page: itemsPerPage };

      commit('setLoading', true);

      if (search) params[searchBy] = search.split(' ').join('_');

      const response = await axios({
        method: 'get',
        url: `https://api.punkapi.com/v2/beers`,
        params,
      });

      commit('setItems', response.data);
      commit('setLoading', false);
    },
  },
  getters: {
    items: ({ items, sortBy, sortDesc }) => {
      let newItems = [...items];

      if (sortDesc) {
        newItems.sort((a, b) => {
          if (b[sortBy] > a[sortBy]) return 1;

          if (b[sortBy] < a[sortBy]) return -1;

          return 0;
        });
      } else {
        newItems.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) return 1;

          if (a[sortBy] < b[sortBy]) return -1;

          return 0;
        });
      }

      return newItems;
    },
    isLoading: ({ isLoading }) => isLoading,
    getState: (state) => (key) => state[key],
  },
};
