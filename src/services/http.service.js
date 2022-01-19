<<<<<<< HEAD
import Axios from 'axios';
const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/';
var axios = Axios.create({
  withCredentials: true,
});
export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data);
  },
};
async function ajax(endpoint, method = 'GET', data = null) {
=======
import Axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3030/api/";
var axios = Axios.create({
  withCredentials: true,
});

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "GET", data = null) {
>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
<<<<<<< HEAD
      params: method === 'GET' ? data : null,
    });
=======
      params: method === "GET" ? data : null,
    });

>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
    return res.data;
  } catch (err) {
    console.error(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`
    );
    console.dir(err);
    if (err.response && err.response.status === 401) {
      // sessionStorage.clear()
<<<<<<< HEAD
      window.location.assign('/');
=======
      window.location.assign("/");
>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
    }
    throw err;
  }
}
