import React from 'react'
import Title from './gallery-title'
import Album from './gallery-album'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

const Menuu = styled.div`
	background-color: white;
	width: inherit;
`

const TitleWrapper = styled.div`
	position: relative;
`

const SvgWrap = styled.div`
	position: absolute;
	right: 10px;
	justify-content: flex-end;
	height: 100%;
	align-items: center;
	display: none;
	top: 0;
	@media (max-width: 768px) {
		display: flex;
	}
	> svg {
		cursor: pointer;
	}
`

const close = dispatch => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='20' height='20' viewBox='0 0 352 448' onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
			<path
				fill='#000'
				d='M324.5 330.5c0 6.25-2.5 12.5-7 17l-34 34c-4.5 4.5-10.75 7-17 7s-12.5-2.5-17-7l-73.5-73.5-73.5 73.5c-4.5 4.5-10.75 7-17 7s-12.5-2.5-17-7l-34-34c-4.5-4.5-7-10.75-7-17s2.5-12.5 7-17l73.5-73.5-73.5-73.5c-4.5-4.5-7-10.75-7-17s2.5-12.5 7-17l34-34c4.5-4.5 10.75-7 17-7s12.5 2.5 17 7l73.5 73.5 73.5-73.5c4.5-4.5 10.75-7 17-7s12.5 2.5 17 7l34 34c4.5 4.5 7 10.75 7 17s-2.5 12.5-7 17l-73.5 73.5 73.5 73.5c4.5 4.5 7 10.75 7 17z'
			/>
		</svg>
	)
}

const nav = dispatch => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='16' height='16' viewBox='0 0 384 448' onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
			<path
				fill='#000'
				d='M384 336v32c0 8.75-7.25 16-16 16h-352c-8.75 0-16-7.25-16-16v-32c0-8.75 7.25-16 16-16h352c8.75 0 16 7.25 16 16zM384 208v32c0 8.75-7.25 16-16 16h-352c-8.75 0-16-7.25-16-16v-32c0-8.75 7.25-16 16-16h352c8.75 0 16 7.25 16 16zM384 80v32c0 8.75-7.25 16-16 16h-352c-8.75 0-16-7.25-16-16v-32c0-8.75 7.25-16 16-16h352c8.75 0 16 7.25 16 16z'
			/>
		</svg>
	)
}

const Menu = ({ block }) => {
	const { display } = useSelector(state => state.menu)
	const dispatch = useDispatch()

	return (
		<Menuu>
			<TitleWrapper>
				<Title />
				<SvgWrap>{display ? close(dispatch) : nav(dispatch)}</SvgWrap>
			</TitleWrapper>
			<Album block={block} />
		</Menuu>
	)
}

export default Menu
