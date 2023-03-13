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
