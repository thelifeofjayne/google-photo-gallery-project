import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

const Album = styled.div`
	margin-bottom: ${({ active, sub }) => (active ? 4 : sub ? 4 : 10)}px;
	user-select: none;
	cursor: pointer;
	:last-child {
		margin-bottom: ${({ sub }) => (sub ? 10 : 0)}px;
	}
	:hover {
		color: #959595;
	}
`

const Subs = styled.div`
	margin-left: 10px;
	height: ${({ active }) => (active ? 'unset' : 0)};
	overflow: ${({ active }) => (active ? 'unset' : 'hidden')};
`

const Chevron = styled.svg`
	display: ${({ exist }) => (exist ? 'inline-block' : 'none')};
	transform: ${({ open }) => (open ? undefined : `rotate(180deg)`)};
`

const AlbumItem = ({ album, block }) => {
	const history = useHistory()
	const { username } = useParams()
	const { fetching } = useSelector(state => state.photo)
	const dispatch = useDispatch()
	const [active, setActive] = useState(false)

	const reditectAlbum = album => {
		const next = `/${username}/${album.id}`
		if (album.subs === undefined) {
			if (!fetching && history.location.pathname !== next) {
				dispatch({ type: 'START_FETICHING' })
				if (window.innerWidth <= 768) dispatch({ type: 'TOGGLE_MENU' })
				history.push(next)
			}
		} else {
			setActive(!active)
		}
	}

	return (
		<>
			<Album onClick={() => reditectAlbum(album)} active={active}>
				{album.title + ' '}
				<Chevron exist={album.subs !== undefined} open={active} xmlns='http://www.w3.org/2000/svg' version='1.1' width='12' height='12' viewBox='0 0 640 640'>
					<path
						fill='#000'
						d='M557.376 195.488c8.704-8.576 22.688-8.576 31.328 0s8.672 22.432 0 31.008l-253.056 250.56c-8.64 8.576-22.624 8.576-31.328 0l-253.056-250.56c-8.64-8.576-8.64-22.432 0-31.008 8.672-8.576 22.688-8.576 31.328 0l237.408 228.512 237.376-228.512z'
					/>
				</Chevron>
			</Album>
			<Subs active={active || block}>
				{album.subs !== undefined &&
					album.subs.map((album, i) => (
						<Album key={i} sub onClick={() => reditectAlbum(album)}>
							{album.title}
						</Album>
					))}
			</Subs>
		</>
	)
}

export default AlbumItem
