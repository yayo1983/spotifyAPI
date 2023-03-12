import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: 'www',
  errorSearch: false,
  dataArtists: [],
  topTracks:[],
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState: initialState,
  reducers: {
    clearForm(state) {
      state.name = "";
      state.errorSearch = false;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setErrorName(state, action) {
      state.errorSearch = action.payload;
    },
    setDataArtists(state, action) {
      state.dataArtists = action.payload;
    },
    setTopTracks(state, action) {
     return { // returning a copy of orignal state 
        ...state, //copying the original state
        topTracks: [...state.topTracks, action.payload] //new todos array 
       }
     
    },
  },
});
export const spotifyActions = spotifySlice.actions;

export default spotifySlice.reducer;
