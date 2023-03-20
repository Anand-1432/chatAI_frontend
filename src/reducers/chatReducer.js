import { USER_SUCCESS, CHAT_REQUEST, CHAT_SUCCESS, CHAT_CLEAR } from "../constants/chatConstants";

const chatReducer = (state = { chatArray: [] }, action) => {
    switch (action.type) {
        case USER_SUCCESS:
            return {
                ...state,
                chatArray: [...state.chatArray, { role: "user", message: action.payload }]
            }

        case CHAT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CHAT_SUCCESS:
            return {
                ...state,
                loading: false,
                chatArray: [...state.chatArray, { role: "chatGPT", message: action.payload }]
            }

        case CHAT_CLEAR:
            return {
                ...state,
                chatArray: []
            }

        default:
            return {
                ...state
            }
    }
}

export default chatReducer;