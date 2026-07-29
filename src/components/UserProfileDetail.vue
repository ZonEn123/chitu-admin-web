<template>
<div class="profile-detail">


<div class="profile-item">
<span class="label">昵称</span>
<span class="value">{{ profile?.nickname || '未设置' }}</span>
</div>


<div class="profile-item">
<span class="label">年龄</span>
<span class="value">{{ profile?.age ? profile.age + '岁' : '未设置' }}</span>
</div>


<div class="profile-item">
<span class="label">性别</span>
<span class="value">{{ genderMap[profile?.gender] || '未设置' }}</span>
</div>


<div class="profile-item">
<span class="label">紧急联系电话</span>
<span class="value">{{ profile?.emergencyPhone || '未设置' }}</span>
</div>


<div class="profile-item">
<span class="label">安全问题</span>
<span class="value">{{ profile?.securityQuestion || '未设置' }}</span>
</div>


</div>
</template>

<script setup lang="ts">

const props = defineProps<{
 profile?: any
}>()

const genderMap: Record<number, string> = {
  0: '女',
  1: '男'
}
</script>

<style scoped>
.profile-detail{
 display:grid;
 grid-template-columns:1fr 1fr;
 gap:12px 32px;
 padding:16px 24px;
}
.profile-item{
 display:flex;
 flex-direction:column;
 gap:4px;
}
.label{
 font-size:12px;
 color:#999;
 letter-spacing:0.5px;
}
.value{
 font-size:15px;
 color:#333;
 font-weight:500;
}
</style>
