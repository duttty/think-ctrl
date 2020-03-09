<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <base-material-card
          color="blue"
          title="模板管理"
          text="Complete your profile"
        >
          <!-- 模板表格部分 -->
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md12>
                <el-button round plain type="primary" @click="addTemp">
                  <i class="el-icon-plus" /> 添加模板
                </el-button>
              </v-flex>

              <!-- 添加数据点部分 -->
              <el-dialog
                title="数据点管理"
                inline
                :visible.sync="dialogFormVisible"
                :width="$store.state.mobile ? '70vw' : '50vw'"
                center
                @close="closeDialog"
              >
                <v-container py-0>
                  <v-layout wrap />
                  <v-flex xs12 md12>
                    <el-select
                      v-model="selectValue"
                      size="mini"
                      placeholder="请选择数据点"
                      @change="changeSelect"
                    >
                      <el-option
                        v-for="(item, idx) in options"
                        :key="idx"
                        :label="item.name"
                        :value="idx"
                      />
                    </el-select>
                  </v-flex>
                  <v-flex xs12 md12>
                    <el-form
                      ref="form"
                      :model="form"
                      inline
                      size="mini"
                      :rules="rules"
                    >
                      <el-form-item prop="name" label="数据点名称:">
                        <el-input
                          v-model="form.name"
                          autocomplete="off"
                        />
                      </el-form-item>

                      <el-form-item prop="message" label="采集指令:">
                        <el-input
                          v-model="form.message"
                          autocomplete="off"
                        />
                      </el-form-item>
                      <el-form-item prop="frequency" label="采集频率:">
                        <el-select
                          v-model="form.frequency"
                          placeholder="请选择采集频率"
                        >
                          <el-option label="不采集" :value="0" />
                          <el-option label="一分钟" :value="60" />
                          <el-option label="五分钟" :value="60 * 5" />

                          <el-input
                            v-model="form.frequency"
                            placeholder="自定义(s)"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="格式化公式:">
                        <el-input
                          v-model="form.formula"
                          autocomplete="off"
                        />
                      </el-form-item>
                      <el-form-item prop="dataType" label="数据点类型:">
                        <el-select
                          v-model="form.dataType"
                          placeholder="请选择数据点类型"
                        >
                          <el-option label="数值" :value="0" />
                          <el-option label="开关" :value="1" />
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="formSave('form')">
                        保存更改
                      </el-button>
                      <el-button
                        type="danger"
                        :disabled="selectValue ? false : true"
                        @click="formCancel"
                      >
                        删除数据点
                      </el-button>
                      <el-button type="success" @click="formCommit('form')">
                        提交更改
                      </el-button>
                    </div>
                  </v-flex>
                </v-container>
              </el-dialog>

              <!-- 模板表格部分 -->
              <v-flex>
                <el-table :data="tableData" height="40vh">
                  <el-table-column prop="templateID" label="模板ID">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">
                        {{ scope.row.id }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="templateName" label="模板名称">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <el-tag size="medium">
                          数据点数目:
                          {{
                            scope.row.dataPoints
                              ? scope.row.dataPoints.length
                              : 0
                          }}
                        </el-tag>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">
                            {{ scope.row.templateName }}
                          </el-tag>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)"
                      >
                        编辑
                      </el-button>

                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                      >
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </v-flex>
            </v-layout>
          </v-container>
        </base-material-card>
      </v-flex>
      <!-- 数据点部分 -->
      <v-flex xs12 md4>
        <base-material-card color="blue" title="数据点" text="编辑数据点" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      addTemplate: {},
      selectValue: 0,
      options: [],
      dialogFormVisible: false,
      form: {},
      editTableIndex: 0,
      rules: {
        name: [
          { required: true, message: '请输入数据点名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '请输入采集指令', trigger: 'blur' }
        ],
        dataType: [
          { required: true, message: '请选择数据类型', trigger: 'blur' }
        ],
        frequency: [
          { required: true, message: '请选择采集频率', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    tableData: function() {
      return this.$store.state.templates
    }
  },
  created: function() {
    this.$store.dispatch('getTemplate')
  },
  methods: {
    // 数据点部分
    changeSelect(v) {
      // v 为pointID
      this.form = { ...this.options[v] }
    },
    closeDialog() {
      this.form = {}
      this.selectValue = 0
    },

    // 保存数据点
    formSave(formName) {
      // 验证表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改数据点
          if (this.selectValue) {
            this.options.splice(this.selectValue, 1, { ...this.form })

            return
          }
          // 添加数据点
          // 添加数据点至options
          this.options.push({ ...this.form })
          // 选中新加的点
          this.selectValue++
        }
        return false
      })
    },
    // 提交模板表单
    formCommit(formName) {
      // 修改数据点
      if (this.addTemplate.id) {
        this.$store.dispatch('putTemplate', {
          data: { ...this.addTemplate, dataPoints: this.options.slice(1) },
          call: this
        })
      } else {
        // 添加模板
        this.$store.dispatch('postTemplate', {
          data: { ...this.addTemplate, dataPoints: this.options.slice(1) },
          call: this
        })
      }
      // dispatch中关闭dialog ?
      this.dialogFormVisible = false
    },
    formCancel() {
      // 删除数据点
      this.options.splice(this.selectValue, 1)
      this.selectValue = 0
    },
    // 模板部分
    addTemp() {
      this.$prompt('请输入模板名称:', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        inputPattern: /^[^\s]+$/,
        inputErrorMessage: '名称不正确'
      })
        .then(({ value }) => {
          // 缓存模板
          this.addTemplate = { templateName: value }
          // 更新diag数据
          this.selectValue = 0
          this.options = [{ name: '新建数据点', id: 0 }]
          // 打开dialog
          this.dialogFormVisible = true
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消编辑'
          })
        })
    },
    handleDelete(index, row) {
      this.$store.dispatch('deleteTemplate', {
        v: { idx: index, id: row.id },
        call: this.$message
      })
    },
    handleEdit(index, row) {
      // 修改编辑数据点
      this.options = [{ name: '新建数据点', id: 0 }, ...row.dataPoints]
      // 给addTemplate 添加 名字和 id
      this.addTemplate.templateName = this.tableData[index].templateName
      this.addTemplate.id = this.tableData[index].id
      this.editTableIndex = index
      this.dialogFormVisible = true
    }
  }
}
</script>
