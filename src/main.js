import { createApp } from 'vue'
import App from './App.vue'
import MessageWindowPlugin from "./MessageWindowPlugin"

createApp(App).use(MessageWindowPlugin).mount('#app')
