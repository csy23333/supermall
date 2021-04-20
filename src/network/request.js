import axios from "axios";
//加了promise
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     //1.创建axios实例
//     const instance = axios.create({
//       baseURL: "http://152.136.185.210:7878/api/m5/home/data",
//       timeout: 5000
//     });
//     //发送真正网络请求
//     instance(config)
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
// }
//不加promise
export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  });

  //2.axios拦截器
  instance.interceptors.request.use(
    config => {
      // console.log(config);
      return config; //必须加 return
    },
    err => {
      console.log(err);
    }
  );
  //2.2响应拦截
  instance.interceptors.response.use(
    res => {
      return res.data; //必须加 return
    },
    err => {
      console.log(err);
    }
  );
  //发送真正网络请求
  return instance(config);
}
