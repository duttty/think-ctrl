<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-data-table
          :headers="headers"
          :items="templates"
          sort-by="id"
          fixed-header
          height="60vh"
          no-data-text="请新建模板"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-dialog v-model="dialogName" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">
                    新建模板
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="editedTemplate.templateName"
                      label="模板名称"
                      :error-messages="errorMsg"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="addTemplate">
                      确定
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- 数据点表 -->
              <v-dialog
                v-model="dialogForm"
                max-width="500px"
                scrollable
                @click:outside="close"
              >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card>
                    <v-card-title>
                      {{ switch1 ? '新建' : '编辑' }}数据点
                      <v-row>
                        <v-col cols="5">
                          <v-switch v-model="switch1" label="新建数据点" />
                        </v-col>
                        <v-col cols="7">
                          <v-select
                            :disabled="switch1"
                            :items="editedTemplate.dataPoints"
                            item-text="name"
                            return-object
                            label="选择要修改的数据点"
                            :rules="[
                              v => {
                                if (switch1) {
                                  return true
                                }
                                return !!v || '数据点不能为空'
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
                              v-model="editedTemplate.templateName"
                              label="模板名称"
                              required
                              :rules="[
                                v => !!v || '名字不能为空',
                                v =>
                                  (v && v.length <= 10) ||
                                  '名字不能超过10个字符'
                              ]"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedDataPoint.name"
                              label="数据点名称"
                              :rules="[
                                v => !!v || '名字不能为空',
                                v =>
                                  (v && v.length <= 10) ||
                                  '名字不能超过10个字符'
                              ]"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedDataPoint.dataType"
                              :items="selectData"
                              item-text="label"
                              item-value="type"
                              label="数据类型"
                              :rules="[
                                v => {
                                  if (v === 0 || v === 1) {
                                    return true
                                  }
                                  return '请选择数据类型'
                                }
                              ]"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedDataPoint.frequency"
                              type="number"
                              label="采集频率(s)"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedDataPoint.message"
                              label="采集指令"
                              :rules="[v => !!v || '采集指令不能为空']"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedDataPoint.unit"
                              label="单位"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="12">
                            <v-text-field
                              v-model="editedDataPoint.formula"
                              label="格式化公式"
                            />
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
            <v-icon small @click="deleteItem(item)">
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
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>
              操作说明
            </v-card-title>
          </v-img>

          <v-card-text>
            <span>采集指令:按modbus-rtu协议填写,省略从机地址位与CRC校验位。</span>
            <br>
            <br>
            <v-divider />
            <span>采集指令:按modbus-rtu协议填写,省略从机地址位与CRC校验位。</span>
            <br>
            <br>
            <v-divider />
            <span>采集公式:收到数据的处理公式，支持基本数学运算，使用v代表原始数据。</span>
            <v-divider />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    // 添加模板部分
    dialogName: false,
    // 添加数据点部分
    valid: false,
    dialogForm: false,
    editedTemplateIndex: -1,
    editedtDataPointIndex: -1,
    switch1: false,
    selectData: [
      { type: 0, label: '数值' },
      { type: 1, label: '开关' }
    ],
    editedDataPoint: {},
    editedTemplate: {
      dataPoints: []
    },
    headers: [
      {
        text: '模板ID',
        align: 'start',
        value: 'id',
        sortable: false
      },
      { text: '名称', value: 'templateName', sortable: false },
      { text: '修改时间', value: 'updatedAt', sortable: false },
      { text: '操作', value: 'actions', sortable: false }
    ]
  }),

  computed: {
    formTitle() {
      return this.editedTemplateIndex === -1 ? '新建模板' : '编辑模板'
    },
    errorMsg() {
      return this.editedTemplate.templateName ? '' : '名称不能为空'
    },
    templates() {
      return this.$store.state.templates
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.$store.dispatch('getTemplate')
  },

  methods: {
    // 添加模板
    addTemplate() {
      // 编辑信息初始化
      this.editedTemplateIndex = -1
      this.editedDataPointIndex = -1
      this.editedDataPoint = Object.assign({})
      if (!this.editedTemplate.templateName) {
        return
      }
      // 验证数据是否存在
      this.templates.map((v, idx) => {
        if (v.templateName === this.templateName) {
          return this.$msg({ color: 'error', content: '模板名称已存在' })
        }
      })
      this.$msg({ color: 'info', content: '请继续添加数据点' })

      // 关闭dialogName 打开dialogForm
      this.dialogName = false

      this.switch1 = true
      setTimeout(() => {
        this.dialogForm = true
      }, 200)
    },

    // 数据点部分

    editItem(item) {
      this.editedTemplateIndex = this.templates.indexOf(item)
      this.editedTemplate = Object.assign({}, item)
      this.dialogForm = true
    },
    changeSelect(v) {
      this.editedDataPoint = Object.assign({}, v)
      this.editedtDataPointIndex = this.editedTemplate.dataPoints.indexOf(v)
    },

    deleteItem(item) {
      confirm(`确定删除 ${item.templateName} 吗?`) &&
        this.$store.dispatch('deleteTemplate', { call: this, v: item })
    },

    commit() {
      // 判断是否为更新
      if (this.editedTemplateIndex >= 0) {
        return this.$store.dispatch('putTemplate', this)
      }
      this.$store.dispatch('postTemplate', this)
    },

    close() {
      this.dialogForm = false
      this.editedDataPoint = Object.assign({})
      this.editedTemplate = Object.assign({ dataPoints: [] })
      this.editedTemplateIndex = -1
      this.switch1 = false
    },

    save() {
      // 字符串转为数字、
      this.editedDataPoint.frequency = parseInt(this.editedDataPoint.frequency)
      // 验证数据
      if (this.$refs.form.validate()) {
        // 为添加数据点
        if (this.switch1) {
          this.editedTemplate.dataPoints.push({ ...this.editedDataPoint })
        } else {
          this.editedTemplate.dataPoints.splice(this.editedtDataPointIndex, 1, {
            ...this.editedDataPoint
          })
        }
      }

      // 调整开关至修改数据点
      this.switch1 = false
    }
  }
}
</script>
