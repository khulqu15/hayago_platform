import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYoGN_ayC7GFWIeTSdKkh4vl022YYJEqw",
  authDomain: "hayago-42fbf.firebaseapp.com",
  projectId: "hayago-42fbf",
  storageBucket: "hayago-42fbf.appspot.com",
  messagingSenderId: "806345285802",
  appId: "1:806345285802:web:872dc1e96765093dff30d3",
  measurementId: "G-S2ZSFSY0JQ",
  databaseURL: "https://hayago-42fbf-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const init = initializeApp(firebaseConfig);
const analytics = getAnalytics(init);

export { init, analytics };