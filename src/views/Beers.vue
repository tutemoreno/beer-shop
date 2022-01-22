<template>
  <v-img :src="require('../assets/beers-bg-4.jpg')">
    <v-container fluid class="pa-4 pt-16 pa-lg-16">
      <v-row class="pt-4 pt-lg-0">
        <v-col class="py-0" cols="12" xs="12" sm="4">
          <beer-text-field
            light
            :loading="isLoading"
            :value="filter"
            @input="dispatchFilter"
            label="Search"
            placeholder="Search..."
          />
        </v-col>
        <v-col class="py-0" cols="12" xs="12" sm="3">
          <beer-select
            light
            :items="filterByOptions"
            :value="filterBy"
            label="Filter by"
            @change="setFilterBy"
          ></beer-select>
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
            <div class="d-flex" @click="selectItem">
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
    <!-- <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle
                >Set the content filtering level to restrict apps that can be
                downloaded</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle
                >Require password for purchase or use password to restrict
                purchase</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle
                >Notify me about updates to apps or games that I
                downloaded</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle
                >Auto-update apps at any time. Data charges may
                apply</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle
                >Automatically add home screen widgets</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog> -->
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
  data: () => ({
    filterByOptions: [
      { text: 'Name', value: 'name' },
      { text: 'Tagline', value: 'tagline' },
    ],
  }),
  computed: {
    ...mapGetters('beers', ['isLoading', 'items', 'filter', 'filterBy']),
  },
  methods: {
    ...mapMutations('beers', [
      'setFilter',
      'setFilterBy',
      'setLoading',
      'setSelection',
    ]),
    ...mapActions('beers', ['fetchItems']),
    getBeerColor({ srm }) {
      if (srm < 6) return colors.amber.darken4;
      else if (srm < 24) return colors.red.darken4;
      else return '#000';
    },
    dispatchFilter(v) {
      this.setLoading(true);
      this.debounceFilter(v);
    },
    selectItem(v) {
      console.log(v);
    },
    debounceFilter: lodash.debounce(function (v) {
      this.setFilter(v);
      this.setLoading(false);
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
