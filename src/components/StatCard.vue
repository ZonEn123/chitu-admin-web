<template>


<el-card class="stat-card">


<div class="card-content">


<div class="left">


<div class="title">

{{title}}

</div>


<div class="value">

{{value}}

<span class="unit">
{{unit}}
</span>

</div>


</div>



<div class="icon-box">

<el-icon>

<component :is="icon"/>

</el-icon>


</div>



</div>


</el-card>


</template>



<script setup lang="ts">


defineProps({

title:{
type:String,
required:true
},


value:{
type:[String,Number],
required:true
},


unit:{
type:String,
default:""
},


icon:{
type:Object,
required:true
}


})


</script>





<style scoped>


.stat-card{


height:120px;

border-radius:12px;

}



.card-content{


height:100%;

display:flex;

justify-content:space-between;

align-items:center;


}



.title{


font-size:14px;

color:#888;

margin-bottom:12px;


}



.value{


font-size:32px;

font-weight:600;

color:#222;


}



.unit{


font-size:14px;

font-weight:400;

margin-left:5px;

color:#999;


}



.icon-box{


width:48px;

height:48px;

border-radius:12px;

background:#fff3f3;

color:var(--chitu-red);

display:flex;

align-items:center;

justify-content:center;

font-size:26px;


}


</style>