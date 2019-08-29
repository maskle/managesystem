import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import login from "../components/pages/login.vue"
import index from "../components/pages/index.vue"
import welcome from "../components/views/welcome.vue"
import manage from "../components/pages/manage.vue"
import user from "../components/pages/user.vue"
import notice from "../components/pages/notice.vue"
import equipment from "../components/pages/equipment.vue"
import managelist from "../components/pages/managelist.vue"
import managecreate from "../components/pages/managecreate.vue"
import userlist from "../components/pages/userlist.vue"
import usercreate from "../components/pages/usercreate.vue"
import noticelist from "../components/pages/noticelist.vue"
import noticecreate from "../components/pages/noticecreate.vue"
import equipmentlist from "../components/pages/equipmentlist.vue"
import equipmentcreate from "../components/pages/equipmentcreate.vue"
export default new Router({
    routes: [{
            path: "/login",
            component: login,
        },
        {
            path: "/index",
            component: index,
            // beforeEnter: (to, from, next) => {
            //     if (from.path == "/login") {
            //         next();
            //     } else {
            //         next("/index/notice/noticelist")
            //     }
            // },
            children: [{
                    path: '',
                    component: welcome
                },
                {
                    path: "manage",
                    component: manage,
                    children: [{
                            path: "managelist",
                            component: managelist
                        },
                        {
                            path: "managecreate",
                            component: managecreate
                        },
                        {
                            path: "",
                            redirect: "/index/manage/managelist"
                        }
                    ]
                },
                {
                    path: "user",
                    component: user,
                    children: [{
                            path: "userlist",
                            component: userlist
                        },
                        {
                            path: "usercreate",
                            component: usercreate
                        },
                        {
                            path: "",
                            redirect: "/index/user/userlist"
                        }
                    ]
                },
                {
                    path: "notice",
                    component: notice,
                    children: [{
                            path: "noticelist",
                            component: noticelist
                        },
                        {
                            path: "noticecreate",
                            component: noticecreate
                        },
                        {
                            path: "",
                            redirect: "/index/notice/noticelist"
                        }
                    ]
                },
                {
                    path: "equipment",
                    component: equipment,
                    children: [{
                            path: "equipmentlist",
                            component: equipmentlist
                        },
                        {
                            path: "equipmentcreate",
                            component: equipmentcreate
                        }
                    ]
                }

            ]
        },
        {
            path: "*",
            redirect: "/login"
        }
    ]
})