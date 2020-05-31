<template>
  <div class="dashboard_container">
    <div class="card_box">
      <div class="left">
        <div class="card_wrap">
          <div class="r_card primary">
            <div class="item_header">
              <div class="title">
                室温
              </div>
            </div>
            <div class="item_content">
              <div class="chart_wrap">
                <ve-gauge
                  :data="roomTemp"
                  :settings="roomSetting"
                  height="240px"
                />
              </div>
            </div>
          </div>
          <div class="r_card  primary">
            <div class="item_header">
              <div class="title">
                光照度
              </div>
            </div>
            <div class="item_content">
              <div class="tool">
                <div class="t">
                  <div class="i">
                    当前值：54
                  </div>
                  <div class="r"><v-icon>mdi-arrow-up</v-icon>38%</div>
                </div>
              </div>
              <div class="chart_wrap chart_wrap1">
                <ve-line
                  :data="chartData2"
                  :extend="chartExtend2"
                  :settings="chartSettings"
                  height="240px"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="r_card  primary">
          <div class="item_weather">
            <div class="weather_header">
              <div class="weather_header_left">
                <div class="city">
                  Shen Zhen
                </div>
                <div class="">
                  Mon 29 May
                </div>
                <div class="city wd">
                  31℃
                </div>
              </div>
              <div class="weather_header_right">
                <v-icon>mdi-spin mdi-weather-sunny</v-icon>
              </div>
            </div>
            <div class="weather_week">
              <div class="day_item">
                <div class="lb">
                  Sun
                </div>
                <v-icon>mdi-weather-sunny</v-icon>
                <div class="wd">
                  31℃
                </div>
              </div>
              <div class="day_item">
                <div class="lb">
                  Mon
                </div>
                <v-icon>mdi-weather-hazy</v-icon>
                <div class="wd">
                  35℃
                </div>
              </div>
              <div class="day_item">
                <div class="lb">
                  Tues
                </div>
                <v-icon>mdi-weather-partly-snowy</v-icon>
                <div class="wd">
                  25℃
                </div>
              </div>
              <div class="day_item">
                <div class="lb">
                  Wed
                </div>
                <v-icon>mdi-weather-partly-snowy-rainy</v-icon>
                <div class="wd">
                  10℃
                </div>
              </div>
              <div class="day_item">
                <div class="lb">
                  Thur
                </div>
                <v-icon>mdi-weather-night-partly-cloudy</v-icon>
                <div class="wd">
                  31℃
                </div>
              </div>
              <div class="day_item">
                <div class="lb">
                  Fri
                </div>
                <v-icon>mdi-weather-pouring</v-icon>
                <div class="wd">
                  31℃
                </div>
              </div>
              <div class="day_item">
                <div class="lb">
                  Sat
                </div>
                <v-icon>mdi-weather-sunset-down</v-icon>
                <div class="wd">
                  31℃
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="r_card  primary">
          <!-- <div class="arrow" @click="handlePieBoxVisibleStatus">
            <v-btn icon>
              <v-icon v-if="pieBoxVisible">
                mdi-arrow-left-thick
              </v-icon>
              <v-icon v-else>
                mdi-arrow-right-thick
              </v-icon>
            </v-btn>
          </div> -->
          <!-- <div class="inner_item" :class="{ inner_item_hide: pieBoxVisible }">
            <div class="inner_item_content" style="margin-top: 140px">
              <ve-ring
                :data="pieData"
                :settings="pieSettings"
                :extend="pieExtend"
                height="460px"
              />
            </div>
          </div> -->
          <div class="item_header">
            <button class="title" @click="changeType">
              设备控制
            </button>
          </div>
          <div class="item_content">
            <div class="chart_wrap" style="margin-top: 30px">
              <v-row>
                <v-col cols="12" md="2">
                  灯光控制
                </v-col>
                <v-col cols="12" md="10">
                  <v-slider
                    v-model="slider"
                    thumb-label="always"
                    thumb-color="red"
                    color="green"
                    track-color="red"
                  />
                </v-col>
                <v-col cols="12" md="2">
                  窗帘控制
                </v-col>
                <v-col cols="12" md="10">
                  <v-slider
                    v-model="chuanglian"
                    thumb-label="always"
                    thumb-color="red"
                    color="green"
                    track-color="red"
                  />
                </v-col>

                <v-col cols="12" md="12">
                  <div class="kongtiao">
                    <v-card class="mx-auto" max-width="600">
                      <v-toolbar flat dense>
                        <v-toolbar-title>
                          <span class="subheading">空调控制</span>
                        </v-toolbar-title>
                        <v-spacer />
                      </v-toolbar>

                      <v-card-text>
                        <v-row class="mb-4" justify="space-between">
                          <v-col class="text-left">
                            <span
                              class="display-3 font-weight-light"
                              v-text="bpm"
                            />
                            <span class="subheading font-weight-light mr-1"
                              >℃</span
                            >
                            <v-fade-transition>
                              <v-avatar
                                v-if="isPlaying"
                                :color="color"
                                :style="{
                                  animationDuration: animationDuration
                                }"
                                class="mb-1 v-avatar--metronome"
                                size="12"
                              />
                            </v-fade-transition>
                          </v-col>
                          <v-col class="text-right">
                            <v-btn
                              :color="color"
                              dark
                              depressed
                              fab
                              @click="toggle"
                            >
                              <v-icon large>
                                {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
                              </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>

                        <v-slider
                          v-model="bpm"
                          :color="color"
                          track-color="grey"
                          always-dirty
                          min="15"
                          max="35"
                        >
                          <template v-slot:prepend>
                            <v-icon :color="color" @click="decrement">
                              mdi-minus
                            </v-icon>
                          </template>

                          <template v-slot:append>
                            <v-icon :color="color" @click="increment">
                              mdi-plus
                            </v-icon>
                          </template>
                        </v-slider>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="camera_play_row">
      <div class="camera_wrap" :class="{ reversal: reversal }">
        <div class="r_card reversal_before primary">
          <div class="item_header">
            <div class="title">
              📹 Camera
            </div>
            <v-btn icon @click="handleRunReversal">
              <v-icon>mdi-camera-retake</v-icon>
            </v-btn>
          </div>
          <div class="camera_content">
            <div
              class="camera_item"
              style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera1.jpg');"
              @click="
                handleZoomCamera(
                  'http://akveo.com/ngx-admin/assets/images/camera1.jpg'
                )
              "
            >
              <span class="camera_name">Camera #1</span>
            </div>
            <div
              class="camera_item"
              style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera2.jpg');"
              @click="
                handleZoomCamera(
                  'http://akveo.com/ngx-admin/assets/images/camera2.jpg'
                )
              "
            >
              <span class="camera_name">Camera #2</span>
            </div>
            <div
              class="camera_item"
              style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera3.jpg');"
              @click="
                handleZoomCamera(
                  'http://akveo.com/ngx-admin/assets/images/camera3.jpg'
                )
              "
            >
              <span class="camera_name">Camera #3</span>
            </div>
            <div
              class="camera_item"
              style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera4.jpg');"
              @click="
                handleZoomCamera(
                  'http://akveo.com/ngx-admin/assets/images/camera4.jpg'
                )
              "
            >
              <span class="camera_name">Camera #4</span>
            </div>
          </div>
        </div>
        <div class="r_card reversal_after primary">
          <div class="item_header">
            <div class="title">
              📹 Camera
            </div>
            <v-btn icon @click="handleRunReversal">
              <v-icon>mdi-camera-retake-outline</v-icon>
            </v-btn>
          </div>
          <div class="reversal">
            <div class="camera_content camera_content2">
              <div
                class="camera_item"
                :style="{ backgroundImage: 'url(' + url + ')' }"
              >
                <span class="camera_name">Camera #1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="r_card play_item primary">
        <div class="item_header">
          <div class="title">
            My Playlist
          </div>
        </div>
        <div class="item_content">
          <div
            class="image"
            style='background-image: url("http://akveo.com/ngx-admin/assets/images/cover2.jpg"); background-position: center center;'
          />
          <div class="title">
            Miusic - name
          </div>
          <div class="name" />
          <div class="current_time">
            <div class="t min">
              {{ ex1.val }}
            </div>
            <v-slider v-model="ex1.val" :color="ex1.color" />
            <div class="t max">
              100
            </div>
          </div>
          <div class="btn_g">
            <v-btn icon>
              <v-icon>mdi-repeat-once</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn icon large fab class="py">
              <v-icon>mdi-play-circle-outline</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-skip-next</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-volume-off</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import QRCode from 'qrcode';
import echartMixins from '@/mixins/echart-settings'

export default {
  mixins: [echartMixins],
  data() {
    this.roomSetting = {
      labelMap: {
        temp: '温度'
      },
      dataName: {
        temp: '℃'
      },
      seriesMap: {
        temp: {
          min: -20,
          max: 40
        }
      }
    }
    return {
      // 室内温湿度
      roomTemp: {
        columns: ['type', 'value'],
        rows: [{ type: 'temp', value: 32 }]
      },
      // 控制区域
      slider: 0,
      // chuanglian
      chuanglian: 0,
      // kongtiao
      bpm: 40,
      interval: null,
      isPlaying: false,

      // ss
      media: 0,
      ex1: { label: 'color', val: 25, color: '#a16eff' },
      pieBoxVisible: false,
      reversal: false,
      url: 'http://akveo.com/ngx-admin/assets/images/camera1.jpg',

      // add
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { 日期: '1月1日', 访问用户: 1523 },
          { 日期: '1月2日', 访问用户: 1223 },
          { 日期: '1月3日', 访问用户: 2123 },
          { 日期: '1月4日', 访问用户: 4123 },
          { 日期: '1月5日', 访问用户: 3123 },
          { 日期: '1月6日', 访问用户: 7123 }
        ]
      },
      typeArr: ['line', 'histogram', 'pie'],
      index: 0
    }
  },
  computed: {
    chartSettingsNew: {
      set: function() {},
      get: function() {
        return { type: this.typeArr[this.index] }
      }
    },
    color() {
      if (this.bpm < 20) return 'indigo'
      if (this.bpm < 25) return 'teal'
      if (this.bpm < 30) return 'green'
      if (this.bpm < 35) return 'orange'
      return 'red'
    }
  },
  mounted() {
    this.$vuetify.theme.themes.light.primary = '#323259'
    // this.$store.commit('handleSetColor', '#323259')
  },
  methods: {
    // new
    changeType() {
      this.index++
      if (this.index >= this.typeArr.length) {
        this.index = 0
      }
      this.chartSettings = { type: this.typeArr[this.index] }
    },
    // old
    handlePieBoxVisibleStatus() {
      this.pieBoxVisible = !this.pieBoxVisible
    },
    handleRunReversal() {
      this.reversal = !this.reversal
    },
    handleZoomCamera(url) {
      this.url = url
      this.reversal = true
    },

    // kongtiao
    decrement() {
      this.bpm--
    },
    increment() {
      this.bpm++
    },
    toggle() {
      this.isPlaying = !this.isPlaying
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes metronome-example {
  from {
    transform: scale(0.5);
  }

  to {
    transform: scale(1);
  }
}

.v-avatar--metronome {
  animation-name: metronome-example;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
$cp: #323259;
body {
  font-family: 'Roboto', 'sans-serif', 'Open Sans', 'PingFang SC',
    'Microsoft YaHei', 'Helvetica Neue', 'Hiragino Sans GB',
    'WenQuanYi Micro Hei', Arial, sans-serif;
  margin: 0;
  padding: 0;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.v-card__actions {
  padding: 16px;
}
.task_form {
  padding: 0 20px;
}
.v-dialog .v-card__actions {
  padding: 20px !important;
}
.dashboard_container {
  background: #1b1b38;
  max-height: calc(100vh - 64px);
  padding: 30px;
  color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &:hover::-webkit-scrollbar-thumb {
    background: $cp;
  }
  &::-webkit-scrollbar {
    // 定义了滚动条整体的样式；
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    width: 8px;
    border-radius: 4px;
    background: transparent;
  }
  .r_card {
    background: $cp;
    border-radius: 4px;
    box-shadow: 0 0.5rem 1rem 0 #1a1f33;
    margin-bottom: 30px;
    .item_header {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0 16px;
      .title {
        font-weight: 600;
        font-size: 16px !important;
        margin-right: auto;
      }
      border-bottom: 1px solid #1b1b38;
    }
    > i {
      color: #fff;
      cursor: pointer;
    }
  }
  .card_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .left {
      width: calc(45% - 15px);
      .card_wrap {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .r_card {
          width: calc(50% - 15px);
          .item_header {
            > i {
              cursor: pointer;
              color: #fff;
              position: relative;
              right: -5px;
            }
          }
          .item_content {
            overflow: hidden;
            position: relative;
            .chart_wrap {
              width: calc(100% + 40px);
              > div {
                left: -40px;
              }
            }
            .chart_wrap1 {
              width: calc(100% + 120px);
              > div {
                left: -80px;
                bottom: -40px;
              }
            }
            .tool {
              width: 100%;
              position: absolute;
              left: 0;
              top: 0;
              .t {
                display: flex;
                align-items: center;
                padding: 0 16px;
                height: 45px;
                justify-content: space-between;
                .r {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  i {
                    color: red;
                  }
                }
              }
              .v {
                padding: 0 16px;
              }
            }
          }
        }
      }
      .r_card {
        .item_weather {
          padding: 20px 30px;
          .weather_header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .weather_header_left {
              .city {
                font-size: 32px;
                margin-bottom: 20px;
              }
              .wd {
                font-weight: bold;
              }
            }
            .weather_header_right {
              margin-right: 10px;
              // animation: tyggxh 10s infinite;
              i {
                font-size: 130px;
                color: #f7de1f;
              }
            }
          }
          .weather_week {
            border-top: 1px #1a1f33 solid;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 16px;
            padding-top: 20px;
            .day_item {
              text-align: center;
              .lb {
                color: #ccc;
              }
              i {
                font-size: 35px;
                color: #fff;
                margin: 15px 0;
              }
            }
          }
        }
      }
    }
    .right {
      width: calc(55% - 15px);
      .r_card {
        position: relative;
        overflow: hidden;
        .inner_item {
          width: 60%;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          background: rgba($color: #000, $alpha: 0.2);
          z-index: 8;
          transition: all 0.3s;
          .item_header {
            display: block;
            padding-top: 15px;
            padding-left: 35px;
            height: auto;
            transition: all 0.3s;
            .total {
              font-size: 32px;
              font-weight: bold;
            }
          }
          .inner_item_content {
            transition: all 0.3s;
          }
          .c {
            display: flex;
            align-items: center;
            justify-content: center;
            .row {
              margin: 0 40px;
              .bfb {
                font-size: 30px;
                font-weight: 700;
              }
            }
            .row_inner {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .c1 {
              margin-right: 20px;
            }
            .cb {
              width: 15px;
              height: 15px;
              margin-right: 10px;
            }
            .cb1 {
              background: #a16eff;
            }
            .cb2 {
              background: #00d68f;
            }
          }
        }
        .inner_item_hide {
          right: -60%;
          .item_header {
            transform: translate(30%, 0);
          }
          .inner_item_content {
            transform: translate(30%, 0);
          }
        }
        .arrow {
          position: absolute;
          right: 16px;
          top: 16px;
          z-index: 9;
          cursor: pointer;
          i {
            color: #fff;
            font-size: 30px;
          }
        }
      }
      .item_header {
        border-bottom: 0;
      }
      .item_content {
        padding: 0 30px 30px 30px;
        .min_title {
          margin-bottom: 0;
        }
        .chart_header {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 40px;
          .c {
            display: flex;
            align-items: center;
            .c1 {
              margin-right: 20px;
            }
            .cb {
              width: 15px;
              height: 15px;
              margin-right: 10px;
            }
            .cb1 {
              background: #a16eff;
            }
            .cb2 {
              background: #00d68f;
            }
          }
        }
      }
    }
  }
  .camera_play_row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .camera_wrap {
      width: calc(65% - 15px);
      position: relative;
      .r_card {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        transition: all 0.5s;
        .item_header {
          i {
            color: #fff;
          }
        }
        .camera_content {
          display: flex;
          flex-wrap: wrap;
          .camera_item {
            width: 50%;
            height: 300px;
            position: relative;
            background-size: cover;
            background-position: center;
            cursor: pointer;
            &::after {
              content: '';
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              background: rgba($color: #ccc, $alpha: 0.2);
            }
            &:hover:after {
              background: none;
            }
            .camera_name {
              margin: 20px 0 0 20px;
              line-height: 50px;
            }
          }
        }
        .camera_content2 {
          .camera_item {
            width: 100%;
            height: 600px;
            &::after {
              display: none;
              opacity: 0;
            }
          }
        }
      }
      .reversal_before {
        position: relative;
        transform: rotateY(0);
        opacity: 1;
        z-index: 2;
      }
      .reversal_after {
        transform: rotateY(180deg);
        opacity: 1;
        z-index: 1;
      }
    }
    .reversal {
      .reversal_before {
        transform: rotateY(-180deg);
        opacity: 1;
        z-index: 1;
      }
      .reversal_after {
        transform: rotateY(0);
        opacity: 1;
        z-index: 2;
      }
    }
    .play_item {
      width: calc(35% - 15px);
      .item_content {
        text-align: center;
        .image {
          width: 240px;
          height: 240px;
          margin: 50px auto 50px auto;
          background-size: cover;
        }
        .title {
          text-align: center;
          font-size: 30px !important;
        }
        .current_time {
          padding: 30px 30px 0 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .t {
            width: 50px;
            text-align: center;
            transform: translate(0, -2px);
          }
        }
        .btn_g {
          display: flex;
          align-items: center;
          padding: 30px 30px;
          justify-content: space-around;
          i {
            color: #fff;
          }
          .py {
            i {
              font-size: 50px;
            }
          }
        }
      }
    }
  }
}
@keyframes tyggxh {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes itemSlideIn {
  from {
    transform: translate3d(0, 150%, 0);
    visibility: visible;
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@media screen and (max-width: 1300px) {
  .task_router {
    .left_nav {
      display: none !important;
    }
    .v-bottom-nav {
      display: block !important;
    }
  }
}
@media screen and (max-width: 1200px) {
  .task_router {
    .task_router_content {
      .down_tip_section {
        width: 100% !important;
      }
      .list_wrap {
        margin: 0 2px 50px 5px !important;
        .inner-head {
          position: absolute !important;
          width: auto !important;
          right: 0;
          bottom: 56px;
          z-index: 2;
          .title {
            display: none;
          }
        }
        .scroll_wrap {
          height: calc(100vh - 74px) !important;
        }
      }
      .right_section {
        width: 100% !important;
        position: fixed !important;
        bottom: 0;
        height: 60vh !important;
        transition: all 0.5s;
        transform: translateY(0);
        .inner_wrap {
          width: 100% !important;
          background: #fafafa;
          animation: fadeInUp 0.3s linear !important;
          .content-wrap {
            height: calc(60vh - 64px);
            overflow-y: auto;
          }
        }
      }
      .hidetaskdetail.right_section {
        transform: translateY(100%);
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .dashboard_container {
    .card_box {
      .left {
        width: 100%;
      }
      .right {
        width: 100%;
      }
    }
    .camera_play_row {
      .camera_wrap {
        width: 100%;
      }
      .play_item {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .zwf {
    height: 56px;
  }
  .task_router {
    height: calc(100vh - 56px) !important;
    .task_router_content {
      height: calc(100vh - 56px) !important;
      .list_wrap {
        .scroll_wrap {
          height: calc(100vh - 56px) !important;
        }
      }
    }
  }
  .dashboard_container {
    .card_box {
      .left {
        .card_wrap {
          .r_card {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
