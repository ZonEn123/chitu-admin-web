<template>

<div ref="chartRef" class="chart"></div>

</template>



<script setup lang="ts">

import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'


const chartRef = ref()


onMounted(()=>{


const chart = echarts.init(chartRef.value)



const option = {


title:{
text:'近7日驾驶次数',
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


name:'驾驶次数',

type:'line',

smooth:true,


data:[
5,
8,
6,
10,
7,
12,
9
]


}]


}



chart.setOption(option)



window.addEventListener(
'resize',
()=>chart.resize()
)


})


</script>




<style scoped>

.chart{

height:320px;

width:100%;

}

</style>