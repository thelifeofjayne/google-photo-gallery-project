import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import * as serviceWorker from './serviceWorker'
import { setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store'

setConfig({ reloadHooks: false })
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
// serviceWorker.unregister()
