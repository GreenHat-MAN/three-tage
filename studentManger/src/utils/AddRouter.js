// 动态路由列表
import { markRaw } from 'vue'
import { User, Lock, Unlock, House, Headset, Document, Operation } from '@element-plus/icons-vue'
export const routerList = [
    {
        path: '/main/guide',
        name: 'guide',
        component: () => import('../views/Guide/guide.vue'),
        text: '首页',
        role: 0,
        icon: markRaw(House)
    },
    {
        path: '/main/mine',
        name: 'mine',
        component: () => import('../views/mine/mine.vue'),
        text: '个人中心',
        role: 0,
        icon: markRaw(User)
    },
    {
        path: '/main/ann',
        name: 'ann',
        redirect: '/main/ann/annlist',
        text: '班级管理',
        role: 0,
        icon: markRaw(Document),
        children: [
            {
                path: '/main/ann/annlist',
                name: 'annlist',
                component: () => import('../views/annManger/annlist.vue'),
                text: '班级管理',
                role: 0,
                icon: markRaw(Document)
            },
            {
                path: '/main/ann/annasyncsis',
                name: 'annasyncsis',
                component: () => import('../views/annManger/annasyncsis.vue'),
                text: '学科管理',
                role: 1,
                icon: markRaw(Document)
            },
        ]
    },
    {
        path: '/main/advise',
        name: 'advise',
        redirect: '/main/advise/adviselist',
        text: '投诉建议中心',
        role: 0,
        icon: markRaw(Headset),
        children: [
            {
                path: '/main/advise/adviselist',
                name: 'adviselist',
                component: () => import('../views/adviseManger/adviselist.vue'),
                text: '建议列表',
                role: 0,
                icon: markRaw(Headset)
            },
            {
                path: '/main/advise/adviseasync',
                name: 'adviseasync',
                component: () => import('../views/adviseManger/adviseasync.vue'),
                text: '建议分析',
                role: 1,
                icon: markRaw(Headset)
            },
        ]
    },
    {
        path: '/main/user',
        name: 'user',
        redirect: '/main/user/userlist',
        text: '用户中心',
        role: 3,
        icon: markRaw(Lock),
        children: [
            {
                path: '/main/user/userlist',
                name: 'userlist',
                component: () => import('../views/userManger/userlist.vue'),
                text: '用户列表',
                role: 4,
                icon: markRaw(Lock)
            },
            {
                path: '/main/user/useranalysis',
                name: 'useranalysis',
                component: () => import('../views/userManger/useranalysis.vue'),
                text: '用户分析',
                role: 3,
                icon: markRaw(Unlock)
            },
        ]
    },
    {
        path: '/main/root',
        name: 'root',
        redirect: '/main/root/rootlist',
        text: '系统权限中心',
        role: 4,
        icon: markRaw(Operation),
        children: [
            {
                path: '/main/root/rootlist',
                name: 'rootlist',
                component: () => import('../views/rootManger/rootlist.vue'),
                text: '权限列表',
                role: 4,
                icon: markRaw(Operation)
            },
            {
                path: '/main/root/rootChange',
                name: 'rootChange',
                component: () => import('../views/rootManger/rootChange.vue'),
                text: '权限更改',
                role: 5,
                icon: markRaw(Operation)
            },
        ]
    },
    {
        path: '/main/audition',
        name: 'audition',
        redirect: '/main/audition/audsquare',
        text: '面试中心',
        role: 0,
        icon: markRaw(Operation),
        children: [
            {
                path: '/main/audition/audsquare',
                name: 'audsquare',
                component: () => import('../views/audition/audsquare.vue'),
                text: '面试广场',
                role: 0,
                icon: markRaw(Operation)
            },
            {
                path: '/main/audition/addaudition',
                name: 'addaudition',
                component: () => import('../views/audition/addaudition.vue'),
                text: '发布面试题',
                role: 0,
                icon: markRaw(Operation)
            },
            {
                path: '/main/audition/myaud',
                name: 'myaud',
                component: () => import('../views/audition/myaud.vue'),
                text: '我发布的面试题',
                role: 0,
                icon: markRaw(Operation)
            },
        ]
    },
    {
        path: '/main/publics',
        name: 'publics',
        redirect: '/main/publics/publicslist',
        text: '公告管理',
        role: 0,
        icon: markRaw(Operation),
        children: [
            {
                path: '/main/publics/publicslist',
                name: 'publicslist',
                component: () => import('../views/publics/publicslist.vue'),
                text: '公告列表',
                role: 0,
                icon: markRaw(Operation)
            },
            {
                path: '/main/publics/addpublics',
                name: 'addpublics',
                component: () => import('../views/publics/addpublics.vue'),
                text: '新增公告',
                role: 3,
                icon: markRaw(Operation)
            },
        ]
    },
    
]