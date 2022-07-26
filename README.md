# Vue 3 + Vite

This is small tool based on React for quicking creating a small message window on the page to get input from users to the questionnaires in the message window, and store the data to Firebase storage.

## Usage

Example:

main.js

import { createApp } from 'vue'
import App from './App.vue'
import MessageWindowPlugin from "./MessageWindowPlugin"

import {
  initializeApp
} from 'firebase/app'
import {
  getDatabase,
} from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.VITE_APP_APIKEY,
  authDomain: process.env.VITE_APP_AUTHDOMAIN,
  databaseURL: process.env.VITE_APP_DATABASE_URL,
  projectId: process.env.VITE_APP_PROJECT_ID,
  storageBucket: process.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VITE_APP_MESSAGINGSENDERID,
  appId: process.env.VITE_APP_APPID
}

createApp(App).use(MessageWindowPlugin, { staticTopic: "Vue", fireApp: initializeApp(firebaseConfig), fireDb: getDatabase() }).mount('#app')

App.vue

<template>
  <MessageWindow />
</template>