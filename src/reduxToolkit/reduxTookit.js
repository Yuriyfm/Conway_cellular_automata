import { configureStore } from '@reduxjs/toolkit'
import mainReducer from "./reducers/mainReducer";

const store = configureStore({
    reducer: {
        mainReducer: mainReducer,
    }
})

export default store

window.store = store