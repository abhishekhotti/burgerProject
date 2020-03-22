import axios from "axios";

const instance = axios.create({
    baseURL: "https://burgerproject-799fe.firebaseio.com/"
});

export default instance;