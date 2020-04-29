// https://vuex.vuejs.org/en/mutations.html

export default {
  // 原始部分

  SET_BAR_IMAGE(state, payload) {
    state.barImage = payload
  },
  SET_DRAWER(state, payload) {
    state.drawer = payload
  },

  // notice

  setVisible: function(state, payload) {
    clearTimeout(state.timeout)
    state.visible = true
    state.color = payload.color
    state.content = payload.content
    state.timeout = setTimeout(() => {
      state.visible = false
    }, 2000)
  },

  // 地图部分
  // 设置用户标识
  setMobile: function(state, payload) {
    state.mobile = payload
  },
  // 导入地图实例
  setMapInstance: function(state, map) {
    state.mapInstance = map
  },
  setSelectPoint: function(state, selectPoint) {
    state.position = `${selectPoint.lat},${selectPoint.lng}`
    state.selectPoint = selectPoint
  },
  setLastMarker: function(state, lastMarker) {
    state.lastMarker = lastMarker
  },
  setLocation: function(state, location) {
    state.location = location
  },

  // 模板以及数据点信息
  setTemplates: function(state, payload) {
    state.templates = payload
  },
  putTemplates: function(state, payload) {
    state.templates.splice(payload.index, 1, { ...payload.data })
  },
  addTemplates: function(state, payload) {
    state.templates.push(payload)
  },
  delTemplates: function(state, payload) {
    state.templates.splice(payload, 1)
  },
  //
  // 设备部分

  setDevice: function(state, payload) {
    state.devices = [...payload]
  },
  putDevice: function(state, payload) {
    state.devices.splice(payload.index, 1, { ...payload.data })
  },
  addDevice: function(state, payload) {
    state.devices.push(payload)
  },

  delDevice: function(state, payload) {
    state.devices.splice(payload, 1)
  }
}
