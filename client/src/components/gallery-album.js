import React from 'react'
import AlbumItem from './gallery-album-item'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ErrorMessage from './error-message'

const AlbumWrap = styled.div`
	width: inherit;
	margin: 10px 0;
	@media (max-width: 768px) {
		display: ${({ _display, block }) => (_display && !block ? 'unset' : 'none')};
	}
`

const Album = ({ block }) => {
	const { albums } = useSelector(state => state.menu)
	const { display } = useSelector(state => state.menu)
	if (albums === null) return <ErrorMessage message='[404] /albums not found/' />

	return (
		<AlbumWrap _display={display} block={block !== undefined}>
			{albums.map((album, i) => (
				<AlbumItem key={i} album={album} block={block} />
			))}
		</AlbumWrap>
	)
}

export default Album
