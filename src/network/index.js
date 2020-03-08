import axios from 'axios'

export function local(config) {
  const ins = axios.create({
    baseURL: 'http://localhost:15001/api',
    timeout: 5000
  })
  return ins(config)
}

export function remote(config) {
  const ins = axios.create({
    baseURL: 'http://192.168.2.103:15001/api',
    timeout: 5000
  })
  return ins(config)
}
