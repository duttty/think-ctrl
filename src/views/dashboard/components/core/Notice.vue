<template>
  <v-snackbar v-model="visible" :color="color" top>
    {{ content }}
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    visible: function() {
      return this.$store.state.visible
    },
    color: function() {
      return this.$store.state.color
    },
    content: function() {
      return this.$store.state.content
    }
  }
}
</script>
