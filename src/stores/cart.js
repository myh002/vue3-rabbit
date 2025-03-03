import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { cartInsertAPI, cartFindNewCartAPI, cartDeleteAPI } from '@/apis/cart.js'
export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    const addCart = async (goods) => {
      if (isLogin.value) {
        await cartInsertAPI({ skuId: goods.skuId, count: goods.count })
        updateCartList()
      } else {
        const item = cartList.value.find((item) => item.skuId === goods.skuId)
        if (item) {
          item.count += goods.count
        } else {
          cartList.value.push(goods)
        }
      }
    }
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await cartDeleteAPI([skuId])
        updateCartList()
      } else {
        const index = cartList.value.findIndex((item) => item.skuId === skuId)
        if (index !== -1) {
          cartList.value.splice(index, 1)
        }
      }
    }
    const updateCartList = async () => {
      const res = await cartFindNewCartAPI()
      cartList.value = res.data.result
    }

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    const allSelected = computed(() => cartList.value.every((item) => item.select))
    const allSelectedChange = (val) => {
      cartList.value.forEach((item) => {
        item.select = val
      })
    }

    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.select).reduce((a, c) => a + c.count, 0)
    )
    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.select).reduce((a, c) => a + c.count * c.price, 0)
    )

    // 清除购物车
    const clearCart = () => {
      cartList.value = []
    }

    return {
      updateCartList,
      clearCart,
      selectedPrice,
      selectedCount,
      allSelectedChange,
      allSelected,
      allCount,
      allPrice,
      cartList,
      addCart,
      delCart
    }
  },
  {
    persist: {
      paths: ['cartList']
    }
  }
)
