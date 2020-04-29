<template>
  <v-container style="padding:0" fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <baidu-map
        :style="{ width: width, height: height }"
        scroll-wheel-zoom
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
        @click="clickMap"
      >
        <bm-control>
          <div>
            <v-text-field
              ref="searchRef"
              v-model="keyword"
              class="purple-input"
              label="搜索地点"
              prepend-inner-icon="mdi-magnify"
              outlined
              rounded
            />
            <bm-local-search :panel="!!keyword" :keyword="keyword" />
          </div>
        </bm-control>

        <bm-marker
          v-for="k in devList"
          :key="k.idx"
          class="BM_Marker"
          :position="k.position"
          :animation="k.status ? 'BMAP_ANIMATION_BOUNCE' : ''"
          :icon="{
            url: k.status ? imgOn : imgOff,
            size: { height: 45, width: 55 }
          }"
          @click="devClick(k)"
        />
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :show-address-bar="true"
          :auto-location="true"
          @locationSuccess="locationSuccess"
        />
      </baidu-map>
    </v-layout>
  </v-container>
</template>

<script>
import imgOn from '@/assets/on.png'
import imgOff from '@/assets/off.png'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      // 设备图像
      imgOn: imgOn,
      imgOff: imgOff,
      //
      keyword: '',
      center: { lng: 106, lat: 29 },
      zoom: 6,
      devList: [
        { idx: 0, position: { lng: 100, lat: 20 }, status: true, data: [] },
        {
          idx: 1,
          position: { lng: 106.53, lat: 29.54 },
          status: false,
          data: []
        },
        {
          idx: 2,
          position: { lng: 106.53063501, lat: 29.54460611 },
          status: true,
          data: []
        }
      ]
    }
  },
  methods: {
    mapReady({ BMap, map }) {
      // 解决移动端点击事件不生效问题

      if (this.$store.state.mobile) {
        const obj = {}
        map.addEventListener('touchstart', e => {
          obj.e = e.changedTouches ? e.changedTouches[0] : e
          obj.target = e.target
          obj.time = Date.now()
          obj.X = obj.e.pageX
          obj.Y = obj.e.pageY
        })
        map.addEventListener('touchend', e => {
          obj.e = e.changedTouches ? e.changedTouches[0] : e
          if (
            obj.target === e.target &&
            // 大于 750 可看成长按了
            Date.now() - obj.time < 750 &&
            // 应用勾股定理判断，如果 touchstart 的点到 touchend 的点小于 15，就可当成地图被点击了
            Math.sqrt(
              Math.pow(obj.X - obj.e.pageX, 2) +
                Math.pow(obj.Y - obj.e.pageY, 2)
            ) < 15
          ) {
            // 地图点击需要执行的操作
            this.clickMap(e)
          }
        })
      }
      var geolocation = new BMap.Geolocation()
      this.$store.commit('setMapInstance', { map, BMap })
      geolocation.getCurrentPosition(
        r => {
          if (geolocation.getStatus() === 0) {
            this.center = r.point
            const { lat, lng } = r.point
            this.zoom = 15
            this.$store.position = lat + ',' + lng
          } else {
            this.$message.error('定位失败')
          }
        },
        { enableHighAccuracy: true }
      )
    },
    devClick(k) {
      this.$message.success('handel k')
    },
    locationSuccess(point, AddressComponent, marker) {
      console.log(point, AddressComponent, marker)
    },
    clickMap(e) {
      this.$refs.searchRef.blur()
      this.keyword = ''
      const { map, BMap } = this.$store.state.mapInstance
      const point = e.point
      const last = this.$store.state.lastMarker
      const geoc = new BMap.Geocoder()
      map.removeOverlay(last)
      const marker = new BMap.Marker(point)
      geoc.getLocation(point, res => {
        const { city, district, street, streetNumber } = res.addressComponents
        this.$store.commit(
          'setLocation',
          city + district + street + streetNumber
        )
      })
      map.addOverlay(marker)
      this.$store.commit('setSelectPoint', point)
      this.$store.commit('setLastMarker', marker)
    }
  }
}
</script>
