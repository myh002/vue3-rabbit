import httpInstance from '@/utils/http'

export const getCategoryAPI = (id) => httpInstance.get('/category', { params: { id } })
