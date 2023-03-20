import { CHAT_SUCCESS, USER_SUCCESS, CHAT_REQUEST } from "../constants/chatConstants";
import axios from "../api/api";

export const getResponse = (message) => async (dispatch) => {
    try {
        dispatch({ type: USER_SUCCESS, payload: message });
        dispatch({ type: CHAT_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/chat', { message: message }, config);
        dispatch({ type: CHAT_SUCCESS, payload: data.message });

    } catch (error) {
        console.log(error);
    }
}