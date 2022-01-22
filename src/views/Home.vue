<template>
  <div>
    <v-img
      height="500"
      class="d-flex align-center"
      :src="require('../assets/beers-bg-3.jpg')"
    >
      <div
        class="home-top d-flex flex-column align-center justify-center text-center"
      >
        <v-avatar size="125">
          <v-img :src="require('../assets/duff-logo.jpg')"></v-img>
        </v-avatar>
        <p class="text-h1 font-weight-bold">DUFF's Brewery</p>
        <p class="text-h5 font-weight-bold">¡Que elegancia la de francia!</p>
      </div>
    </v-img>
    <div class="d-flex align-center justify-center text-center">
      <p class="py-8">
        Bueno, cerebro, yo no te agrado y tu no me agradas… Sacame de esta y
        podré seguirte matando con cerveza
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>
<style lang="scss">
.home-top {
  text-shadow: 2px 2px 2px black;
}
</style>
