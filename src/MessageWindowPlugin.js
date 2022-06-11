import { MessageWindow } from "./components"

export default {
  install: (App, pluginOptions = { staticTopic: ""}) => {
    App.component("MessageWindow", MessageWindow)
    App.provide("staticTopic", pluginOptions.staticTopic)
  }
}

export { MessageWindow }