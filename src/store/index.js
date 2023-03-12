import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./spotify";

const store = configureStore({
  reducer: { spotifyr: spotifyReducer },
});

export default store;
