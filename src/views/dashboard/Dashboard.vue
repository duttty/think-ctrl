<template>
  <div class="dashboard_container">
    <div class="card_box">
      <div class="left">
        <div class="card_wrap">
          <div class="r_card primary">
            <div class="item_header">
              <div class="title">
                Ve-histogram
              </div>
            </div>
            <div class="item_content">
              <div class="chart_wrap">
                <ve-histogram
                  :data="chartData"
                  :extend="chartExtend"
                  height="240px"
                />
              </div>
            </div>
          </div>
          <div class="r_card  primary">
            <div class="item_header">
              <div class="title">
                Ve-line
              </div>
            </div>
            <div class="item_content">
              <div class="tool">
                <div class="t">
                  <div class="i">
                    Daily Income
                  </div>
                  <div class="r">
                    <v-icon>mdi-arrow-up</v-icon>38%
                  </div>
                </div>
                <div class="v">
                  584
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
          <div class="arrow" @click="handlePieBoxVisibleStatus">
            <v-btn icon>
              <v-icon v-if="pieBoxVisible">
                mdi-arrow-left-thick
              </v-icon>
              <v-icon v-else>
                mdi-arrow-right-thick
              </v-icon>
            </v-btn>
          </div>
          <div class="inner_item" :class="{ inner_item_hide: pieBoxVisible }">
            <div class="inner_item_content" style="margin-top: 140px">
              <ve-ring
                :data="pieData"
                :settings="pieSettings"
                :extend="pieExtend"
                height="460px"
              />
            </div>
          </div>
          <div class="item_header">
            <div class="title" @click="handlePieBoxVisibleStatus">
              Visitors Analytics
            </div>
          </div>
          <div class="item_content">
            <div class="chart_wrap" style="margin-top: 30px">
              <ve-line
                :data="chartData3"
                :extend="chartExtend3"
                :settings="chartSettings3"
                height="560px"
              />
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
            style="background-image: url(&quot;http://akveo.com/ngx-admin/assets/images/cover2.jpg&quot;); background-position: center center;"
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
    return {
      media: 0,
      ex1: { label: 'color', val: 25, color: '#a16eff' },
      pieBoxVisible: false,
      reversal: false,
      url: 'http://akveo.com/ngx-admin/assets/images/camera1.jpg'
    }
  },
  mounted() {
    this.$vuetify.theme.themes.light.primary = '#323259'
    // this.$store.commit('handleSetColor', '#323259')
  },
  methods: {
    handlePieBoxVisibleStatus() {
      this.pieBoxVisible = !this.pieBoxVisible
    },
    handleRunReversal() {
      this.reversal = !this.reversal
    },
    handleZoomCamera(url) {
      console.log(url)
      this.url = url
      this.reversal = true
    }
  }
}
</script>
