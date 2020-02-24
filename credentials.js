const credential = {
	web: {
		redirect_uris: ['http://localhost:8080/user/create', 'https://jayne-gallery-project.herokuapp.com/user/create'],
		javascript_origins: ['http://localhost:3000', 'https://jayne-gallery-project.herokuapp.com'],
	},
}
module.exports = credential
