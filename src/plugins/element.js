import {
  Message,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Card,
  Drawer,
  Input,
  Form,
  FormItem,
  Popover,
  Radio,
  Tag,
  Dialog,
  MessageBox
} from 'element-ui'
import Vue from 'vue'

Vue.prototype.$message = Message
Vue.prototype.$prompt = MessageBox.prompt

Vue.use(Select)
Vue.use(Option)
Vue.use(Popover)
Vue.use(Button)
Vue.use(Card)
Vue.use(Drawer)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Radio)
Vue.use(Tag)
Vue.use(Dialog)
