const initialState = {
	display: false,
	user: {},
	albums: [],
}

const menuReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'TOGGLE_MENU':
			return { ...state, display: !state.display }
		case 'SET_USER':
			return { ...state, user: payload }
		case 'SET_ALBUM':
			return { ...state, albums: payload }
		default:
			return state
	}
}

export default menuReducer
