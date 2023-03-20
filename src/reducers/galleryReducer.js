import { GALLERY_REQUEST, GALLERY_SUCCESS, ADD_REQUEST, ADD_SUCCESS } from "../constants/chatConstants"

const galleryReducer = (state = { gallery: [] }, action) => {
    switch (action.type) {
        case GALLERY_REQUEST:
            return {
                ...state,
                galleryLoading: true
            }

        case GALLERY_SUCCESS:
            return {
                ...state,
                gallery: action.payload,
                galleryLoading: false
            }

        case ADD_REQUEST:
            return {
                ...state,
                addLoading: true
            }

        case ADD_SUCCESS:
            return {
                ...state,
                gallery: [...state.gallery, action.payload],
                addLoading: false
            }

        default:
            return {
                ...state
            }
    }
}

export default galleryReducer;