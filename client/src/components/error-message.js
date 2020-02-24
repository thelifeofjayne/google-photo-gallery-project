import React from 'react'
import styled from 'styled-components'

const Message = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: inherit;
	height: inherit;
	min-height: inherit;
`

function ErrorMessage({ message }) {
	return <Message>{message}</Message>
}

export default ErrorMessage
