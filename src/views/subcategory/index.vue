<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { ElBreadcrumb, ElBreadcrumbItem, ElTabs, ElTabPane } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '@/components/GoodsItem.vue'

const route = useRoute()

// 获取面包屑导航数据
const categoryData = ref({})
const getCategory = async () => {
  const {
    data: { result }
  } = await getCategoryFilterAPI(route.params.id)
  categoryData.value = result
}
onMounted(() => {
  getCategory()
})

// 获取商品列表数据
const goodList = ref({})
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publshTiem'
})

const getGoodList = async () => {
  const {
    data: { result }
  } = await getSubCategoryAPI(reqData.value)
  goodList.value = result
}
getGoodList()

const disabled = ref(false)
const tabChange = () => {
  // console.log('tab切换了')
  reqData.value.page = 1
  disabled.value = false
  getGoodList()
}
const load = async () => {
  // console.log('load加载了')
  reqData.value.page++
  const {
    data: { result }
  } = await getSubCategoryAPI(reqData.value)
  if (result.page > result.pages && result.items.length === 0) {
    disabled.value = true
    return
  }
  goodList.value.items.push(...result.items)
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }"
          >{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="good in goodList.items" :key="good.id" :good="good"></GoodsItem>
        <p class="tip" v-if="disabled">我也是有底线的</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .tip {
    text-align: center;
    width: 100%;
  }
  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
