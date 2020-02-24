import React, { useEffect } from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import Photo from './gallery-photo'
import styled from 'styled-components'
import Popup from './gallery-popup'
import Menu from './gallery-menu'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import ErrorMessage from './error-message'
import Title from './gallery-title'
import Loading from './gallery-loading'

const MenuWrapper = styled.div`
	position: fixed;
	z-index: 1;
	width: 20vw;
	@media (max-width: 768px) {
		width: inherit;
	}
`

const GalleryWrapper = styled.div`
	display: flex;
	width: inherit;
	min-height: calc(100vh - 50px);
	margin-top: 50px;
	width: calc(100vw - 100px);
	margin-left: auto;
	margin-right: auto;
	@media (max-width: 768px) {
		width: calc(100vw - 40px);
		margin-top: 0;
		min-height: calc(100vh);
		display: block;
	}
`

const Gallery = () => {
	const { username } = useParams()
	const { user, albums } = useSelector(state => state.menu)
	const dispatch = useDispatch()

	useEffect(() => {
		Axios.post('/user/find', { username }).then(resp => dispatch({ type: 'SET_USER', payload: resp.data }))
		Axios.post('/user/albums', { username }).then(resp => dispatch({ type: 'SET_ALBUM', payload: resp.data }))
	}, [username, dispatch])

	if (user !== null && (user.name === undefined || albums.length === 0)) {
		return <Loading />
	}

	return (
		<GalleryWrapper>
			{user === null ? (
				<ErrorMessage message='[404] /user not found/' />
			) : (
				<>
					<MenuWrapper>
						<Menu />
					</MenuWrapper>
					<Title ghost />
					<Switch>
						<Route exact path={['/:username/:albumId', '/:username']}>
							<Photo />
						</Route>
					</Switch>
					<Popup />
				</>
			)}
		</GalleryWrapper>
	)
}
export default Gallery
