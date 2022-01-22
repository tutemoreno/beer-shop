<template>
  <v-app>
    <v-app-bar
      :class="isMobile ? 'd-flex justify-end' : null"
      app
      :clipped-right="isMobile"
      :clipped-left="!isMobile"
      hide-on-scroll
      :dense="isMobile"
      v-if="isMobile"
    >
      <beer-btn
        :elevation="0"
        :small="false"
        :outlined="false"
        icon
        @click="openDrawer"
      >
        <v-icon> mdi-menu </v-icon>
      </beer-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      :right="isMobile"
      v-model="isDrawerOpen"
      :expand-on-hover="!isMobile"
    >
      <beer-list dense>
        <v-list-item class="d-flex justify-center">
          <v-list-item-avatar>
            <v-img :src="require('./assets/duff-logo.jpg')"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </beer-list>

      <v-divider></v-divider>

      <beer-list nav dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/beers">
          <v-list-item-icon>
            <v-icon>mdi-beer</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Beers</v-list-item-title>
        </v-list-item>

        <v-divider />

        <v-list-item
          link
          @click="openTab('https://github.com/tutemoreno/bamboo-app-vue')"
        >
          <v-list-item-icon>
            <v-icon>mdi-github</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Repository</v-list-item-title>
        </v-list-item>

        <v-list-item
          link
          @click="openTab('https://www.linkedin.com/in/matias-moreno')"
        >
          <v-list-item-icon>
            <v-icon>mdi-linkedin</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Linkedin</v-list-item-title>
        </v-list-item>
      </beer-list>
    </v-navigation-drawer>

    <v-main class="pa-0">
      <v-container fluid class="pa-0">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { vuetifyUtils } from '@/mixins';

export default {
  name: 'App',
  mixins: [vuetifyUtils],
  provide() {
    return { isMobile: this.isMobile };
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isDrawerOpen: {
      get: function () {
        return !this.isMobile || this.drawer;
      },
      set: function (v) {
        this.drawer = v;
      },
    },
  },
  methods: {
    openDrawer() {
      this.drawer = true;
    },
    openTab(url) {
      window.open(url, '_blank');
    },
  },
};
</script>
<style lang="scss">
.fw {
  width: 100%;
}
</style>
