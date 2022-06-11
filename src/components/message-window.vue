<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { reactive, inject } from 'vue'

import {
  getDatabase,
  ref as dbRef,
  update,
  push,
  child,
} from 'firebase/database'

// const db = getDatabase()

const app = inject("fireApp")
const db = inject("fireDb")
const staticTopic = inject("staticTopic")

const store = reactive({
  customerReflection: {
    isFirstInquiryAnswered: false,
    isCustomerPositive: false,
    topic: "",
    customerInput: '',
    isFinishedInquiry: false,
  },
})


const topic = staticTopic || ""

const setFirstInquiryPositive = () => {
  store.customerReflection.isFirstInquiryAnswered = true
  store.customerReflection.isCustomerPositive = true
  store.customerReflection.isFinishedInquiry = true
}

const setFirstInquiryNegative = () => {
  store.customerReflection.isFirstInquiryAnswered = true
  store.customerReflection.isCustomerPositive = false
}

const backToFirstInquiry = () => {
  store.customerReflection.isFirstInquiryAnswered = false
}

const customerSendInput = () => {
  if (!store.customerReflection.customerInput) return

  async function postCustomerInputToFirebase() {
    const payload = {
      topic: store.customerReflection.topic,
      whatCustomerLookForInput: store.customerReflection.customerInput,
    }
    // get key for new message
    const newPostKey = await push(child(dbRef(db), '/messages/')).key
    // write data
    const updates = {}
    updates['/messages/' + newPostKey] = payload
    return await update(dbRef(db), updates)
  }

  postCustomerInputToFirebase()
  store.customerReflection.customerInput = ''
  store.customerReflection.isFinishedInquiry = true
}


</script>

<template>
<div id="message-window">
  <div class="view">
    <header>
      <h1>Welcom</h1>
      <p v-if="!store.customerReflection.isFirstInquiryAnswered">
        Have you found what you need?
      </p>
      <p v-if="store.customerReflection.isFinishedInquiry">
        Thank you very much for your time and attention!
      </p>
    </header>
    <section
      v-if="!store.customerReflection.isFinishedInquiry"
      class="view__response"
    >
      <div
        v-if="
          store.customerReflection.isFirstInquiryAnswered &&
          !store.customerReflection.isCustomerPositive
        "
        class="view__inquiry"
      >
        <form class="form" @submit.stop.prevent="customerSendInput">
          <label for="viewMessage" class="label">
            <span v-if="store.customerReflection.topic">
              What kind of information are you interested in
              <span class="text-accent-light">
                {{ store.customerReflection.topic }}
              </span>
              ?
            </span>
            <span v-else>`What are you looking for?`</span>
          </label>
          <input
            type="text"
            id="viewMessage"
            name="view__message"
            for="view__message"
            class="view__message"
            placeholder="Please fill in here"
            v-model="store.customerReflection.customerInput"
          />
          <button type="submit" class="btn btn-submit">Send</button>
          <button
            type="button"
            class="btn btn-back"
            @click.stop.prevent="backToFirstInquiry"
          >
            Back
          </button>
        </form>
      </div>
      <div
        v-if="!store.customerReflection.isFirstInquiryAnswered"
        class="button__group"
      >
        <button
          class="btn btn-positive"
          type="button"
          @click.stop.prevent="setFirstInquiryPositive"
        >
          Yes
        </button>
        <button
          class="btn"
          type="button btn-negative"
          @click.stop.prevent="setFirstInquiryNegative"
        >
          No
        </button>
      </div>
    </section>
  </div></div>
</template>

<style>
#message-window {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.view {
  width: 300px;
  height: 200px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  border: 1px solid #2c3e50;
}

.view__response .btn {
  padding: 0.7em 1em;

  background-color: transparent;
  border: 1.5px solid #d0dfa4;
  transition: opacity 0.3s;
}

.view__response .btn-positive,
.view__response .btn-negative {
}
.view__response .btn-positive {
  margin-right: 1em;
}

.view__response .btn:hover {
  cursor: pointer;
  opacity: 0.7;
}

.view__inquiry .label {
  display: block;
  margin-bottom: 1em;
}

.view__inquiry input {
  padding: 0.7em 0.5em;
  outline: none;
  border: 1px solid #46587c;
}
.view__inquiry .btn {
  padding-left: 0.5em;
  padding-right: 0.5em;
}

.view__inquiry .text-accent-light {
  color: #fc7c2e;
}
</style>
