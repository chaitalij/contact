import React from 'react'
import { Route, Router} from 'react-router'
import Header from './component/header'
import NavigationTab from './component/navigation'
import browserHistory from './history'
import ContactComponent from './component/contact'
import AddContactComponent from './component/addContact'

const RouterComponent = () => {
    return(
        <Router history={browserHistory}>
            <Header/>
            <NavigationTab />
            <div className="float-class">
                <Route exact path="/" component={ContactComponent}></Route>
                <Route path="/addContact" component={AddContactComponent}></Route>
            </div>
            
        </Router>
    )
}

export default RouterComponent