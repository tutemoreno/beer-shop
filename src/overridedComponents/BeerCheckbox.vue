<template>
  <v-checkbox v-bind="{ ...$attrs, ...$props }" v-on="$listeners" />
</template>
<script>
export default {
  name: 'BeerCheckbox',
  inject: ['isMobile'],
  props: {
    color: {
      type: String,
      default: 'primary',
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
