<template>
  <div class="dashboard">

    <div class="welcome">
      <h2>驾驶总览</h2>
      <p>赤兔智能驾驶辅助系统运行状态</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <StatCard title="总行程" :value="overview.totalTrips" unit="次" :icon="Van" />
      </el-col>
      <el-col :span="6">
        <StatCard title="总里程" :value="overview.totalDistanceKm" unit="公里" :icon="Odometer" />
      </el-col>
      <el-col :span="6">
        <StatCard title="总驾驶时长" :value="overview.totalDurationHours" unit="小时" :icon="Timer" />
      </el-col>
      <el-col :span="6">
        <StatCard title="疲劳提醒" :value="overview.totalFatigue" unit="次" :icon="Warning" />
      </el-col>
    </el-row>

    <div v-if="overview.totalTrips===0 && !loading" class="empty-state">
      <p>暂无驾驶数据，请确保 Android 端已产生行程记录</p>
    </div>

    <el-row v-else :gutter="20" style="margin-top:24px">
      <el-col :span="12">
        <el-card>
          <template #header><span>平台概况</span></template>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">注册司机</span>
              <span class="num">{{ overview.totalDrivers }}</span>
            </div>
            <div class="info-item">
              <span class="label">总行程数</span>
              <span class="num">{{ overview.totalTrips }}</span>
            </div>
            <div class="info-item">
              <span class="label">总里程</span>
              <span class="num">{{ overview.totalDistanceKm }} km</span>
            </div>
            <div class="info-item">
              <span class="label">总驾驶时长</span>
              <span class="num">{{ overview.totalDurationHours }} 小时</span>
            </div>
            <div class="info-item">
              <span class="label">疲劳驾驶次数</span>
              <span class="num" style="color:#E6A23C">{{ overview.totalFatigue }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header><span>司机驾驶排行</span></template>
          <el-table :data="driverStats" style="width:100%" size="small" v-loading="loading">
            <el-table-column prop="phone" label="司机" width="120" />
            <el-table-column prop="totalTripCount" label="行程" width="50" />
            <el-table-column label="里程" width="80">
              <template #default="s">{{ s.row.totalDistanceKm.toFixed(1) }}</template>
            </el-table-column>
            <el-table-column label="时长" width="70">
              <template #default="s">{{ (s.row.totalDurationSeconds/3600).toFixed(1) }}h</template>
            </el-table-column>
            <el-table-column prop="fatigueCount" label="疲劳" width="50" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import StatCard from '@/components/StatCard.vue'
import { Van, Odometer, Timer, Warning } from '@element-plus/icons-vue'

const overview = ref({
  totalTrips: 0, totalDistanceKm: 0, totalDurationHours: 0,
  totalFatigue: 0, totalDrivers: 0
})
const driverStats = ref<any[]>([])
const loading = ref(false)

const loadData = async () => {
  try {
    const [ovRes, drRes] = await Promise.all([
      request({ url: '/api/admin/statistics/overview', method: 'GET' }),
      request({ url: '/api/admin/statistics/drivers', method: 'GET' })
    ])
    if (ovRes.code === 200) overview.value = ovRes.data
    if (drRes.code === 200) driverStats.value = (drRes.data || []).sort(
      (a:any,b:any) => b.totalDistanceKm - a.totalDistanceKm
    )
  } catch (e) {
    console.error('加载统计数据失败', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => { loading.value = true; loadData() })
</script>

<style scoped>
.dashboard{ width:100%; }
.welcome{ margin-bottom:25px; }
.welcome h2{ margin:0; font-size:24px; font-weight:600; }
.welcome p{ margin-top:8px; color:#888; }
.info-grid{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.info-item{ display:flex; flex-direction:column; gap:4px; }
.info-item .label{ font-size:12px; color:#999; }
.info-item .num{ font-size:22px; font-weight:600; color:#303133; }
.empty-state{ text-align:center; padding:60px 0; color:#999; font-size:15px; }
</style>
