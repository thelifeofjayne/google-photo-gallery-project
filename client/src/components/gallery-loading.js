import React from 'react'
import styled from 'styled-components'
import icon from '../stuff/icon.png'

const Spinner = styled.img`
	width: 60px;
	animation-name: rotate;
	animation-duration: 1.5s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`

const LoadingWrapper = styled.div`
	min-height: inherit;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Loading = () => {
	return (
		<LoadingWrapper>
			<Spinner src={icon} alt='loading' />
		</LoadingWrapper>
	)
}
export default Loading
