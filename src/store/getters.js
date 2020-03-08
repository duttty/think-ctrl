// https://vuex.vuejs.org/en/getters.html

export default {
  addr: function(state) {
    const { city, district, street, streetNumber } = state.location
    return city + district + street + streetNumber
  }
}
