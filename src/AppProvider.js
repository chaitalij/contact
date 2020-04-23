import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { persistStore } from 'redux-persist'

class AppProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rehydrated: false
        }
    }

    componentWillMount() {
        persistStore(store, {blacklist: ['routing']}, () => {
            this.setState({ rehydrated: true })
          })
    }
    render() {
        if(!this.state.rehydrated) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default AppProvider