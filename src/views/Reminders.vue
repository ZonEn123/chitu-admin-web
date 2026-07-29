<template>


<div class="reminders-page">


<div class="page-header">

<h2>提醒记录</h2>

<p>司机疲劳驾驶提醒历史</p>

</div>


<el-card>


<el-table

:data="reminderList"

style="width:100%"

v-loading="loading"

stripe

>


<el-table-column prop="reminderId" label="ID" width="70" />


<el-table-column prop="userId" label="用户ID" width="80" />


<el-table-column label="提醒类型" width="120">


<template #default="scope">

<el-tag type="warning" size="small">

{{ scope.row.reminderType || '疲劳提醒' }}

</el-tag>

</template>


</el-table-column>


<el-table-column prop="reminderTime" label="提醒时间" width="180">

<template #default="scope">

{{ scope.row.reminderTime ? scope.row.reminderTime.slice(0,19).replace('T',' ') : '--' }}

</template>

</el-table-column>

<el-table-column prop="tripId" label="关联行程" width="100" />

</el-table>
<div v-if="reminderList.length===0 && !loading" class="empty-state">暂无提醒记录</div>


</el-card>


</div>


</template>


<script setup lang="ts">

import { ref, onMounted } from 'vue'
import request from '@/utils/request'

const reminderList = ref<any[]>([])
const loading = ref(false)

const loadReminders = async () => {
  loading.value = true
  try {
    const res: any = await request({ url: '/api/admin/reminders', method: 'GET' })
    reminderList.value = res.data || []
    console.log('提醒记录', reminderList.value)
  } catch (e) {
    console.error('获取提醒记录失败', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadReminders)

</script>


<style scoped>

.reminders-page{ width:100%; }

.page-header{ margin-bottom:25px; }

.page-header h2{ margin:0; font-size:24px; font-weight:600; }

.page-header p{ margin-top:8px; color:#888; }

.empty-state{ text-align:center; padding:60px 0; color:#999; font-size:15px; }
</style>
