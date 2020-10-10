import Index from '../component/Index'
import Login from '../component/Login'
import Register from '../component/Register'

import Recommend from '../component/index/Recommend'
import Hot from '../component/index/Hot'
import Search from '../component/index/Search'
const routesData = [
    {
        path:"/login",
        component:Login,
        exact:false,
        needLogin:false
    },
    {
        path:"/register",
        component:Register,
        exact:false,
        needLogin:false
    },
    {
        path:'/songlist/:id',
        component:Hot,
        exact:false,
        needLogin:false
    },
    {
        path:"/",
        component:Index,
        exact:false,
        needLogin:true,
        children:[
            {
                path:"/recommend",
                component:Recommend,
                exact:false,
            },
            {
                path:"/hot",
                component:Hot,
                exact:false,
            },
            {
                path:"/search",
                component:Search,
                exact:false,
            },
            {
                path:'*',
                redirect:'/recommend'
            }
        ]
    }
]
export default routesData