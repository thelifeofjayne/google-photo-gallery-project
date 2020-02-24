import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import PhotoItem from './gallery-photo-item'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './gallery-loading'
import ErrorMessage from './error-message'

const Section = styled.div`
	position: relative;
	margin-left: 20px;
	width: ${({ section }) => `calc(100% / ${section})`};
	&:first-child {
		margin-left: 0;
	}
`

const ImageContainer = styled.div`
	overflow-y: auto;
	width: inherit;
	display: flex;
	justify-content: center;
	position: relative;
	margin-left: calc(20vw + 10px);
	@media (max-width: 768px) {
		margin-left: 0;
		min-height: inherit;
	}
`

const Photo = () => {
	const { username, albumId } = useParams()
	const [section, setSection] = useState(0)
	const dispatch = useDispatch()
	const { photos } = useSelector(state => state.photo)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (albumId === undefined) {
			Axios.post('/user/fav-photos', { username }).then(resp => {
				dispatch({ type: 'DONE_FETCHING', payload: { photos: resp.data } })
			})
		} else {
			Axios.post('/user/photos', { username, albumId }).then(resp => {
				dispatch({ type: 'DONE_FETCHING', payload: { photos: resp.data } })
			})
		}
		handleWindowResize()
		window.addEventListener('resize', handleWindowResize)
		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [username, albumId, dispatch])

	useEffect(() => {
		setLoaded(false)
		loadAllImage(photos)
	}, [photos])

	const handleWindowResize = () => {
		let section = 2
		if (window.innerWidth >= 1024) section = 3
		setSection(section)
	}

	const loadAllImage = async photos => {
		if (photos === null) return false
		const promises = []
		photos.forEach(({ baseUrl }) => {
			promises.push(
				new Promise(resolve => {
					const img = new Image()
					img.src = `${baseUrl}=w50`
					img.onload = resolve
				})
			)
		})
		const resp = await Promise.all(promises).then()
		if (resp.length !== 0) setLoaded(true)
	}
	const fillSection = (section, photos) => {
		let sections = [...new Array(section).keys()].map(() => {
			return { height: 0, photos: [] }
		})
		photos.forEach(photo => {
			const { mediaMetadata } = photo
			const { height, width } = mediaMetadata
			let totalHeight = sections.map(section => {
				return section.height
			})
			const shortest = totalHeight.indexOf(Math.min(...totalHeight))
			sections[shortest].height += height / width
			sections[shortest].photos.push(photo)
		})
		return sections
	}

	const renderPhoto = (photos, section) => {
		const sections = fillSection(section, photos)
		return sections.map((section_, i) => (
			<Section key={i} section={section}>
				{section_.photos.map((photo, i) => (
					<PhotoItem key={i} photo={photo} section={sections.length} />
				))}
			</Section>
		))
	}

	if (photos === null) {
		return <ErrorMessage message='[404] /photos not found/' />
	}

	return <ImageContainer>{loaded ? renderPhoto(photos, section) : <Loading />}</ImageContainer>
}

export default Photo
