import axios from 'axios';
// import urls from '../const';
const http = require("http");
const https = require("https");

export default function getInstanceAxios(baseAPI, isToken) {
    const instance = axios.create({
        baseURL: baseAPI,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
    });
    // const token = localStorage.getItem("accessToken")
    instance.interceptors.request.use(
        function (config) {
            config.headers = {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Token " + localStorage.getItem("token"),

                // Host: urls,
                // eslint-disable-next-line no-useless-computed-key
                // ["secret-key"]: localStorage.getItem("secretKey"),
            };
            if (!isToken) delete config.headers.Authorization
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(

        function (response) {
            try {
                if (response.status !== 200) return Promise.reject(response.data);
                return response.data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    return instance;

}
