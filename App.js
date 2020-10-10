import React from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import Router from './router/Router'
class App extends React.Component {
    constructor(){
      super();
    }
  renderComponent(r, p) {
    // if (r.needLogin) {
    //   //    判断有没有登录信息
    //   if (localStorage.getItem('userinfo')) {
    //     return <r.component />
    //   } else {
    //     return <Redirect to="/login" />
    //   }
    // } else {
    //   return <r.component />
    // }
    return <r.component {...p} children={r.children}/>
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* render={(props)=>(this.renderComponent(route,props))} */}
          {
            Router.map((route, index) => {
              return <Route key={index} path={route.path} render={(props)=>{return this.renderComponent(route,props)}}></Route>
            })
          }
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App;
