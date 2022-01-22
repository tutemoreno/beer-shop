<template>
  <v-select v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
  </v-select>
</template>
<script>
export default {
  name: 'BeerSelect',
  inject: ['isMobile'],
  props: {
    outlined: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default() {
        return this.isMobile;
      },
    },
  },
};
</script>
