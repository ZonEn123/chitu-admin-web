<template>

<div class="login">

<div class="box">

<div class="logo">赤兔</div>

<div class="en">CHITU ADMIN</div>

<p>货运千里，赤兔随行</p>

<el-input v-model="phone" placeholder="管理员账号" />
<el-input v-model="password" type="password" placeholder="密码" @keyup.enter="handleLogin" />

<el-button class="btn" @click="handleLogin" :loading="loading">登录</el-button>

<div v-if="errorMsg" class="error">{{ errorMsg }}</div>

</div>

</div>

</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import request from '@/utils/request'

const router=useRouter()
const phone=ref('')
const password=ref('')
const loading=ref(false)
const errorMsg=ref('')

async function handleLogin(){
  if(!phone.value||!password.value){
    errorMsg.value='请输入账号和密码'
    return
  }
  loading.value=true
  errorMsg.value=''
  try{
    const res:any=await request({
      url:'/api/auth/login',
      method:'POST',
      data:{phone:phone.value,password:password.value}
    })
    if(res.code===200){
      const data=res.data
      if(data.role!==1){
        errorMsg.value='该账号无后台访问权限'
        return
      }
      localStorage.setItem('token',data.token)
      router.push('/dashboard')
    }else if(res.code===401){
      errorMsg.value='账号或密码错误'
    }else{
      errorMsg.value=res.message||'登录失败'
    }
  }catch(e){
    errorMsg.value='网络异常，请稍后重试'
  }finally{
    loading.value=false
  }
}
</script>

<style scoped>
.login{height:100vh;display:flex;justify-content:center;align-items:center;background:#F6F3EC;}
.box{width:360px;text-align:center;}
.logo{font-size:50px;font-weight:bold;letter-spacing:10px;color:#A63D40;}
.en{margin-top:10px;color:#777;letter-spacing:3px;}
p{margin:30px 0;color:#888;}
:deep(.el-input){margin-bottom:18px;}
.btn{width:100%;height:42px;background:#A63D40;border:none;}
.error{color:#C62828;margin-top:16px;font-size:14px;}
</style>
