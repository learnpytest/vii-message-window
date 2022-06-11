import { MessageWindow } from "./components"

export default {
  install: (App, pluginOptions = { staticTopic: "", fireApp: {} }) => {
    App.component("MessageWindow", MessageWindow)
    App.provide("staticTopic", pluginOptions.staticTopic)
    App.provide("fireApp", pluginOptions.fireApp)
  }
}

export { MessageWindow }