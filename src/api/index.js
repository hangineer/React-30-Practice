import axios from "axios";

const config = {
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  }
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response) {
      const { status } = err.response;

      switch (status) {
        case 400:
          console.error("bad request");
          break;
        case 401:
          console.error("unauthorized");
          break;
        case 403:
          console.error("forbidden");
          break;
        case 404:
          console.error("not found");
          break;
        case 500:
          console.error("server error");
          break;
      }
    }
    return Promise.reject(err)
  }
);

export default axiosInstance;