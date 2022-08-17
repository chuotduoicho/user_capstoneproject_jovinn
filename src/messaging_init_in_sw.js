import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDRlfFlvxam8tBkadLXsheHVby0lyPYFQo",
    authDomain: "jovinn-1aa93.firebaseapp.com",
    projectId: "jovinn-1aa93",
    storageBucket: "jovinn-1aa93.appspot.com",
    messagingSenderId: "1096557095977",
    appId: "1:1096557095977:web:8c5eb609a2f91e3ca08038",
    measurementId: "G-D16EE71XVL",
};

function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);
            getToken(messaging, {
                vapidKey:
                    "BNf1qm7KAWwIzhKO21eq7Fm-9WbLRRKyM8m4dA5ceb3nFGbTd6B0VxfCdmXz-jnwdDTZNFYigkSMMif6kd8Z5I4",
            }).then((currentToken) => {
                if (currentToken) {
                    console.log("currentToken: ", currentToken);
                } else {
                    console.log("Can not get token");
                }
            });
        } else {
            console.log("Do not have permission!");
        }
    });
}
requestPermission();