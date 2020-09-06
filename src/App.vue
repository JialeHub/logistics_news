<template>
  <div id="app">
    <vue-head />
    <router-view v-wechat-title="$route.meta.title" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    VueHead: () => import("./views/layout/header/")
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100%;
}
</style>
