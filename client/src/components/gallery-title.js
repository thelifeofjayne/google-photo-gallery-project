import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

const TitleWrapper = styled.h1`
	cursor: pointer;
	user-select: none;
	background: linear-gradient(45deg, #7716c8 30%, #b31d9f);
	-webkit-text-fill-color: transparent;
	background-clip: text;
	-webkit-background-clip: text;
	margin: 0;
	padding: 15px 0;
	word-wrap: break-word;
	font-family: 'Roboto', sans-serif;
	margin-right: 32px;
	max-width: fit-content;
	font-size: 40px;
`

const Ghost = styled(TitleWrapper)`
	display: none;
	z-index: -1;
	@media (max-width: 768px) {
		margin-right: 52px;
		display: block;
	}
`

const Title = ({ ghost }) => {
	const { username } = useParams()
	const history = useHistory()
	const { fetching } = useSelector(state => state.photo)
	const { user } = useSelector(state => state.menu)
	const dispatch = useDispatch()
	if (ghost) return <Ghost>{user.name}</Ghost>

	const redirect = () => {
		const next = `/${username}`
		if (!fetching && history.location.pathname !== next) {
			dispatch({ type: 'START_FETICHING' })
			if (window.innerWidth <= 768) dispatch({ type: 'TOGGLE_MENU' })
			history.push(next)
		}
	}

	return <TitleWrapper onClick={() => redirect()}>{user.name}</TitleWrapper>
}

export default Title
