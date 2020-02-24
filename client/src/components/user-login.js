import React from 'react'
import styled from 'styled-components'
import Axios from 'axios'

const Button = styled.div`
	border: 1px solid transparent;
	border-radius: 1px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
	box-sizing: border-box;
	transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
	background-color: #fff;
	color: #262626;
	cursor: pointer;
	position: relative;
	white-space: nowrap;
	width: fit-content;
	padding: 8px;
	margin-left: 10px;
`

const Content = styled.span`
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	font-weight: 500;
	letter-spacing: 0.2px;
	margin-left: 6px;
	margin-right: 6px;
	vertical-align: text-top;
	font-size: 13px;
`

const LoginWrapper = styled.div`
	min-height: inherit;
	width: inherit;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	user-select: none;
`

const Title = styled.h3`
	font-family: 'Roboto', sans-serif;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 500;
	margin: 0;
`

const login = () => {
	Axios.get('/user/auth').then(resp => {
		window.location.href = resp.data
	})
}

const Login = () => {
	return (
		<LoginWrapper>
			<Title>
				<div style={{ textAlign: 'center' }}>gallery project powered by</div>{' '}
				<img src='https://www.google.com/photos/about/static/images/logo_lockup_photos_60dp.svg' alt='googlephoto' />
			</Title>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<Title>
					{'created one like '}
					<a style={{ margin: '0 6px', color: 'unset' }} href='/thelifeofjayne' target='_blank'>
						this
					</a>
					{' by'}
				</Title>
				<Button onClick={() => login()}>
					<div style={{ height: 18 }}>
						<svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='18px' height='18px' viewBox='0 0 48 48'>
							<path
								fill='#EA4335'
								d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
							/>
							<path
								fill='#4285F4'
								d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
							></path>
							<path
								fill='#FBBC05'
								d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
							/>
							<path
								fill='#34A853'
								d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
							/>
							<path fill='none' d='M0 0h48v48H0z' />
						</svg>
						<Content>
							<span>Sign in</span>
						</Content>
					</div>
				</Button>
			</div>
		</LoginWrapper>
	)
}

export default Login
