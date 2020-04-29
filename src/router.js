import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: '仪表盘',
          path: '',
          component: () => import('@/views/dashboard/Dashboard')
        },
        // Pages
        {
          name: '设备管理',
          path: 'pages/device',
          component: () => import('@/views/dashboard/pages/UserProfile')
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications')
        },
        {
          name: '模板管理',
          path: 'components/template',
          component: () => import('@/views/dashboard/component/Typography')
        },

        // Maps
        {
          name: '地图展示',
          path: 'maps/maps',
          component: () => import('@/views/dashboard/maps/Maps')
        },
        // Upgrade
        {
          name: '设置',
          path: 'config',
          component: () => import('@/views/dashboard/Upgrade')
        }
      ]
    }
  ]
})
