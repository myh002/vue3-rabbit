import { userLoginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cart'
import { cartMergeAPI } from '@/apis/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()

    const userInfo = ref({})

    async function getUserInfo(data) {
      const res = await userLoginAPI(data)
      userInfo.value = res.data.result

      // 获取合并信息
      cartMergeAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.select,
            count: item.count
          }
        })
      )
      cartStore.updateCartList()
    }

    const clearUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
    }

    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
