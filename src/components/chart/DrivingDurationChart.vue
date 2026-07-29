<template>

<div ref="chartRef" class="chart"></div>

</template>



<script setup lang="ts">

import {onMounted,ref} from 'vue'

import * as echarts from 'echarts'


const chartRef=ref()



onMounted(()=>{


const chart=echarts.init(chartRef.value)



chart.setOption({


title:{
text:'近7日驾驶时长',
left:'center'
},


tooltip:{},


xAxis:{


type:'category',

data:[
'周一',
'周二',
'周三',
'周四',
'周五',
'周六',
'周日'
]


},



yAxis:{


type:'value'


},



series:[{


type:'bar',

name:'小时',

data:[
4,
6,
3,
8,
5,
7,
9
]


}]



})


})


</script>



<style scoped>

.chart{

height:320px;

width:100%;

}

</style>