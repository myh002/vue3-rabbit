import httpInstance from '@/utils/http'

export const getGoodsDetailAPI = (id) =>
  httpInstance.get('/goods', {
    params: {
      id
    }
  })

export const getHotGoodsAPI = (data) =>
  httpInstance.get('/goods/hot', {
    params: {
      ...data
    }
  })
