<template>
  <v-card v-bind="{ ...$attrs, ...$props }">
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
  </v-card>
</template>
<script>
export default {
  name: 'CCard',
  props: {
    elevation: {
      type: Number,
      default: 24,
    },
  },
};
</script>
