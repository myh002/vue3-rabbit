import { userLoginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    async function getUserInfo(data) {
      const res = await userLoginAPI(data)
      userInfo.value = res.data.result
    }

    const clearUserInfo = () => {
      userInfo.value = {}
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
