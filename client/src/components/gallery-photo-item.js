import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer'

const Overlay = styled.div`
	cursor: pointer;
	opacity: 0;
	position: absolute;
	background-color: #01010140;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: opacity 100ms linear;
	&:hover {
		opacity: 1;
	}
`
const Photo = styled.img`
	background-color: red;
	display: flex;
	transition: opacity 300ms ease-in-out;
`
const ImageWrap = styled.div`
	position: relative;
	margin-bottom: 20px;
`

const PhotoItem = ({ photo, section }) => {
	const { baseUrl } = photo
	const dispatch = useDispatch()
	const [loaded, setLoaded] = useState(false)

	const popImage = (_photo, _width) => {
		const photo = { ..._photo, _width }
		dispatch({ type: 'OPEN_POPUP', payload: { photo } })
	}

	const [ref, inView] = useInView({
		threshold: 0,
		triggerOnce: true,
	})

	const width = Math.floor((window.innerWidth - (window.innerWidth <= 768 ? 0 : 260) - (section - 1) * 20) / section)

	return (
		<ImageWrap onClick={() => popImage(photo, width)} inView={inView}>
			{!loaded || !inView ? (
				<Photo
					ref={ref}
					style={{ opacity: 0 }}
					src={`${baseUrl}=w50`}
					onLoad={e => {
						if (inView) e.target.style.opacity = 1
						setLoaded(true)
					}}
					width='100%'
					height='auto'
				/>
			) : (
				<Photo src={`${baseUrl}=w${width}`} width='100%' height='auto' />
			)}
			<Overlay />
		</ImageWrap>
	)
}

export default PhotoItem
