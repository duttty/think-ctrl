// https://vuex.vuejs.org/en/mutations.html

export default {
  // 原始部分

  SET_BAR_IMAGE(state, payload) {
    state.barImage = payload
  },
  SET_DRAWER(state, payload) {
    state.drawer = payload
  },

  //

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
  // 添加设备部分

  // 设置设备
  setDevice: function(state, payload) {
    state.devices = [...payload]
  },

  // 从机部分

  // 设置被编辑从机的序号
  setEditIndex: function(state, payload) {
    state.editIndex = payload
  },
  // 设置正在编辑的从机信息
  setEditSlaver: function(state, payload) {
    state.editSlaver = { ...payload }
  },
  // 修改从机
  setSlaver: function(state, payload) {
    if (state.editIndex >= 0) {
      state.slavers.splice(state.editIndex, 1, { ...payload })
      return
    }
    state.slavers.push({ ...payload })
  },
  // 删除从机
  delSlaver: function(state, payload) {
    state.slavers.splice(payload, 1)
  }
}
