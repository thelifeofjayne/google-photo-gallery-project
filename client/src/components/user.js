import React, { useEffect } from 'react'
import Profile from './user-profile'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Login from './user-login'

function User() {
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.menu)

	useEffect(() => {
		Axios.get('/user/me').then(resp => dispatch({ type: 'SET_USER', payload: resp.data }))
	}, [dispatch])

	return <>{user === null ? <Login /> : user.name !== undefined && <Profile />}</>
}

export default User
