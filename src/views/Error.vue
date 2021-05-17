<template>
  <v-card class="body" >
    <div class="page"></div>
  </v-card>
</template>

<script>
export default {
  name: "Error.vue",
};
</script>

<style scoped lang="scss">
.body{
  height: 100%;
  margin: 0;
  .page{
    background-image: url("../assets/error.jpg");
    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
