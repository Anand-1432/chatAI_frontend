import { IMAGE_REQUEST, IMAGE_SUCCESS } from "../constants/chatConstants"

const imageReducer = (state = { image: null }, action) => {
    switch (action.type) {
        case IMAGE_REQUEST:
            return {
                ...state,
                imageLoading: true
            }

        case IMAGE_SUCCESS:
            return {
                ...state,
                image: action.payload,
                imageLoading: false
            }

        default:
            return {
                ...state
            }
    }
}

export default imageReducer;