import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../Utils/userSlice"
import moviesReducer from "./movieSlice"
const appStore= configureStore(
    {
        reducer:{
            user: userReducer,
            movies:moviesReducer,
        }
    }
)
export default appStore;