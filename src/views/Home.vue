<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6 box-header">
      <span class="title-page mt-4 mb-4">HOTEL MANAGEMENT</span>
    </v-card-title>
    <div class="body mt-3">
      <v-row class="mx-2 pa-4">
        <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped lang="scss">
.body {
  background: #9e9e9e75;
}
</style>
