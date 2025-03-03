import httpInstance from '@/utils/http'

export const orderGetAPI = (id) => httpInstance.get(`/member/order/${id}`)
