import httpInstance from '@/utils/http'

export const checkGetAPI = () => httpInstance.get('/member/order/pre')

export const checkCreateOrderAPI = (data) => httpInstance.post('/member/order', data)
