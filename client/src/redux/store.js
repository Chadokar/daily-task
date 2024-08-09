import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/User";
import RecomendedMovies from "./reducers/RecomendedMovies";

const store = configureStore({
  reducer: {
    user: userReducer,
    recomededmovies: RecomendedMovies,
  },
});

export default store;
