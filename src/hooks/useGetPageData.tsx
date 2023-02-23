import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNewsData } from "../api";
import {
  charactersActions,
  comicActions,
  eventActions,
  seriesActions,
} from "../store/redux-slice";
import * as CONSTANTS from "../utility/constants";

const useGetPageData = (page: any) => {
  const reduxPageData = useSelector((state: any) => {
    return state[page];
  });

  const dispatch = useDispatch();

  return async () => {
    const apiData = await getNewsData(page, {
      limit: 20,
      offset: reduxPageData?.offsetPage,
    });

    if (page === CONSTANTS.CHARACTERS) {
      dispatch(
        charactersActions.characterReducer({
          apiData,
          offsetPage: reduxPageData?.offsetPage + 20,
          scrollPosition: window.pageYOffset,
        })
      );
    } else if (page === CONSTANTS.COMICS) {
      dispatch(
        comicActions.ComicReducer({
          apiData,
          offsetPage: reduxPageData?.offsetPage + 20,
          scrollPosition: window.pageYOffset,
        })
      );
    } else if (page === CONSTANTS.EVENTS) {
      dispatch(
        eventActions.EventReducer({
          apiData,
          offsetPage: reduxPageData?.offsetPage + 20,
          scrollPosition: window.pageYOffset,
        })
      );
    } else if (page === CONSTANTS.SERIES) {
      dispatch(
        seriesActions.SeriesReducer({
          apiData,
          offsetPage: reduxPageData?.offsetPage + 20,
          scrollPosition: window.pageYOffset,
        })
      );
    }
  };
};

export default useGetPageData;
