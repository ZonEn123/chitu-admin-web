<p align="center">
  <h1 align="center">🐎 赤兔 · Chitu Admin</h1>
  <p align="center">
    智能驾驶辅助系统 · Vue3 管理后台
  </p>
  <p align="center">
    <a href="#"><img src="https://img.shields.io/badge/Vue-3.5-4fc08d" /></a>
    <a href="#"><img src="https://img.shields.io/badge/TypeScript-6.0-3178c6" /></a>
    <a href="#"><img src="https://img.shields.io/badge/Element%20Plus-2.14-409eff" /></a>
    <a href="#"><img src="https://img.shields.io/badge/ECharts-6.0-ff6384" /></a>
    <a href="#"><img src="https://img.shields.io/badge/Vite-8.0-646cff" /></a>
  </p>
</p>

---

## 📋 项目简介

**赤兔（Chitu）** 智能驾驶辅助系统的管理后台。为运输管理者提供驾驶员数据监控、用户管理、行程监管、疲劳数据分析等功能。基于 Vue3 + TypeScript + Element Plus 构建。

---

## 🏗️ 项目架构

```
┌─────────────────────────────────────────────────────────┐
│                      Presentation                        │
│  ┌──────────┬──────────┬────────┬──────────┬──────────┐  │
│  │  Login   │Dashboard│  Users │  Trips   │  Stats   │  │
│  │  Page    │  Page   │  Page  │  Page    │  Page    │  │
│  └──────────┴──────────┴────────┴──────────┴──────────┘  │
│              Element Plus + ECharts 6                     │
├─────────────────────────────────────────────────────────┤
│                        Router                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  beforeEach Guard → localStorage Token Check        │  │
│  │  catch-all → /:pathMatch(.*)* → /dashboard           │  │
│  └─────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                     HTTP Layer (Axios)                    │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Request Interceptor → Bearer Token                  │  │
│  │  Response Interceptor → unwrap data / 401 → /login  │  │
│  │  baseURL: http://localhost:8080                      │  │
│  └─────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                     Spring Boot Backend                   │
│             http://localhost:8080/api/admin/*              │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠 技术栈

| 组件 | 技术 | 版本 |
|:-----|:-----|:-----|
| 框架 | Vue | 3.5 |
| 语言 | TypeScript | 6.0 |
| UI 库 | Element Plus | 2.14 |
| 路由 | Vue Router | 5.2 |
| 状态管理 | Pinia | 3.0 |
| 图表 | ECharts | 6.0 |
| HTTP | Axios | — |
| 构建工具 | Vite | 8.0 |

---

## 📄 页面功能

| 页面 | 路由 | 功能描述 | 数据接口 |
|:-----|:-----|:---------|:---------|
| **登录** | `/login` | 管理员身份认证，仅 `role=1` 可进入 | `POST /api/auth/login` |
| **驾驶总览** | `/dashboard` | 4 个统计卡片 + 平台总览数据 + 司机里程排名表 | `GET /api/admin/statistics/overview`<br>`GET /api/admin/statistics/drivers` |
| **用户管理** | `/users` | 司机列表（隐藏管理员）、展开查看资料、封禁/解封操作 | `GET /api/admin/users`<br>`GET /api/admin/users/{id}/profile`<br>`PUT /api/admin/users/{id}/status` |
| **行程管理** | `/trips` | 行程列表（含司机/起终点/里程/状态）、逻辑删除 | `GET /api/admin/trips`<br>`DELETE /api/admin/trips/{id}` |
| **提醒记录** | `/reminders` | 疲劳提醒历史查询 | `GET /api/admin/reminders` |
| **数据统计** | `/statistics` | ECharts 里程排行柱状图 + 总览饼图 + 疲劳柱状图 | `GET /api/admin/statistics/drivers` |

---

## 🔐 权限控制

### 登录认证

```
用户输入 phone + password
  ↓
POST /api/auth/login
  ↓
后端返回 code=200, data.role=1
  ↓
存入 localStorage → 跳转 Dashboard
```

- 仅 `role=1`（管理员）允许登录后台
- `role=0`（司机）登录时提示"该账号无后台访问权限"

### 路由守卫

```typescript
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth && !token) {
        next('/login')          // 未登录→跳登录
    } else {
        next()                  // 已登录→放行
    }
})
```

### Token 过期处理

```typescript
// Axios 响应拦截器
error => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'   // 自动跳登录
    }
    return Promise.reject(error)
}
```

---

## 🚀 本地运行

### 环境要求

| 工具 | 版本 |
|:-----|:-----|
| Node.js | 16+ |
| npm / yarn | — |

### 步骤

```bash
# 1. 克隆
git clone https://github.com/ZonEn123/chitu-admin.git

# 2. 安装依赖
cd chitu-admin
npm install

# 3. 修改后端地址（可选）
# 编辑 src/utils/request.ts → baseURL
# 默认 http://localhost:8080

# 4. 启动开发服务器
npm run dev

# 5. 构建生产版本
npm run build
```

### 前置依赖

需要启动 [chitu-backend](https://github.com/ZonEn123/chitu-backend) 后端服务，确保数据库中有 admin 账号：

```sql
-- 手动创建管理员（role=1）
UPDATE user SET role = 1 WHERE phone = 'admin手机号';
```

---

## 📁 项目结构

```
chitu-admin/
├── src/
│   ├── views/
│   │   ├── Login.vue              # 管理员登录页
│   │   ├── Layout.vue             # 主布局（侧边栏 + 顶栏）
│   │   ├── Dashboard.vue          # 驾驶总览
│   │   ├── Users.vue              # 用户管理
│   │   ├── Trips.vue              # 行程管理
│   │   ├── Reminders.vue          # 提醒记录
│   │   └── Statistics.vue         # 数据统计
│   │
│   ├── components/
│   │   ├── StatCard.vue            # 统计卡片组件
│   │   ├── TripDetail.vue          # 行程详情展开组件
│   │   ├── UserProfileDetail.vue   # 用户资料展开组件
│   │   └── chart/
│   │       ├── DrivingDurationChart.vue
│   │       └── DrivingTrendChart.vue
│   │
│   ├── api/
│   │   ├── user.ts                 # 用户管理 API
│   │   └── trip.ts                 # 行程管理 API
│   │
│   ├── router/
│   │   └── index.ts               # 路由配置 + 导航守卫
│   │
│   ├── utils/
│   │   └── request.ts             # Axios 实例 + 拦截器
│   │
│   ├── stores/
│   │   └── counter.ts             # Pinia 状态管理
│   │
│   ├── App.vue
│   └── main.ts
│
├── .env                           # 环境变量（可选）
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📊 数据统计页

统计页使用 ECharts 6 渲染三个图表：

| 图表类型 | 数据来源 | 展示内容 |
|:---------|:---------|:---------|
| 柱状图 | `GET /api/admin/statistics/drivers` | 各司机行驶里程排行 |
| 饼图 | 同上（聚合计算） | 总里程 / 疲劳次数 / 司机数占比 |
| 柱状图 | 同上（fatigueCount 字段） | 各司机疲劳提醒次数分布 |

---

## 🔗 相关仓库

| 仓库 | 说明 |
|:-----|:------|
| [chitu-android](https://github.com/ZonEn123/chitu-android) | Android 客户端 |
| [chitu-backend](https://github.com/ZonEn123/chitu-backend) | Spring Boot 后端服务 |

---

## 📸 Screenshots

| 驾驶总览 | 用户管理 | 行程管理 |
|:---------|:---------|:---------|
| <!-- 待上传 --> | <!-- 待上传 --> | <!-- 待上传 --> |
| **提醒记录** | **数据统计** | **登录页** |
| <!-- 待上传 --> | <!-- 待上传 --> | <!-- 待上传 --> |

---

## 📄 License

MIT © 2026 Peng Zheng

---
