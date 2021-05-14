<template>
  <v-form>
    <v-container>
      <v-row class="mt-4">
        <v-col cols="2" sm="2"></v-col>
        <v-col cols="8" sm="8">
          <v-text-field label="Identity Card" outlined clearable></v-text-field>
        </v-col>
        <v-col cols="2" sm="2"></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "vInputIdentityCard",
};
</script>

<style scoped></style>
