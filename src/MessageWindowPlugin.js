import { MessageWindow } from "./components"

export default {
  install: (App, pluginOptions = { staticTopic: "", fireApp: {}, fireDb:{} }) => {
    App.component("MessageWindow", MessageWindow)
    App.provide("staticTopic", pluginOptions.staticTopic)
    App.provide("fireApp", pluginOptions.fireApp)
    App.provide("fireDb", pluginOptions.fireDb)

  }
}

export { MessageWindow }