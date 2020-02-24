import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

const Modal = styled.div`
	display: ${({ open }) => (open ? 'flex' : 'none')};
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	transition: opacity 1s ease-in-out;
`

const ModalContent = styled.div`
	padding: 20px;
	background: #fafafa;
	display: grid;
`
const Photo = styled.img`
	max-width: calc(100vw - 100px);
	max-height: calc(100vh - 100px);
	transition: opacity 300ms ease-in-out;
	background-color: red;
`

const Popup = () => {
	const { photo, open } = useSelector(state => state.photo)
	const [loaded, setLoaded] = useState(false)
	const dispatch = useDispatch()

	if (photo === null || photo === undefined) return null

	const { baseUrl, filename, mediaMetadata, _width } = photo
	const { width, height } = mediaMetadata

	const closeModal = () => {
		dispatch({ type: 'CLOSE_POPUP' })
		setLoaded(false)
	}

	const holderSize = (imageSize, width, height) => {
		if (imageSize.width === undefined) {
			return { width: Math.floor(width / (height / imageSize.height)), height: imageSize.height }
		} else {
			return { width: imageSize.width, height: Math.floor(height / (width / imageSize.width)) }
		}
	}

	const imageSize = (width, height) => {
		height = parseInt(height)
		width = parseInt(width)
		if (height >= width) {
			if (height / (width / (window.innerWidth - 100)) < window.innerHeight - 100) return { width: window.innerWidth - 100 }
			else return { height: window.innerHeight - 100 }
		} else {
			if (width / (height / (window.innerHeight - 100)) < window.innerWidth - 100) return { height: window.innerHeight - 100 }
			else return { width: window.innerWidth - 100 }
		}
	}

	const imagesize = imageSize(width, height)
	const holdersize = holderSize(imagesize, width, height)
	return (
		<Modal open={open} onClick={() => closeModal()}>
			<ModalContent onClick={e => e.stopPropagation()}>
				{!loaded ? (
					<Photo
						style={{ opacity: 0 }}
						src={`${baseUrl}=w${_width}`}
						onLoad={e => {
							e.target.style.opacity = 1
							setLoaded(true)
						}}
						height={holdersize.height}
						width={holdersize.width}
					/>
				) : (
					<Photo
						width={holdersize.width}
						height={holdersize.height}
						onLoad={e => {
							// e.target.style.width = 'auto'
							// e.target.style.height = 'auto'
						}}
						src={`${baseUrl}=${imagesize.width === undefined ? `h${imagesize.height}` : `w${imagesize.width}`}`}
						alt={filename}
					/>
				)}
			</ModalContent>
		</Modal>
	)
}

export default Popup
