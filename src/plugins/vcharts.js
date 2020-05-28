import Vue from 'vue'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeRing from 'v-charts/lib/ring.common'
import VeChart from 'v-charts/lib/chart.common'
import VeGauge from 'v-charts/lib/gauge.common'

Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeRing.name, VeRing)
Vue.component(VeChart.name, VeChart)
Vue.component(VeGauge.name, VeGauge)
