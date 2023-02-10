import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtiGxaN3TNlsXTjfGp5SWVaoj3xNL8SoA",
  authDomain: "electroshop-85740.firebaseapp.com",
  projectId: "electroshop-85740",
  storageBucket: "electroshop-85740.appspot.com",
  messagingSenderId: "644867179693",
  appId: "1:644867179693:web:72e94d24862d9b7abf7224"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
