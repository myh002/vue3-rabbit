import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])

  async function getCategoryList() {
    const res = await getCategoryAPI()
    categoryList.value = res.data.result
  }

  return {
    categoryList,
    getCategoryList
  }
})
