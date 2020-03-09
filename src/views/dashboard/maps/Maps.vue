<template>
  <v-container id="google-maps" fluid>
    <myMaps height="90vh" width="100%" />
  </v-container>
</template>

<script>
import myMaps from '../components/core/MyMaps.vue'
export default {
  components: {
    myMaps
  }
}
</script>
