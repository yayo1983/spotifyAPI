import { get } from "../components/common";
import { spotifyActions } from "./spotify";


export const getNewReleasesAction = () => {
  return async (dispatch) => {
    try {
      let response = await get("browse/new-releases");
      if (response.status !== 200) {
        return false;
      }
      dispatch(spotifyActions.setNewReleases(response.data.albums.items));
      return true;
    } catch (error) {
      dispatch(spotifyActions.setNewReleases([]));
      return false;
    }
  };
};

export const searchArtistAction = (name) => {
  return async (dispatch) => {
    try {
      dispatch(spotifyActions.setErrorName(false));
      let data = {
        q: name,
        type: "artist",
      };
      let response = await get("search", data);
      if (response.status !== 200) {
        return false;
      }
      dispatch(spotifyActions.clearForm());
      dispatch(spotifyActions.setDataArtists(response.data.artists.items));
      response.data.artists.items.forEach(function (artist) {
        getTopTracks(artist.id, dispatch);
      });
      return true;
    } catch (error) {
      dispatch(spotifyActions.setErrorName(true));
      return false;
    }
  };
};

const getTopTracks = async (id_artist,  dispatch) => {
    try {
      let data = { market: "ES" };
      let response = await get("artists/" + id_artist + "/top-tracks", data);
      if (response.status !== 200) {
        return false;
      }

      dispatch(spotifyActions.setTopTracks(response.data.tracks));
    } catch (error) {
      dispatch(spotifyActions.setTopTracks([]));
    }
};
