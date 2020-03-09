<template>
  <v-content>
    <router-view />

    <dashboard-core-footer v-show="showFooter" />
  </v-content>
</template>

<script>
export default {
  name: 'DashboardCoreView',

  components: {
    DashboardCoreFooter: () => import('./Footer')
  },
  computed: {
    showFooter: function() {
      if (
        this.$route.path === '/' ||
        this.$route.path === '/maps/google-maps'
      ) {
        return false
      }
      return true
    }
  }
}
</script>
