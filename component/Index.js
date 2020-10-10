import React from 'react'

import { Route, NavLink, Switch } from 'react-router-dom'
import '../assets/css/index.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
class Index extends React.Component {
    render() {
        console.log(this.props)
        return (<div>
            <header>
                <h1>优音乐</h1>
                <button>下载app</button>
            </header>
            <ul className="ulList">
                <li>
                    <NavLink to="/recommend">
                        <span>推荐</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/hot">
                        <span>热歌榜</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/search">
                        <span>搜索</span>
                    </NavLink>
                </li>
            </ul>
            <main>
                {/* <Route path="/recommend" component={Recommend}></Route>
                <Route path="/hot" component={Hot}></Route>
                <Route path="/search" component={Search}></Route>
                <Route path="*">
                    <Redirect to="/recommed"></Redirect>
                </Route> */}
                {/* <Redirect path="*" to="/recommend"></Redirect> */}

                <Switch>
                {
                      this.props.children.map((item,index)=>{
                          if(item.path==="*"){
                            return (<Redirect key={index} path={item.path} to={item.redirect}></Redirect>)
                          }else{
                            return (<Route key={index} path={item.path} component={item.component}></Route>)
                          }
                      })
                    }
                </Switch>
            </main>
        </div>)
    }
}
export default Index