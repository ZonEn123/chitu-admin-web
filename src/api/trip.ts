import request from '@/utils/request'

// 获取行程列表
export function getTripList(){
    return request({
        url:'/api/admin/trips',
        method:'GET'
    })
}

// 删除行程（逻辑删除）
export function deleteTrip(tripId:number){
    return request({
        url:`/api/admin/trips/${tripId}`,
        method:'DELETE'
    })
}
