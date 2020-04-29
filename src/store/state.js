// https://vuex.vuejs.org/en/state.html

export default {
  // 原始部分
  barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
  barImage:
    'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
  drawer: null,

  // 自定义部分

  // notice
  visible: false,
  color: 'success',
  content: '',
  timeout: 0,

  // 移动端?

  mobile: false,
  //
  // 地图部分
  mapInstance: '',
  selectPoint: '',
  lastMarker: '',
  location: '',
  position: '',
  // 网络部分
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjM4MTE2Mjc5NyIsInBhc3N3b3JkIjoiMTIzNDU2IiwiZXhwIjoxNTgzMjE5Mjk5LCJpc3MiOiJtc2VydmVyIn0.8N_2QEeqx-f2MrwDtc6x9S83rxP135Z6O7dpob3bG_A',
  user: { username: '381162797', password: '123456' },
  // 用户模板列表
  templates: [],
  //
  // 设备部分

  // 用户设备列表
  devices: [],

  // 添加设备部分
  // 编辑从机数组的index
  editIndex: -1,
  // 正在编辑的从机信息
  editSlaver: {},
  // 要添加的从机
  slavers: []
}
