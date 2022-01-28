<template>
  <v-btn-toggle v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <slot />
  </v-btn-toggle>
</template>
<script>
export default {
  name: 'CBtnToggle',
  inject: ['isMobile'],
  props: {
    outlined: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default() {
        return this.isMobile;
      },
    },
    elevation: {
      type: Number,
      default: 24,
    },
  },
};
</script>
