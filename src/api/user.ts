import request from '@/utils/request'

// 获取用户列表
export function getAdminUserList(){
    return request({
        url:'/api/admin/users',
        method:'GET'
    })
}

// 获取用户资料
export function getUserProfile(userId:number){
    return request({
        url:`/api/admin/users/${userId}/profile`,
        method:'GET'
    })
}

// 修改用户状态（封禁/解封）
export function updateUserStatus(userId:number, status:number){
    return request({
        url:`/api/admin/users/${userId}/status`,
        method:'PUT',
        data:{ status }
    })
}