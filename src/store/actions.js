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
      data: { username: ctx.state.user.username, ...payload.data }
    }
    remote(config)
      .then(res => {
        const { data } = res
        if (data.code === 200) {
          payload.call.$message.success(`添加成功`)
          ctx.commit('addTemplates', data.data)
        } else {
          payload.call.$message.error(data.msg)
        }
      })
      .catch(err => console.log(err))
  },
  deleteTemplate: function(ctx, payload) {
    const { v, call } = payload
    const config = {
      url: 'v1/template',
      method: 'delete',
      params: { username: ctx.state.user.username, id: v.id }
    }
    remote(config)
      .then(({ data }) => {
        if (data.code === 200) {
          call.success('删除模板成功')
          ctx.commit('delTemplates', v.idx)
        } else {
          call.error(data.msg)
        }
      })
      .catch(err => console.log(err))
  },
  putTemplate: function(ctx, payload) {
    const config = {
      url: 'v1/template',
      method: 'put',
      data: payload.data
    }
    remote(config).then(({ data }) => {
      if (data.code === 200) {
        ctx.commit('putTemplates', {
          index: payload.call.editTableIndex,
          data: data.data
        })
        payload.call.$message.success('修改数据点成功')
      } else {
        payload.this.$message.error(data.msg)
      }
    })
  },

  // 设备部分
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

  // 添加设备 更新设备
  postDevice: function(ctx, payload) {
    const config = {
      url: 'v1/device',
      method: 'post',
      data: payload.data
    }

    local(config).then(({ data }) => {
      if (data.code === 200) {
        payload.call.$message.success('添加从机成功')
      } else {
        payload.call.$message.error(data.msg)
      }
    })
  }
}
