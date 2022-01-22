<template>
  <v-list v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
  </v-list>
</template>
<script>
export default {
  name: 'BeerList',
  inject: ['isMobile'],
  props: {
    dense: {
      type: Boolean,
      default() {
        return this.isMobile;
      },
    },
  },
};
</script>
