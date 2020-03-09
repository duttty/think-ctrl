<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
    <el-form-item prop="slaverName">
      <v-text-field
        v-model="ruleForm.slaverName"
        class="mr-4 purple-input"
        label="从机名称"
        color="purple"
      />
    </el-form-item>
    <el-form-item prop="slaverIndex">
      <v-text-field
        v-model="ruleForm.slaverIndex"
        class="mr-4 purple-input"
        label="从机地址"
        color="purple"
      />
    </el-form-item>
    <el-form-item prop="templateID">
      <v-select
        v-model="ruleForm.templateID"
        :items="template"
        item-text="templateName"
        item-value="id"
        label="选择模板"
        outlined
      />
    </el-form-item>
    <v-btn style="float:right;" fab color="indigo" @click="commit('ruleForm')">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </el-form>
</template>

<script>
export default {
  prop: {
    showDialog: {
      type: Function
    }
  },
  data() {
    return {
      ruleForm: this.$store.state.editSlaver,
      rules: {
        name: [{ required: true, message: '请输入从机名称', trigger: 'blur' }],
        templateID: [
          { required: true, message: '请选择模板', trigger: 'blur' }
        ],
        slaverIndex: [
          { required: true, message: '请输入从机地址', trigger: 'blur' },
          { min: 1, max: 2, message: '地址在 1 - 99 之间', trigger: 'blur' }
        ]
      },
      template: [...this.$store.state.templates],
      select: ''
    }
  },
  methods: {
    // 选择模板时
    // changeSelect(v, item) {
    //   console.log(v, item)
    // },
    commit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 添加templateName
          for (const v of this.template) {
            // 加入模板名称
            if (v.id === this.ruleForm.templateID) {
              this.ruleForm.templateName = v.templateName
              break
            }
          }
          const temp = { ...this.ruleForm }
          temp.slaverIndex = parseInt(temp.slaverIndex)
          // 验证从机是否存在
          for (const v of this.$store.state.slavers) {
            if (v.slaverIndex === temp.slaverIndex) {
              if (this.$store.state.editIndex >= 0) {
                if (
                  this.slavers[this.$store.state.editIndex].slavers ===
                  v.slaverIndex
                ) {
                  break
                }
              }
            }
            this.$message.error(`从机 ${v.slaverIndex}已经存在`)
          }
          // 存入设备
          this.$store.commit('setSlaver', temp)
          this.$emit('showDialog', true)
          this.$message.success('添加成功')
          if (this.$store.state.editIndex >= 0) {
            this.$message.success('修改成功')
            this.$emit('showDialog', false)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style></style>
