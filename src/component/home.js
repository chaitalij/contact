import React from 'react'
import Header from './header'
import NavigationTab from './navigation'

const Home = (props) => {
    return(
        <div>
            <Header />
            <NavigationTab />
            {props.children}
        </div>
    )
}

export default Home