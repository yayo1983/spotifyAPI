import { useDispatch } from "react-redux";
import { getNewReleasesAction } from '../store/spotify-actions';

const useHasNewRelease = () => {
    const dispatch = useDispatch();
    let result = dispatch(getNewReleasesAction());
    if(!result){
      return false;
    }
    return true;
};

export default useHasNewRelease;