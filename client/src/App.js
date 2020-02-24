import { hot } from 'react-hot-loader/root'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Gallery from './components/gallery'
import User from './components/user'
import ErrorMessage from './components/error-message'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<User />
				</Route>
				<Route path='/:username'>
					<Gallery />
				</Route>
				<Route path='*'>
					<ErrorMessage message='[404] /page not found/' />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default hot(App)
