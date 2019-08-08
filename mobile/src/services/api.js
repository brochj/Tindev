import axios from "axios";

const api = axios.create({
    // baseURL: 'http://192.168.16.100:3333' //Colocar o ip do computador
    baseURL: 'http://localhost:3333' //tem que dat um adb reverse tcp:3333 tcp:3333
});

export default api;