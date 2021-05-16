<template>
  <section>
    <v-nav-bar></v-nav-bar>
    <v-navigation-drawer class="sidebar" app>
      <v-list-item @click="clickToHome" class="sidebar-header d-flex align-center justify-center">
        <v-icon class="mr-2">mdi-home-variant</v-icon>
        <v-list-item-content class="project-name">
          <v-list-item-title>Hotel Management</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-side-bar></v-side-bar>
    </v-navigation-drawer>
    <v-main>
      <div class="ma-4">
        <router-view></router-view>
      </div>
    </v-main>
  </section>
</template>

<script>
import VSideBar from "../../components/sideBar/vSideBar";
import VNavBar from "../../components/navBar/vNavBar";
export default {
  name: "Main",
  components: { VNavBar, VSideBar },
  data: () => ({}),
  methods: {
    clickToHome(){
      this.$router.push("/");
    }
    }
};
</script>

<style scoped lang="scss">
.sidebar {
  background: var(--main-sideBar-color) !important;
  &-header {
    height: 64px;
    border-bottom: 1px solid #3333;
    background: var(--title-siderBar-color) !important;
  }
}
</style>
