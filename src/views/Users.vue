<template>


<div class="users-page">


<!-- 页面标题 -->

<div class="page-header">

<h2>
用户管理
</h2>


<p>
管理赤兔平台注册司机用户
</p>

</div>



<!-- 用户表格 -->


<el-card>


<el-table

:data="userList"

row-key="userId"

@expand-change="handleExpandChange"

style="width:100%"

v-loading="loading"


>


<el-table-column type="expand">

<template #default="{ row }">

<UserProfileDetail

v-if="profileCache[row.userId]"

:profile="profileCache[row.userId]"

/>

<div v-else-if="loadingProfile[row.userId]" class="detail-status">

加载中...

</div>

<div v-else class="detail-status">

暂无资料

</div>

</template>

</el-table-column>


<el-table-column

prop="userId"

label="用户ID"

width="100"

/>



<el-table-column

prop="phone"

label="手机号"

/>

<el-table-column

prop="nickname"

label="昵称"

>

<template #default="scope">

{{scope.row.nickname||'未设置'}}

</template>

</el-table-column>



<el-table-column

prop="role"

label="角色"

>


<template #default="scope">

<span>

{{scope.row.role===1?'管理员':'司机'}}

</span>

</template>


</el-table-column>



<el-table-column

prop="status"

label="状态"

>


<template #default="scope">


<el-tag

:type="scope.row.status===1?'success':'danger'"

>


{{scope.row.status===1?'正常':'禁用'}}


</el-tag>


</template>


</el-table-column>



<el-table-column

prop="registerTime"

label="注册时间"

/>
<el-table-column

label="操作"

width="180"

>

<template #default="scope">

<el-button

size="small"

text

:type="scope.row.status===0?'success':'danger'"

@click="handleBan(scope.row)"

>

{{scope.row.status===1?'封禁':'解除封禁'}}

</el-button>

</template>


</el-table-column>
</el-table>




</el-card>



</div>


</template>





<script setup lang="ts">


import {

ref,

onMounted

} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'


import {

getAdminUserList,

getUserProfile

} from '@/api/user'

import UserProfileDetail from '@/components/UserProfileDetail.vue'
import { updateUserStatus } from '@/api/user'


// 用户数据

interface User {
 userId:number
 phone:string
 role:number
 status:number
 registerTime:string
}


const userList = ref<User[]>([])


// 展开行控制
const expandedRows = ref<number[]>([])

// 用户资料缓存
const profileCache = ref<Record<number, any>>({})
// 各行的加载状态
const loadingProfile = ref<Record<number, boolean>>({})
// 表格加载状态
const loading = ref(false)



// 获取用户列表

const loadUsers = async()=>{


try{


loading.value=true



const res:any =
await getAdminUserList()



console.log(
"用户列表:",
res
)

// 只显示司机（role=0）
userList.value = (res.data||[]).filter((item:any)=>item.role===0)
console.log("当前用户列表", userList.value)

}

catch(error){


console.error(
"获取用户失败",
error
)


}


finally{


loading.value=false


}


}


/** 展开/收起一行 */
const toggleExpand=(row:User)=>{
 const index=expandedRows.value.indexOf(row.userId)
 if(index>-1){
   expandedRows.value.splice(index,1)
 }else{
   expandedRows.value.push(row.userId)
 }
}

/** 展开状态变化时加载用户资料 */
const handleExpandChange=(row:User, expandedRowsList:User[])=>{
 const isExpanded=expandedRowsList.some(r=>r.userId===row.userId)
 if(!isExpanded)return

 // 已缓存则不重复请求
 if(profileCache.value[row.userId])return

 loadingProfile.value[row.userId]=true

 getUserProfile(row.userId).then((res:any)=>{
   profileCache.value[row.userId]=res.data||res
   console.log("用户资料加载完成",row.userId,res)
 }).catch((err)=>{
   console.error("加载用户资料失败",err)
 }).finally(()=>{
   loadingProfile.value[row.userId]=false
 })
}



/** 封禁/解封操作 */
const handleBan = async (row: any) => {
  const isBan = row.status === 1
  const actionText = isBan ? '封禁' : '解除封禁'
  try {
    await ElMessageBox.confirm(
      isBan ? '封禁后该司机无法登录APP。' : '确认解除封禁吗？',
      `确认${actionText}？`,
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
    )
    const res: any = await updateUserStatus(row.userId, isBan ? 0 : 1)
    if (res.code === 200) {
      ElMessage.success(`${actionText}成功`)
      loadUsers()
    } else {
      ElMessage.error(res.message || `${actionText}失败`)
    }
  } catch {
    // 用户取消操作
  }
}

onMounted(()=>{
console.log("Users页面加载成功")

loadUsers()


})


</script>





<style scoped>


.users-page{


width:100%;


}



.page-header{


margin-bottom:25px;


}



.page-header h2{


margin:0;


font-size:24px;


font-weight:600;


}



.page-header p{


margin-top:8px;


color:#888;


}


.detail-status{
 color:#999;
 text-align:center;
 padding:20px;
 font-size:14px;
}

</style>

