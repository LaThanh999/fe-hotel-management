<template>
  <v-overlay style="z-index: 1000000000" :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: "vLoading",
  props: {
    loading: Boolean,
  },
};
</script>

<style scoped></style>
