import axios from "axios";
import router from "@/router/index";
import store from "@/store/index";
import transformData from "@/utils/transformData";
import { Toast, Dialog } from "vant";

let errorMsg = "";

const service = axios.create({
  timeout: 50000,
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
});
const service2 = axios.create({
  timeout: 50000,
  baseURL: process.env.VUE_APP_BASE_API2,
  withCredentials: true
});

let interceptorsRequestConfig = config => {
  //成功
  let token = store.getters.token;
  let url = config.url;
  if (isAddToken(url)) {
    config.headers.Authorization = token;
  }
  return config;
};
let interceptorsRequestError = error => {
  //错误
  Toast.fail("请求错误");
  return Promise.reject(error);
};

//请求拦截
service.interceptors.request.use(
  interceptorsRequestConfig,
  interceptorsRequestError
);
service2.interceptors.request.use(
  interceptorsRequestConfig,
  interceptorsRequestError
);

let interceptorsResponseResponse = response => {
  //成功
  /*const { message } = response.data;
  if (message) Toast(message);*/
  return response;
};
let interceptorsResponseError = error => {
  //错误
  let code = 0;
  try {
    code = error.response.status;
  } catch (e) {
    if (error.toString().includes("timeout")) {
      let msg = "网络请求超时！";
      if (msg === errorMsg) return Promise.reject(error);
      errorMsg = msg;
      Toast.fail(msg);
    }
    return Promise.reject(error);
  }
  const { message } = error.response.data;
  if (code === 504) {
    if (error.response.statusText === "Gateway Timeout") {
      let msg = "网络错误！";
      if (msg === errorMsg) return;
      errorMsg = msg;
      Toast.fail(msg);
    }
  } else if (code === 401) {
    if (message.length < 15) {
      Toast.fail(message);
    } else {
      let msg = "登录状态已过期，您可以继续留在该页面，或者重新登录";
      if (errorMsg === msg) return;
      errorMsg = msg;
      Dialog.confirm({
        title: "提示",
        message: "登录状态已过期，您可以继续留在该页面，或者重新登录",
        confirmButtonText: "重新登录",
        cancelButtonText: "取消"
      })
        .then(() => {
          router.push({ name: "login" });
        })
        .catch(() => (errorMsg = ""));
    }
  } else {
    if (message !== undefined) Toast.fail(message);
  }
  return Promise.reject(error);
};
//响应拦截
service.interceptors.response.use(
  interceptorsResponseResponse,
  interceptorsResponseError
);
service2.interceptors.response.use(
  interceptorsResponseResponse,
  interceptorsResponseError
);
2;

/**
 * @param {String} url 请求地址
 * @param params
 * @description get
 * */
export const axiosG = (url, params) => {
  return new Promise((resolve, reject) => {
    if (params) {
      return service({
        method: "get",
        url: url + "?" + transformData(params)
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      return service({
        method: "get",
        url: url
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

/**
 * @param {String} url 请求地址
 * @param params
 * @description get
 * */
export const axiosG2 = (url, params) => {
  return new Promise((resolve, reject) => {
    if (params) {
      return service2({
        method: "get",
        url: url + "?" + transformData(params)
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      return service2({
        method: "get",
        url: url
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

/**
 * @param {String} url 请求地址
 * @param params
 * @description delete，删除多条数据。
 * */
export const axiosD = (url, params) => {
  return new Promise((resolve, reject) => {
    if (params) {
      return service({
        method: "delete",
        url: url + "?" + transformData(params)
        /*url: `${url}/${param.join(',')}`*/
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      return service({
        method: "delete",
        url: url
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description post，键值对格式。
 * */
export const axiosK = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      transformRequest: [
        data => {
          let str = "";
          for (let key in data) {
            str = str + `${key}=${data[key]}&`;
          }
          return str.replace(/&$/, "");
        }
      ]
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description post，JSON格式。
 * */
export const axiosJ = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {
        "Content-Type": "application/json"
      },
      transformRequest: [
        data => {
          return JSON.stringify(data);
        }
      ]
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {FormData} param new FormData()
 * @description post，文件格式。
 * */
export const axiosF = (url, param) => {
  // 文件 formData
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {id: 1, file: [1.png, 2.png]}
 * @description post，文件格式。
 * */
export const axiosFs = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      transformRequest: [
        data => {
          const formData = new FormData();
          for (let key in data) {
            if (data[key] instanceof Array) {
              for (let i = 0; i < data[key].length; i++) {
                formData.append(key, data[key][i]);
              }
            } else {
              formData.append(key, data[key]);
            }
          }
          return formData;
        }
      ]
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @description 下载文件。
 * */
export const axiosL = url => {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url: url,
      responseType: "blob"
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/*白名单*/
const ignoreTokenArray = [];

const isAddToken = url => {
  let isAdd = true;
  ignoreTokenArray.some(item => {
    if (url.includes(item)) {
      isAdd = false;
      return true;
    }
  });
  return isAdd;
};
