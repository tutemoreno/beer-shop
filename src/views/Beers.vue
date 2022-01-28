<template>
  <v-img :src="require('../assets/beers-bg-4.jpg')">
    <v-container fluid class="pa-16 px-4 pt-lg-4 px-lg-16">
      <v-data-iterator
        :loading="isLoading"
        :items="items"
        :items-per-page="getState('itemsPerPage')"
        :page="getState('page')"
        :sort-by="getState('sortBy')"
        :sort-desc="getState('sortDesc')"
        hide-default-footer
      >
        <template v-slot:header>
          <v-container class="rounded toolbar" fluid>
            <v-row align="center">
              <v-col cols="auto">
                <c-text-field
                  :search="getState('search')"
                  @input="searchChange"
                  clearable
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                />
              </v-col>
              <v-col cols="auto">
                <c-select
                  :value="getState('searchBy')"
                  hide-details
                  :items="getState('searchByOptions')"
                  @change="(value) => dispatchFetch(value, 'searchBy')"
                  label="Search by"
                />
              </v-col>
              <v-col cols="auto">
                <v-row align="center">
                  <v-col cols="auto">
                    <c-select
                      :value="getState('sortBy')"
                      hide-details
                      :items="getState('sortByOptions')"
                      @change="(value) => setValue({ value, key: 'sortBy' })"
                      prepend-inner-icon="mdi-sort"
                      label="Sort by"
                    />
                  </v-col>
                  <v-col cols="auto">
                    <c-btn-toggle
                      :value="getState('sortDesc')"
                      @change="
                        (value) => setValue({ value: !!value, key: 'sortDesc' })
                      "
                    >
                      <c-btn :value="false">
                        <v-icon>mdi-arrow-up</v-icon>
                      </c-btn>
                      <c-btn :value="true">
                        <v-icon>mdi-arrow-down</v-icon>
                      </c-btn>
                    </c-btn-toggle>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <v-progress-linear
          class="my-1"
          :active="isLoading"
          indeterminate
          color="blue darken-2"
        ></v-progress-linear>
        <template>
          <v-row>
            <v-col
              v-for="item in items"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <c-card>
                <div :style="getBeerColor(item)">
                  <v-card-title class="subheading font-weight-bold">
                    {{ item.name }}
                  </v-card-title>
                  <v-card-subtitle class="subheading font-weight-bold">
                    {{ item.tagline }}
                  </v-card-subtitle>
                </div>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item>
                    <v-list-item-content> abv: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.abv }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content> ibu: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.ibu }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </c-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-container class="rounded toolbar mt-2" fluid>
            <v-row align="center">
              <v-col cols="auto">
                <c-select
                  :value="getState('itemsPerPage')"
                  hide-details
                  :items="[5, 10, 25, 50, 80]"
                  @change="(value) => dispatchFetch(value, 'itemsPerPage')"
                  prepend-inner-icon="mdi-sort"
                  label="Items per page"
                />
              </v-col>

              <v-spacer />

              <v-col cols="auto">
                <span class="mr-4 grey--text">
                  Page {{ getState('page') }}
                </span>
                <c-btn
                  dark
                  :disabled="getState('page') == 1"
                  color="blue darken-3"
                  class="mr-1"
                  @click="dispatchFetch(getState('page') - 1, 'page')"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </c-btn>
                <c-btn
                  dark
                  :disabled="
                    getState('itemsPerPage') != getState('items').length
                  "
                  color="blue darken-3"
                  class="ml-1"
                  @click="dispatchFetch(getState('page') + 1, 'page')"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </c-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-data-iterator>
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
  // data: () => ({  }),
  computed: {
    ...mapGetters('beers', ['isLoading', 'items', 'getState']),
  },
  methods: {
    ...mapMutations('beers', ['setLoading', 'setValue']),
    ...mapActions('beers', ['fetchItems']),
    /**
     * Color de la cerveza segun el EBC (European Brewing Covention) unidad de color europea
     * https://mundoestrellagalicia.es/clasificacion-cervezas-segun-color/
     */
    getBeerColor({ ebc }) {
      if (ebc < 12) return { background: colors.amber.lighten2, color: '#000' };
      else if (ebc < 47) return { background: colors.red.darken4 };
      else return { background: '#000' };
    },
    dispatchFetch(value, key) {
      this.setValue({ value, key });

      this.fetchItems();
    },
    searchChange(value) {
      this.setValue({ value, key: 'search' });
      this.setValue({ value: 1, key: 'page' });

      this.debounceFetchItems();
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
.toolbar {
  background-color: #272727;
}
</style>
