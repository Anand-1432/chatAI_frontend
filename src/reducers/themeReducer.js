import { THEME_DARK, THEME_LIGHT } from '../constants/chatConstants'

const themeReducer = (state = { theme: "dark-theme" }, action) => {
    switch (action.type) {
        case THEME_DARK:
            return {
                ...state,
                theme: "dark-theme"
            }

        case THEME_LIGHT:
            return {
                ...state,
                theme: "light-theme"
            }

        default:
            return {
                ...state
            }
    }
}

export default themeReducer;