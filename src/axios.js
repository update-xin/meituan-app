import axios from 'axios'
axios.defaults.baseURL = 'http://api.duyiedu.com'
axios.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    appkey: 'zgx666_1585656106078'
  }
  return config
}, err => {
  return Promise.reject(err)
})

export default axios
