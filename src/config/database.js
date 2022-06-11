import {
  initializeApp
} from 'firebase/app'



const firebaseConfig = {
  apiKey: process.env.VITE_APP_APIKEY,
  authDomain: process.env.VITE_APP_AUTHDOMAIN,
  databaseURL: process.env.VITE_APP_DATABASE_URL,
  projectId: process.env.VITE_APP_PROJECT_ID,
  storageBucket: process.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VITE_APP_MESSAGINGSENDERID,
  appId: process.env.VITE_APP_APPID
}

const app = initializeApp(firebaseConfig)

export default app
