// 把components里的组件都进行全局注册
// 通过插件的方式
import XtxSku from './xtxSku/index.vue'
import ImageView from './ImageView/index.vue'

export const componentsPlugin = {
  install(app) {
    app.component('XtxSku', XtxSku)
    app.component('XtxImageView', ImageView)
  }
}
