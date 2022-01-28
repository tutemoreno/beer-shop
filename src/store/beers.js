import axios from 'axios';

export default {
  namespaced: true,
  state: {
    items: [],
    filterByOptions: [{ text: 'Name', value: 'beer_name' }],
    sortByOptions: [{ text: 'Name', value: 'beer_name' }],
    sortOptions: [
      { text: 'Asc', value: 'ASC' },
      { text: 'Desc', value: 'DESC' },
    ],
    filterBy: 'beer_name',
    sortBy: 'name',
    sort: 'ASC',
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
      state.filter = v ? v : null;
    },
    setFilterBy: (state, v) => {
      state.filterBy = v;
    },
    setValue: (state, v, key) => {
      state[key] = v;
    },
  },
  actions: {
    fetchItems: async ({ commit, state }) => {
      const { filter } = state;
      commit('setLoading', true);

      const response = await axios({
        method: 'get',
        url: `https://api.punkapi.com/v2/beers`,
        params: {
          beer_name: filter,
        },
      });

      commit('setItems', response.data);
      commit('setLoading', false);
    },
  },
  getters: {
    items: ({ items, sortBy, sort }) => {
      let newItems = [...items];

      if (sort == 'ASC') {
        newItems.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) return 1;

          if (a[sortBy] < b[sortBy]) return -1;

          return 0;
        });
      } else {
        newItems.sort((a, b) => {
          if (b[sortBy] > a[sortBy]) return 1;

          if (b[sortBy] < a[sortBy]) return -1;

          return 0;
        });
      }

      return newItems;
    },
    isLoading: ({ isLoading }) => isLoading,
    getState: (state) => (key) => state[key],
  },
};
