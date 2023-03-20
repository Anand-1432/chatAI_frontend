import { GALLERY_REQUEST, GALLERY_SUCCESS, ADD_REQUEST, ADD_SUCCESS } from "../constants/chatConstants";
import axios from '../api/api'

export const requestGallery = () => async (dispatch) => {
    try {
        dispatch({ type: GALLERY_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.get('/gallery', config);
        dispatch({ type: GALLERY_SUCCESS, payload: data.data });
    } catch (error) {
        console.log(error);
    }
}

export const addCommunity = (details, fun) => async (dispatch) => {
    try {
        dispatch({ type: ADD_REQUEST });

        ///////////// upload to cloudinary ///////////////////////
        const data = new FormData();
        data.append("file", details.url);
        data.append("upload_preset", "myappintern");
        const respose = await axios.post("https://api.cloudinary.com/v1_1/dplwvxqum/image/upload", data);

        //////////// upload to database /////////////////////////
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.post("/add_community", { user: details.user, title: details.title, url: respose.data.url }, config);
        dispatch({ type: ADD_SUCCESS, payload: res.data.data });

        ////////// navigate /////////////////////
        fun();

    } catch (error) {
        console.log(error);
    }
}
