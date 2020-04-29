// https://vuex.vuejs.org/en/actions.html
import { remote, local } from '../network'
export default {
  // 模板部分
  getTemplate: function(ctx) {
    const config = {
      url: 'v1/template',
      method: 'get',
      params: { username: ctx.state.user.username }
    }

    remote(config)
      .then(res => {
        const { data } = res
        if (data.code === 200) {
          ctx.commit('setTemplates', data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  postTemplate: function(ctx, payload) {
    const config = {
      url: 'v1/template',
      method: 'post',
      data: { username: ctx.state.user.username, ...payload.editedTemplate }
    }

    remote(config)
      .then(res => {
        const { data } = res
        if (data.code === 200) {
          payload.$msg.success('添加成功')
          ctx.commit('addTemplates', data.data)
          payload.dialogForm = false
        } else {
          payload.$msg.error(data.msg)
        }
      })
      .catch(err => console.log(err))
  },
  deleteTemplate: function(ctx, payload) {
    const config = {
      url: 'v1/template',
      method: 'delete',
      params: {
        username: ctx.state.user.username,
        id: payload.v.id
      }
    }
    remote(config)
      .then(({ data }) => {
        if (data.code === 200) {
          payload.call.$msg.success('删除模板成功')
          ctx.commit(
            'delTemplates',
            ctx.state.templates.indexOf(payload.v.item)
          )
        } else {
          payload.call.$msg.error(data.msg)
        }
      })
      .catch(err => console.log(err))
  },
  putTemplate: function(ctx, payload) {
    const config = {
      url: 'v1/template',
      method: 'put',
      data: { ...payload.editedTemplate }
    }
    remote(config).then(({ data }) => {
      if (data.code === 200) {
        ctx.commit('putTemplates', {
          index: payload.editedTemplateIndex,
          data: payload.editedTemplate
        })
        payload.$msg.success('修改数据点成功')
        payload.dialogForm = false
      } else {
        payload.$msg.error(data.msg)
      }
    })
  },

  // 设备部分

  // 获取设备
  getDevice: function(ctx) {
    const config = {
      url: 'v1/device',
      method: 'get',
      params: {
        username: ctx.state.user.username
      }
    }
    local(config)
      .then(({ data }) => {
        if (data.code === 200) {
          ctx.commit('setDevice', data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 删除设备
  deleteDevice: function(ctx, payload) {
    const config = {
      url: 'v1/device',
      method: 'delete',
      params: { deviceID: payload.v.id }
    }
    remote(config)
      .then(({ data }) => {
        if (data.code === 200) {
          payload.call.$msg.success('删除成功')
          ctx.commit('delDevice', ctx.state.devices.indexOf(payload.v))
        } else {
          payload.call.$msg.error(data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 添加设备
  postDevice: function(ctx, payload) {
    const config = {
      url: 'v1/device',
      method: 'post',
      data: { username: ctx.state.user.username, ...payload.editedDevice }
    }

    local(config).then(({ data }) => {
      if (data.code === 200) {
        ctx.commit('addDevice', data.data)
        payload.$msg.success('添加从机成功')
      } else {
        payload.$msg.error(data.msg)
      }
    })
  },
  // 更新设备
  putDevice: function(ctx, payload) {
    const config = {
      url: 'v1/device',
      method: 'put',
      data: { username: ctx.state.user.username, ...payload.editedDevice }
    }

    local(config).then(({ data }) => {
      if (data.code === 200) {
        ctx.commit('putDevice', {
          index: payload.editedDeviceIndex,
          data: data.data
        })
        payload.$msg.success('更新从机成功')
      } else {
        payload.$msg.error(data.msg)
      }
    })
  }
}
