import httpInstance from '@/utils/http'

export const cartInsertAPI = ({ skuId, count }) =>
  httpInstance.post('/member/cart', { skuId, count })

export const cartFindNewCartAPI = () => httpInstance.get('/member/cart')

export const cartDeleteAPI = (ids) => {
  return httpInstance.delete('/member/cart', { data: { ids } })
}
