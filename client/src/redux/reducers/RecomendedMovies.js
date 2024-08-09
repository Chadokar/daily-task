import { createSlice } from "@reduxjs/toolkit";

export const RecomendedMovies = createSlice({
  name: "recomededmovies",
  initialState: { data: null },
  reducers: {
    setRecomendedMovies: (state, action) => {
      // console.log("recomededmovies payload : ", action.payload);
      state.data = action.payload;
    },
  },
});

export const { setRecomendedMovies } = RecomendedMovies.actions;

export default RecomendedMovies.reducer;
