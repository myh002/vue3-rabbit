import httpInstance from '@/utils/http'

export const userLoginAPI = (data) => {
  return httpInstance.post('/login', data)
}

export const userGetLikeListAPI = (limit) =>
  httpInstance.get('/goods/relevant', { params: { limit } })

export const userGetOrderAPI = (data) => httpInstance.get('/member/order', { params: data })
