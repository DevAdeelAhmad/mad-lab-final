import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyAACHOrZVoaPI7maSNUngaa18Uws2oIO6Y",
    authDomain: "final-44752.firebaseapp.com",
    projectId: "final-44752",
    storageBucket: "final-44752.appspot.com",
    messagingSenderId: "108110833063",
    appId: "1:108110833063:web:931a517faf26c698fa0282",
    measurementId: "G-X78Q64E6GQ",
    databaseURL:
        "https://final-44752-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
