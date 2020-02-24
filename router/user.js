const router = require('express').Router()
const User = require('../models/user.model')
const { OAuth2Client } = require('google-auth-library')
const credential = require('../credentials')

const env = process.env.NODE_ENV || 'dev'
const { redirect_uris, javascript_origins } = credential.web
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[env === 'dev' ? 0 : 1])

router.route('/auth').get((req, res) => {
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: ['profile', 'email', 'https://www.googleapis.com/auth/photoslibrary.readonly'],
	})
	res.send(authorizeUrl)
})

router.route('/me').get((req, res) => {
	if (req.cookies.refresh_token === undefined) {
		res.json(null)
	} else {
		const refresh_token = req.cookies.refresh_token
		User.findOne({ refresh_token })
			.then(user => res.json(user))
			.catch(err => res.json(null))
	}
})

const getTokens = async code => {
	try {
		const res = await oAuth2Client.getToken(code)
		return res.tokens
	} catch (err) {
		console.log(`error fetching token: ${err}`)
	}
}

const getUserInfo = async () => {
	try {
		const res = await oAuth2Client.request({ url: 'https://www.googleapis.com/oauth2/v1/userinfo' })
		return res.data
	} catch (err) {
		console.log(`error fetching userinfo: ${err}`)
	}
}

router.route('/create').get(async (req, res) => {
	try {
		const code = req.query.code
		const tokens = await getTokens(code)
		oAuth2Client.setCredentials(tokens)
		const user_info = await getUserInfo()
		const name = user_info.name
		const picture = user_info.picture
		const username = user_info.email.slice(0, user_info.email.indexOf('@'))
		const email = user_info.email
		let user = await User.findOne({ email })
		if (user === null || user === undefined) {
			try {
				const refresh_token = tokens.refresh_token
				res.cookie('refresh_token', refresh_token, { httpOnly: true })
				await new User({ name, picture, username, email, refresh_token }).save()
			} catch (err) {
				console.log(`error save user ${err}`)
			}
		} else {
			if (tokens.refresh_token !== undefined) {
				try {
					const refresh_token = tokens.refresh_token
					res.cookie('refresh_token', refresh_token, { httpOnly: true })
					await User.updateOne({ email }, { $set: { refresh_token } })
				} catch (err) {
					console.log(`error update user ${err}`)
				}
			} else {
				const refresh_token = user.refresh_token
				res.cookie('refresh_token', refresh_token, { httpOnly: true })
			}
		}
	} catch (err) {
		res.send(`create account failed: ${err}`)
	}
	res.redirect(javascript_origins[env === 'dev' ? 0 : 1])
})

const getPhotos = async (albumId, filters = undefined) => {
	try {
		const res = await oAuth2Client.request({
			url: 'https://photoslibrary.googleapis.com/v1/mediaItems:search?',
			method: 'POST',
			data: { pageSize: 100, albumId: albumId === null ? undefined : albumId, filters },
		})
		return res.data.mediaItems
	} catch (err) {
		console.log(`error fetching photos: ${err}`)
		return null
	}
}

const getAlbums = async () => {
	try {
		const res = await oAuth2Client.request({ url: 'https://photoslibrary.googleapis.com/v1/albums' })
		return res.data.albums
	} catch (err) {
		console.log(`error fetching albums ${err}`)
		return null
	}
}

router.route('/fav-photos').post(async (req, res) => {
	const { username } = req.body
	let refresh_token = req.cookies.refresh_token
	if (username !== null) {
		const user = await User.findOne({ username })
		if (user === null || user === undefined || user === undefined) return res.json(null)
		else refresh_token = user.refresh_token
	}
	if (refresh_token === undefined) return res.send('not logged in')
	oAuth2Client.setCredentials({ refresh_token })
	const filters = {
		featureFilter: {
			includedFeatures: ['FAVORITES'],
		},
	}
	const photos = await getPhotos(null, filters)
	if (photos === null || photos === undefined || photos === undefined) return res.json(null)
	const allow_propoties = ['baseUrl', 'mediaMetadata', 'filename', 'description']
	photos.map(photo => {
		allowedPropoties(photo, allow_propoties)
	})
	res.send(photos)
})

router.route('/photos').post(async (req, res) => {
	const { username, albumId } = req.body
	let refresh_token = req.cookies.refresh_token
	if (username !== null) {
		const user = await User.findOne({ username })
		if (user === null || user === undefined) return res.json(null)
		else refresh_token = user.refresh_token
	}
	if (refresh_token === undefined) return res.send('not logged in')
	oAuth2Client.setCredentials({ refresh_token })
	const photos = await getPhotos(albumId)
	if (photos === null || photos === undefined) return res.json(null)
	const allow_propoties = ['baseUrl', 'mediaMetadata', 'filename', 'description']
	photos.map(photo => {
		allowedPropoties(photo, allow_propoties)
	})
	res.send(photos)
})

router.route('/albums').post(async (req, res) => {
	const { username } = req.body
	let refresh_token = req.cookies.refresh_token
	if (username !== null) {
		const user = await User.findOne({ username })
		if (user === null || user === undefined) return res.json(null)
		else refresh_token = user.refresh_token
	}
	if (refresh_token === undefined) return res.send('not logged in')
	oAuth2Client.setCredentials({ refresh_token })
	const albums = await getAlbums()
	if (albums === null || albums === undefined) return res.json(null)
	const allow_propoties = ['id', 'title', 'mediaItemsCount']
	albums.map(album => {
		return allowedPropoties(album, allow_propoties)
	})
	let gallery = []
	albums.forEach(album => {
		const { id, title } = album
		const split_index = title.indexOf('[/]')
		if (split_index === -1) {
			gallery.push(album)
		} else {
			const arr = title.split('[/]')
			let sub_album_title = ''
			arr.forEach((string, i) => {
				if (i !== 0) sub_album_title += string
			})
			const album_title = arr[0]
			const exist_album = gallery.findIndex(album => album.title === album_title)
			if (exist_album === -1) {
				gallery = [...gallery, { title: album_title, subs: [{ id, title: sub_album_title }] }]
			} else {
				gallery[exist_album].subs.push({ id, title: sub_album_title })
			}
		}
	})
	return res.send(gallery)
})

const allowedPropoties = (object, allow_propoties) => {
	Object.keys(object)
		.filter(key => !allow_propoties.includes(key))
		.forEach(key => delete object[key])
}

const getUser = async username => {
	try {
		return await User.findOne({ username })
	} catch (err) {
		console.log(`error getting data from database: ${err}`)
	}
}

router.route('/find').post(async (req, res) => {
	const { username } = req.body
	const user = await getUser(username)
	res.json(user)
})

router.route('/logout').get((req, res) => {
	res.clearCookie('refresh_token')
	res.json(null)
})

module.exports = router
