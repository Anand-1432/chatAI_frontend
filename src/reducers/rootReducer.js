import { combineReducers } from "redux";
import chatReducer from "./chatReducer";
import galleryReducer from "./galleryReducer";
import imageReducer from "./imageReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
    chatReducer: chatReducer,
    imageReducer: imageReducer,
    galleryReducer: galleryReducer,
    themeReducer: themeReducer
});

export default rootReducer;