import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Axios from 'axios'

const Picture = styled.img`
	height: 32px;
	border-radius: 50%;
`

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px lightgray solid;
	margin: 0 50px;
`

const Header = styled.div`
	padding: 8px 0;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	> *:not(:last-child) {
		margin-right: 6px;
	}
`

const StepWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	width: 60%;
	margin: auto auto;
	text-align: center;
	@media (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(4, 1fr);
		width: 90%;
	}
`

const Step = styled.div`
	font-size: 20px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-bottom: 1px lightgray solid;
`

const ProfileWrapper = styled.div`
	font-family: 'roboto', sans-serif;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`

const Image = styled.img`
	width: 340px;
	margin: 20px auto;
`

const Text = styled.div`
	margin-bottom: 10px;
`

const Link = styled.a`
	color: unset;
	margin: 0 4px;
`
const Title = styled.h2`
	text-align: center;
	margin-bottom: 0;
`

const Logout = styled.span`
	color: red;
	cursor: pointer;
	text-decoration: underline;
`

const Label = styled.a`
	cursor: pointer;
	color: unset;
	display: flex;
	align-items: center;
	font-size: 20px;
`

const logout = dispatch => {
	Axios.get('/user/logout').then(resp => {
		console.log(resp)
		dispatch({ type: 'SET_USER', payload: resp.data })
	})
}

const Profile = () => {
	const { user } = useSelector(state => state.menu)
	const dispatch = useDispatch()
	return (
		<ProfileWrapper>
			<HeaderWrapper>
				<Label href={`/${user.username}`} target='_blank'>
					Go to your site
				</Label>
				<Header>
					<Picture src={user.picture} />
					<span>{user.name}</span>
					<Logout onClick={() => logout(dispatch)}>Logout</Logout>
				</Header>
			</HeaderWrapper>
			<Title>Rule & Step</Title>
			<StepWrapper>
				<Step>
					<Text>
						1. go to
						<Link href='https://photos.google.com/' target='_blank' rel='noopener noreferrer'>
							google photo
						</Link>
						to create albums
					</Text>
					<Image src='https://i.imgur.com/wqaNfgD.png' alt='step1' />
				</Step>
				<Step>
					<Text> 2. each album is a site navigator</Text>
					<Image src='https://i.imgur.com/GfOIG50.png' alt='step2' />
				</Step>
				<Step>
					<Text>3. album grouped by adding [/] between album name</Text>
					<Image src='https://i.imgur.com/yA35JPM.png' alt='step3' />
				</Step>
				<Step>
					<Text>4. favorited images will display in homepage</Text>
					<Image src='https://i.imgur.com/D4kCRDu.png' alt='step4' />
				</Step>
			</StepWrapper>
		</ProfileWrapper>
	)
}

export default Profile
