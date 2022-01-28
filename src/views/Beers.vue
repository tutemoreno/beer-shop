<template>
  <v-img :src="require('../assets/beers-bg-4.jpg')">
    <v-container fluid class="pa-4 pt-16 pa-lg-16">
      <v-row class="pt-4 pt-lg-0">
        <v-col class="py-0" cols="12" xs="12" sm="4">
          <beer-text-field
            light
            :loading="isLoading"
            :value="getState('filter')"
            @input="dispatchFilter"
            label="Search"
            placeholder="Search..."
          />
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="3">
          <beer-select
            light
            :items="getState('filterByOptions')"
            :value="getState('filterBy')"
            label="Filter by"
            @change="(v) => setValue(v, 'setFilterBy')"
          />
        </v-col>
      </v-row>
      <v-row class="pt-4 pt-lg-0">
        <v-col class="py-0" cols="12" xs="12" sm="4">
          <beer-select
            light
            :items="getState('sortByOptions')"
            :value="getState('sortBy')"
            label="Sort by"
            @change="(v) => setValue(v, 'setSortBy')"
          />
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="2">
          <beer-select
            light
            :items="getState('sortOptions')"
            :value="getState('sort')"
            label="Sort"
            @change="(v) => setValue(v, 'sort')"
          />
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <beer-card link rounded="lg" height="200">
            <div class="d-flex">
              <div
                class="rounded-l-lg rounded-tr-0 d-flex align-center"
                :style="{ backgroundColor: getBeerColor(item) }"
              >
                <v-img
                  contain
                  :src="item.image_url"
                  width="75"
                  height="184"
                  class="my-2"
                />
              </div>

              <beer-list class="fw rounded-r-lg">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 text-wrap">
                      <p class="beer-title ma-0">
                        {{ item.name }}
                      </p>
                    </v-list-item-title>

                    <v-list-item-subtitle class="text-subtitle-2 text-wrap">
                      <p class="ma-0">
                        {{ item.tagline }}
                      </p>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider />

                <v-list-item>
                  <v-list-item-content>Abv:</v-list-item-content>
                  <v-list-item-content> {{ item.abv }}% </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Ibu:</v-list-item-content>
                  <v-list-item-content>
                    {{ item.ibu }}
                  </v-list-item-content>
                </v-list-item>
              </beer-list>
            </div>
          </beer-card>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import lodash from 'lodash';
import colors from 'vuetify/lib/util/colors';

export default {
  name: 'Beers',
  async created() {
    await this.fetchItems();
  },
  // data: () => ({}),
  computed: {
    ...mapGetters('beers', ['isLoading', 'items', 'getState']),
  },
  methods: {
    ...mapMutations('beers', ['setLoading', 'setValue']),
    ...mapActions('beers', ['fetchItems']),
    getBeerColor({ srm }) {
      if (srm < 6) return colors.amber.darken4;
      else if (srm < 24) return colors.red.darken4;
      else return '#000';
    },
    dispatchFilter(v) {
      this.setFilter(v);
      this.debounceFetchItems(v);
    },
    debounceFetchItems: lodash.debounce(function () {
      this.fetchItems();
    }, 500),
  },
};
</script>

<style lang="scss">
.beer-title {
  text-shadow: 2px 2px 2px gray;
  line-height: normal;
}
</style>
