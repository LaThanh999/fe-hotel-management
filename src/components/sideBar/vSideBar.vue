<template>
  <v-list dense nav>
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import menus from "@/views/layouts/itemSidebar.js";
export default {
  name: "vSideBar",
  data: () => ({
    selectedItem: 1,
    items: menus,
  }),
};
</script>

<style lang="scss" scoped></style>
