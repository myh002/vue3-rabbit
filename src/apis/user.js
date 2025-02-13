import httpInstance from '@/utils/http'

export const userLoginAPI = (data) => {
  return httpInstance.post('/login', data)
}
