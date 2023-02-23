import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNewsData } from "../api";
import {
  charactersActions,
  comicActions,
  eventActions,
  searchActions,
  seriesActions,
} from "../store/redux-slice";
import * as CONSTANTS from "../utility/constants";

const useSearchGetData = (page: any, searchChar: string) => {
  const reduxPageData = useSelector((state: any) => {
    return state.search;
  });

  const dispatch = useDispatch();

  return async () => {
    if (page === CONSTANTS.CHARACTERS && searchChar) {
      const apiData = await getNewsData(page, {
        limit: 20,
        offset: reduxPageData?.offsetPage,
        nameStartsWith: searchChar,
      });

      dispatch(
        searchActions.SearchReducer({
          apiData,
          offsetPage: reduxPageData?.offsetPage + 20,
          scrollPosition: window.pageYOffset,
        })
      );
    } else if (page === CONSTANTS.COMICS) {
    } else if (page === CONSTANTS.EVENTS) {
    } else if (page === CONSTANTS.SERIES) {
    }
  };
};

export default useSearchGetData;
