const initialState = {
	open: false,
	photo: null,
	photos: [],
	fetching: false,
}

const photoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'OPEN_POPUP':
			return { ...state, open: true, photo: payload.photo }
		case 'CLOSE_POPUP':
			return { ...state, open: true, photo: null }
		case 'START_FETICHING':
			return { ...state, photos: [], fetching: true }
		case 'DONE_FETCHING':
			return { ...state, photos: payload.photos, fetching: false }
		default:
			return state
	}
}
export default photoReducer
