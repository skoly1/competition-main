import { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetPageData from "./useGetPageData";

const usePageInit = (props: any) => {
  const page = props;

  const scroll = useSelector((state: any) => state[page].scrollPosition);

  const reduxPageData = useSelector((state: any) => {
    return state[page];
  });
  const getData = useGetPageData(page);

  // init function for Characters
  const init = async () => {
    window.scrollTo(0, scroll);
    if (!(reduxPageData?.data?.length > 0)) {
      getData();
      window.scrollTo({ top: 0 });
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return reduxPageData;
};

export default usePageInit;
