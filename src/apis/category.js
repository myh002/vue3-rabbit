import httpInstance from '@/utils/http'

export const getCategoryAPI = (id) => httpInstance.get('/category', { params: { id } })

export const getCategoryFilterAPI = (id) =>
  httpInstance.get('/category/sub/filter', { params: { id } })

/**
 * @description: 获取导航数据
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return httpInstance.post('/category/goods/temporary', data)
}
