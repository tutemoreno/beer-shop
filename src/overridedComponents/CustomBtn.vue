<template>
  <v-btn v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <slot />
  </v-btn>
</template>
<script>
export default {
  name: 'CBtn',
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
