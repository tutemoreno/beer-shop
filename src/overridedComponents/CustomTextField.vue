<template>
  <v-text-field v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
  </v-text-field>
</template>
<script>
export default {
  name: 'CTextField',
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
