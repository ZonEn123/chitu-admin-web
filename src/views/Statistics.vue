<template>
  <div class="stats-page">
    <div class="page-header">
      <h2>数据统计</h2>
      <p>赤兔平台全局驾驶数据分析</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="14">
        <el-card>
          <template #header><span>各司机行驶里程排行</span></template>
          <div ref="barChart" style="height:360px"></div>
        </el-card>
<div v-if="!hasData" class="empty-state">暂无统计数据</div>
      </el-col>
      <el-col :span="10">
        <el-card>
          <template #header><span>驾驶概况</span></template>
          <div ref="pieChart" style="height:360px"></div>
        </el-card>
<div v-if="!hasData" class="empty-state">暂无统计数据</div>
      </el-col>
    </el-row>

    <el-card style="margin-top:20px">
      <template #header><span>各驾驶员疲劳次数</span></template>
      <div ref="fatigueChart" style="height:300px"></div>
    </el-card>
<div v-if="!hasData" class="empty-state">暂无统计数据</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import request from '@/utils/request'

const barChart = ref<HTMLDivElement>()
const pieChart = ref<HTMLDivElement>()
const fatigueChart = ref<HTMLDivElement>()
const hasData = ref(false)

const initCharts = (data: any[]) => {
  if (!data.length) return
  hasData.value = true

  const phones = data.map((d: any) => d.phone)
  const distances = data.map((d: any) => +d.totalDistanceKm.toFixed(1))
  const fatigues = data.map((d: any) => d.fatigueCount)

  // 柱状图：里程排行
  nextTick(() => {
    if (!barChart.value) return
    const bar = echarts.init(barChart.value)
    bar.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 60, right: 20, top: 20, bottom: 40 },
      xAxis: { type: 'category', data: phones, axisLabel: { rotate: 30, fontSize: 11 } },
      yAxis: { type: 'value', name: '公里' },
      series: [{
        type: 'bar',
        data: distances,
        itemStyle: { color: '#C62828', borderRadius: [4, 4, 0, 0] }
      }]
    })
  })

  // 饼图：概况
  nextTick(() => {
    if (!pieChart.value) return
    const totalDist = distances.reduce((a: number, b: number) => a + b, 0)
    const totalFat = fatigues.reduce((a: number, b: number) => a + b, 0)
    const pie = echarts.init(pieChart.value)
    pie.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: totalDist, name: '总里程(km)', itemStyle: { color: '#C62828' } },
          { value: totalFat, name: '疲劳次数', itemStyle: { color: '#E6A23C' } },
          { value: data.length, name: '司机数', itemStyle: { color: '#409EFF' } }
        ]
      }]
    })
  })

  // 疲劳次数柱状图
  nextTick(() => {
    if (!fatigueChart.value) return
    const f = echarts.init(fatigueChart.value)
    f.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 60, right: 20, top: 20, bottom: 40 },
      xAxis: { type: 'category', data: phones, axisLabel: { rotate: 30, fontSize: 11 } },
      yAxis: { type: 'value', name: '次数' },
      series: [{
        type: 'bar',
        data: fatigues,
        itemStyle: { color: '#E6A23C', borderRadius: [4, 4, 0, 0] }
      }]
    })
  })
}

onMounted(async () => {
  try {
    const res: any = await request({ url: '/api/admin/statistics/drivers', method: 'GET' })
    if (res.code === 200 && res.data?.length) initCharts(res.data)
  } catch (e) {
    console.error('加载统计数据失败', e)
  }
})
</script>

<style scoped>
.stats-page{ width:100%; }
.page-header{ margin-bottom:25px; }
.page-header h2{ margin:0; font-size:24px; font-weight:600; }
.page-header p{ margin-top:8px; color:#888; }
.empty-state{ text-align:center; padding:80px 0; color:#999; font-size:16px; }
</style>
