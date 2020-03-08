<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    const flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    this.$store.commit('setMobile', Boolean(flag))
  }
}
</script>
