<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-data-table
          class="elevation-2"
          :headers="headers"
          :items="devices"
          sort-by="id"
          fixed-header
          height="60vh"
          no-data-text="请新建设备"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-dialog v-model="dialogName" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">
                    新建设备
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="editedDevice.deviceName"
                      label="设备名称"
                      :error-messages="errorMsg"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="addDevice">
                      确定
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- 从机表 -->
              <v-dialog
                v-model="dialogForm"
                max-width="500px"
                scrollable
                @click:outside="close"
              >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card>
                    <v-card-title>
                      {{ switch1 ? '新建' : '编辑' }}从机
                      <v-row>
                        <v-col cols="5">
                          <v-switch v-model="switch1" label="新建从机" />
                        </v-col>
                        <v-col cols="7">
                          <v-select
                            :disabled="switch1"
                            :items="editedDevice.slavers"
                            item-text="slaverName"
                            return-object
                            label="选择要修改的从机"
                            :rules="[
                              v => {
                                if (switch1) {
                                  return true
                                }
                                return !!v || '从机不能为空'
                              }
                            ]"
                            @change="changeSelect"
                          />
                        </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row justify="center">
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedDevice.deviceName"
                              label="设备名称"
                              required
                              :rules="[
                                v => !!v || '名字不能为空',
                                v =>
                                  (v && v.length <= 6) || '名字不能超过10个字符'
                              ]"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="8">
                            <v-select
                              v-model="tS"
                              no-data-text="请添加模板"
                              :items="$store.state.templates"
                              item-text="templateName"
                              item-value="id"
                              label="绑定模板"
                              return-object
                              :rules="[
                                v => {
                                  if (v) {
                                    return true
                                  }
                                  return '请选择数据模板'
                                }
                              ]"
                              @change="selectTemplate"
                            />
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="editedSlaver.slaverName"
                              label="从机名称"
                              :rules="[
                                v => !!v || '名字不能为空',
                                v =>
                                  (v && v.length <= 6) || '名字不能超过6个字符'
                              ]"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedSlaver.slaverIndex"
                              label="从机地址"
                              type="number"
                            />
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              v-model="editedDevice.devID"
                              label="设备ID"
                              :rules="[
                                v => v.length === 8 || '设备ID长度为8位'
                              ]"
                            />
                          </v-col>
                          <v-col cols="8">
                            <v-text-field v-model="location" label="设备地址" />
                          </v-col>
                          <v-col cols="4">
                            <v-bottom-sheet v-model="sheet">
                              <template v-slot:activator="{ on }">
                                <v-btn color="orange" dark v-on="on">
                                  打开地图
                                </v-btn>
                              </template>
                              <v-sheet
                                class="text-center"
                                :height="$store.state.mobile ? '60vh' : '30vh'"
                              >
                                <myMaps />
                              </v-sheet>
                            </v-bottom-sheet>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn color="success darken-1" text @click="commit">
                        提交
                      </v-btn>
                      <v-spacer />
                      <v-btn color="blue darken-1" text @click="save">
                        保存修改
                      </v-btn>
                      <v-btn color="error darken-1" text @click="close">
                        取消
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon class="mr-2" small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://bing.ioliu.cn/v1?w=320&h=240"
          >
            <v-card-title>
              操作说明
            </v-card-title>
          </v-img>

          <v-card-text>
            <span>设备ID:填写8位数字。</span>
            <br>
            <br>
            <v-divider />
            <span>从机地址:填写Modbus协议的从机地址数字。</span>
            <br>
            <br>
            <v-divider />
            <span>设备地址:点击打开地图从地图上选取，也可以手动输入。</span>
            <v-divider />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import myMaps from '../components/core/MyMaps'
export default {
  components: {
    myMaps
  },
  data: () => ({
    // 添加模板部分
    dialogName: false,
    sheet: false,
    // 添加从机点部分
    tS: {},
    valid: false,
    dialogForm: false,
    editedDeviceIndex: -1,
    editedtSlaverIndex: -1,
    switch1: false,
    editedSlaver: {
      slaverName: ''
    },
    editedDevice: {
      slavers: [],
      deviceName: '',
      devID: ''
    },
    headers: [
      {
        text: '设备ID',
        align: 'start',
        value: 'devID',
        sortable: false
      },
      { text: '名称', value: 'deviceName', sortable: false },
      { text: '修改时间', value: 'updatedAt', sortable: false },
      { text: '操作', value: 'actions', sortable: false }
    ]
  }),

  computed: {
    location: {
      set: function(v) {
        this.$store.commit('setLocation', v)
      },
      get: function() {
        return this.$store.state.location
      }
    },
    formTitle() {
      return this.editedDeviceIndex === -1 ? '新建设备' : '编辑设备'
    },
    errorMsg() {
      return this.editedDevice.deviceName ? '' : '名称不能为空'
    },
    devices() {
      return this.$store.state.devices
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.$store.dispatch('getTemplate')
    this.$store.dispatch('getDevice')
  },

  methods: {
    // 添加模板
    addDevice() {
      // 编辑信息初始化
      this.editedDeviceIndex = -1
      this.editedSlaverIndex = -1
      this.editedSlaver = Object.assign({ slaverName: '' })
      if (!this.editedDevice.deviceName) {
        return
      }
      // 验证数据是否存在
      this.devices.map((v, idx) => {
        if (v.deviceName === this.deviceName) {
          return this.$msg({ color: 'error', content: '设备名称已存在' })
        }
      })
      this.$msg({ color: 'info', content: '请继续添加从机' })

      // 关闭dialogName 打开dialogForm
      this.dialogName = false

      this.switch1 = true
      setTimeout(() => {
        this.dialogForm = true
      }, 200)
    },

    // 从机部分

    // 选中模板
    selectTemplate(v) {
      this.editedSlaver.templateID = v.id
      this.editedSlaver.templateName = v.templateName
    },
    editItem(item) {
      this.editedDeviceIndex = this.devices.indexOf(item)
      this.editedDevice = Object.assign({}, item)
      this.dialogForm = true
    },
    changeSelect(v) {
      this.editedSlaver = Object.assign({}, v)
      this.tS = Object.assign({
        id: v.templateID,
        templateName: v.templateName
      })
      this.$store.commit('setLocation', this.editedDevice.addr)
      this.$store.state.position = this.editedDevice.position
      this.editedtSlaverIndex = this.editedDevice.slavers.indexOf(v)
    },

    deleteItem(item) {
      confirm(`确定删除 ${item.deviceName} 吗?`) &&
        this.$store.dispatch('deleteDevice', { call: this, v: item })
    },

    commit() {
      // 判断是否为更新
      if (this.editedDeviceIndex >= 0) {
        return this.$store.dispatch('putDevice', this)
      }
      this.$store.dispatch('postDevice', this)
      this.close()
    },

    close() {
      this.dialogForm = false
      this.editedSlaver = Object.assign({ slaverName: '' })
      this.editedDevice = Object.assign({
        slavers: [],
        deviceName: '',
        devID: ''
      })
      this.editedDeviceIndex = -1
      this.switch1 = false
    },

    save() {
      // 验证数据
      if (this.$refs.form.validate()) {
        // 添加position
        this.editedDevice.position = this.$store.state.position
        this.editedDevice.addr = this.location
        this.editedSlaver.slaverIndex = parseInt(this.editedSlaver.slaverIndex)
        // 为添加数据点
        if (this.switch1) {
          this.editedDevice.slavers.push({ ...this.editedSlaver })
        } else {
          this.editedDevice.dataPoints.splice(this.editedtSlaverIndex, 1, {
            ...this.editedSlaver
          })
        }
      }

      // 调整开关至修改数据点
      this.switch1 = false
    }
  }
}
</script>
