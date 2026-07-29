<template>

<el-container class="layout">


  <!-- 左侧导航 -->
  <el-aside width="230px" class="sidebar">


    <!-- Logo区域 -->
    <div class="brand">

      <div class="brand-icon">
        赤
      </div>

      <div>
        <div class="brand-title">
          赤兔
        </div>

        <div class="brand-sub">
          智能驾驶辅助系统
        </div>
      </div>

    </div>



    <!-- 菜单 -->
    <el-menu
      class="menu"
      :default-active="$route.path"
      router
    >


      <el-menu-item index="/dashboard">

        <el-icon>
          <DataLine/>
        </el-icon>

        <span>
          驾驶总览
        </span>

      </el-menu-item>



      <el-menu-item index="/users">

        <el-icon>
          <User/>
        </el-icon>

        <span>
          用户管理
        </span>

      </el-menu-item>



      <el-menu-item index="/trips">

        <el-icon>
          <List/>
        </el-icon>

        <span>
          行程管理
        </span>

      </el-menu-item>

      <el-menu-item index="/reminders">

        <el-icon>
          <Bell/>
        </el-icon>

        <span>
          提醒记录
        </span>

      </el-menu-item>

      <el-menu-item index="/statistics">

        <el-icon>
          <DataAnalysis/>
        </el-icon>

        <span>
          数据统计
        </span>

      </el-menu-item>


    </el-menu>



    <!-- 底部信息 -->
    <div class="sidebar-footer">

      <div style="margin-bottom:8px">Chitu Admin V1.0</div>

      <el-button text size="small" @click="handleLogout" style="color:#aaa;font-size:12px">
        退出登录
      </el-button>

    </div>


  </el-aside>





  <!-- 右侧 -->
  <el-container>


    <!-- 顶部 -->
    <el-header class="header">


      <div class="page-title">

        {{$route.meta.title}}

      </div>



      <div class="admin">


        <el-avatar
          :size="36"
        >
          管
        </el-avatar>


        <span>
          管理员
        </span>


        <el-icon>
          <ArrowDown/>
        </el-icon>


      </div>



    </el-header>





    <!-- 内容 -->
    <el-main class="content">

      <router-view/>

    </el-main>



  </el-container>



</el-container>


</template>



<script setup lang="ts">

import {
DataLine,
User,
List,
Bell,
DataAnalysis,
ArrowDown
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}


</script>





<style scoped>


.layout{

height:100vh;

background:var(--chitu-bg);

}



/* 左侧 */


.sidebar{


background:white;

border-right:1px solid #eeeeee;

display:flex;

flex-direction:column;


}



.brand{


height:80px;

display:flex;

align-items:center;

padding-left:25px;

gap:12px;

border-bottom:1px solid #eeeeee;


}



.brand-icon{


width:40px;

height:40px;

background:var(--chitu-red);

color:white;

font-size:22px;

font-weight:bold;

display:flex;

align-items:center;

justify-content:center;

border-radius:10px;


}



.brand-title{


font-size:20px;

font-weight:600;

color:#222;


}



.brand-sub{


font-size:12px;

color:#999;

margin-top:4px;


}





.menu{


border:none;

padding-top:20px;

}





:deep(.el-menu-item){


height:48px;

margin:6px 15px;

border-radius:8px;

color:#555;


}





:deep(.el-menu-item:hover){


background:#faf3f3;


}




:deep(.el-menu-item.is-active){


background:#fff3f3;

color:var(--chitu-red);

font-weight:600;


}




.sidebar-footer{


margin-top:auto;

padding:20px;

font-size:12px;

color:#999;

text-align:center;


}





/* 顶部 */


.header{


height:64px;

background:white;

border-bottom:1px solid #eee;

display:flex;

align-items:center;

justify-content:space-between;

padding:0 30px;


}



.page-title{


font-size:18px;

font-weight:600;

color:#333;


}




.admin{


display:flex;

align-items:center;

gap:10px;

color:#555;


}





.content{


padding:25px;

background:var(--chitu-bg);


}



</style>