<template>
<div class="trip-detail">

<div class="detail-row">
<span class="label">开始时间</span>
<span class="value">{{ formatTime(trip.startTime) }}</span>
</div>

<div class="detail-row">
<span class="label">结束时间</span>
<span class="value">{{ formatTime(trip.endTime) }}</span>
</div>

<div class="detail-row">
<span class="label">出发地</span>
<span class="value">{{ trip.startLocation || '未知' }}</span>
</div>

<div class="detail-row">
<span class="label">目的地</span>
<span class="value">{{ trip.endLocation || '未知' }}</span>
</div>

<div class="detail-row">
<span class="label">驾驶时长</span>
<span class="value">{{ formatDuration(trip.duration) }}</span>
</div>

<div class="detail-row">
<span class="label">行驶里程</span>
<span class="value">{{ formatDistance(trip.distance) }}</span>
</div>

<div class="detail-row">
<span class="label">疲劳驾驶</span>
<span class="value">{{ trip.fatigueFlag === 1 ? '是' : '否' }}</span>
</div>

</div>
</template>

<script setup lang="ts">

defineProps<{
  trip: any
}>()

const formatTime = (t: string | null) => {
  if (!t) return '--'
  return t.slice(0, 16).replace('T', ' ')
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

</script>

<style scoped>
.trip-detail{
 display:grid;
 grid-template-columns:1fr 1fr;
 gap:10px 32px;
 padding:16px 24px;
}
.detail-row{
 display:flex;
 flex-direction:column;
 gap:2px;
}
.detail-row .label{
 font-size:12px;
 color:#999;
}
.detail-row .value{
 font-size:14px;
 color:#333;
}
</style>
