import { IMAGE_REQUEST, IMAGE_SUCCESS } from "../constants/chatConstants";
import axios from '../api/api'

export const generateImage = (requestData) => async (dispatch) => {
    try {
        dispatch({ type: IMAGE_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/image', requestData, config);
        dispatch({ type: IMAGE_SUCCESS, payload: `data:image/jpeg;base64,${data.image}` });
    } catch (error) {
        console.log(error);
    }
}
