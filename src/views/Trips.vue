<template>


<div class="trip-page">


<div class="page-header">

<h2>行程管理</h2>

<p>管理司机历史驾驶记录</p>

</div>


<el-card>


<el-table

:data="tripList"

row-key="tripId"

style="width:100%"

v-loading="loading"

>


<el-table-column type="expand">

<template #default="{ row }">

<TripDetail :trip="row" />

</template>

</el-table-column>


<el-table-column prop="tripId" label="行程ID" width="80" />


<el-table-column

prop="phone"

label="司机"

width="140"

/>


<el-table-column

prop="startLocation"

label="出发地"

min-width="120"

>


<template #default="scope">

{{ scope.row.startLocation || '未知' }}

</template>

</el-table-column>


<el-table-column

prop="endLocation"

label="目的地"

min-width="120"

>


<template #default="scope">

{{ scope.row.endLocation || '未知' }}

</template>

</el-table-column>


<el-table-column

label="里程"

width="100"

>


<template #default="scope">

{{ formatDistance(scope.row.distance) }}

</template>

</el-table-column>


<el-table-column

label="驾驶时间"

width="100"

>


<template #default="scope">

{{ formatDuration(scope.row.duration) }}

</template>

</el-table-column>


<el-table-column

label="状态"

width="90"

>


<template #default="scope">


<el-tag

:type="scope.row.tripStatus===1?'success':scope.row.tripStatus===0?'warning':'danger'"

size="small"

>


{{ scope.row.tripStatus===1?'完成':scope.row.tripStatus===0?'进行中':'异常' }}


</el-tag>


</template>


</el-table-column>


<el-table-column

label="操作"

width="140"

>


<template #default="scope">

<el-button text size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>

</template>


</el-table-column>


</el-table>


</el-card>


</div>


</template>


<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTripList, deleteTrip } from '@/api/trip'
import TripDetail from '@/components/TripDetail.vue'

interface Trip {
  tripId: number
  userId: number
  phone: string
  startLocation: string | null
  endLocation: string | null
  distance: number
  duration: number
  startTime: string
  endTime: string | null
  tripStatus: number
  fatigueFlag: number
}

const tripList = ref<Trip[]>([])
const loading = ref(false)
const expandedRows = ref<number[]>([])

const loadTrips = async () => {
  loading.value = true
  try {
    const res: any = await getTripList()
    tripList.value = res.data || []
    console.log('行程列表', tripList.value)
  } catch (e) {
    console.error('获取行程失败', e)
  } finally {
    loading.value = false
  }
}

const toggleExpand = (row: Trip) => {
  const idx = expandedRows.value.indexOf(row.tripId)
  if (idx > -1) {
    expandedRows.value.splice(idx, 1)
  } else {
    expandedRows.value.push(row.tripId)
  }
}

const formatDuration = (seconds: number) => {
  if (!seconds) return '--'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}小时${m}分钟` : `${m}分钟`
}

const formatDistance = (meters: number | string) => {
  const m = Number(meters)
  if (!m) return '--'
  return m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${m.toFixed(0)}m`
}

const handleDelete = async (row: Trip) => {
  try {
    await ElMessageBox.confirm(
      '删除后无法恢复。',
      '确认删除该行程记录吗？',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
    )
    const res: any = await deleteTrip(row.tripId)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      loadTrips()
    } else {
      ElMessage.error(res.message || '删除失败，请稍后重试')
    }
  } catch {
    // 用户取消
  }
}

onMounted(loadTrips)

</script>


<style scoped>


.trip-page{ width:100%; }

.page-header{ margin-bottom:25px; }

.page-header h2{ margin:0; font-size:24px; font-weight:600; }

.page-header p{ margin-top:8px; color:#888; }


</style>
