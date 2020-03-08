<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              设备管理
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>

          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-select
                    v-model="devType"
                    :items="sList"
                    item-text="name"
                    item-value="id"
                    label="选择设备类型"
                    placeholder="设备类型"
                    hint="设备类型"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    class="purple-input"
                    label="设备名"
                    v-model="devName"
                    rounded
                    outlined
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    class="purple-input"
                    label="设备ID"
                    v-model="devID"
                    rounded
                    outlined
                  />
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    label="经度"
                    class="purple-input"
                    v-model="position.lng"
                  />
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    label="纬度"
                    class="purple-input"
                    v-model="position.lat"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="位置"
                    class="purple-input"
                    disabled
                    v-model="localName"
                  />
                </v-flex>
                <v-flex xs12 md2>
                  <el-button
                    @click="drawer = true"
                    style="float:right;"
                    type="primary"
                  >
                    {{ this.drawer ? '关闭' : '打开' }}地图
                  </el-button>

                  <el-drawer
                    :visible.sync="drawer"
                    :with-header="false"
                    direction="btt"
                    size="40%"
                  >
                    <myMaps></myMaps>
                  </el-drawer>
                </v-flex>

                <!-- 添加从机部分 -->
                <v-flex xs12 md12>
                  <el-dialog
                    :visible.sync="dialogShow"
                    center
                    :title="showTitle"
                  >
                    <add-slaver @showDialog="closeDialog" />
                  </el-dialog>
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    circle
                    @click="addSlaver"
                  ></el-button>
                </v-flex>

                <!-- 从机部分 -->
                <el-table
                  size="mini"
                  :data="tableData"
                  max-height="300"
                  border
                  stripe
                  style="width: 100vw"
                >
                  <el-table-column prop="slaverName" label="从机名称">
                  </el-table-column>
                  <el-table-column prop="slaverIndex" label="从机地址">
                  </el-table-column>
                  <el-table-column prop="option" label="操作">
                    <template slot-scope="scope">
                      <div style="float:left;">
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)"
                          >编辑</el-button
                        >
                        &nbsp;
                      </div>
                      <div style="float:left;">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)"
                          >删除</el-button
                        >
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="devCommit"
                  >
                    添加设备
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
            <!-- 右边说明文档部分 -->
          </v-form>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human
              foundation in truth And I love you like Kanye loves Kanye I love
              Rick Owens’ bed design but the back is...
            </p>

            <v-btn color="success" rounded class="mr-0">
              Follow
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import myMaps from '../components/core/MyMaps'
import addSlaver from '../components/core/AddSlaver'
export default {
  components: {
    myMaps,
    addSlaver
  },
  data() {
    return {
      // 添加从机部分
      showTitle: '',
      dialogShow: false,

      // 地图部分
      drawer: false,
      // 设备部分
      devType: 0,
      devName: '',
      devID: '',
      sList: [
        { name: '默认', id: 0 },
        { name: 'TCP', id: 1 },
        { name: 'UDP', id: 2 },
        { name: '串口', id: 3 }
      ]
    }
  },
  methods: {
    // TABS
    handleEdit(index, row) {
      this.showTitle = `修改从机 ${row.slaverIndex} `
      this.$store.commit('setEditIndex', index)
      this.$store.commit('setEditSlaver', row)
      this.dialogShow = true
    },
    handleDelete(index, row) {
      this.$message.success(`删除从机 ${row.slaverIndex} 成功`)
      this.$store.commit('delSlaver', index)
    },

    // dialog 方法
    // 传入dialog 的方法
    closeDialog(w) {
      this.dialogShow = w
    },
    diagClose() {
      // 重置编辑序号
      this.$store.commit('setEditIndex', -1)
      this.$store.commit('setEditSlaver', {})
    },
    // 添加从机
    addSlaver() {
      // 显示内容
      this.showTitle = '添加从机'
      // 添加位 -1
      this.$store.commit('setEditIndex', -1)
      // 打开dialog
      this.dialogShow = true
    },

    // 添加设备
    devCommit() {
      // 格式化数据
      const data = {
        addr: this.localName,
        devID: this.devID,
        deviceName: this.devName,
        deviceType: this.devType,
        position: `${this.position.lng},${this.position.lat}`,
        slavers: this.$store.state.slavers,
        username: this.$store.state.user.username
      }

      this.$store.dispatch('postDevice', { data: { ...data }, call: this })
    }
  },
  created() {
    this.$store.dispatch('getTemplate')
  },
  computed: {
    position: function() {
      return this.$store.state.selectPoint
    },
    localName: function() {
      return this.$store.getters.addr
    },
    tableData: function() {
      return this.$store.state.slavers
    }
  }
}
</script>
