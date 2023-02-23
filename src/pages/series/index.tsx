import { Suspense } from "react";
import * as CONSTANTS from "../../utility/constants";

import { Container } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import CardComponent from "../UI Component";
import { useGetPageData, usePageInit } from "../../hooks";

const SeriesPage = () => {
  const seriesReduxData = usePageInit(CONSTANTS.SERIES);

  const getData = useGetPageData(CONSTANTS.SERIES);

  const fetchMore = () => {
    getData();
  };

  return (
    <Container
      sx={{
        maxWidth: { sm: "sm", md: "md", lg: "lg", xl: "xl" },
      }}
    >
      <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
        <InfiniteScroll
          dataLength={seriesReduxData?.data?.length || 0}
          next={fetchMore}
          hasMore={
            (seriesReduxData?.data?.length || 0) < seriesReduxData?.total
          }
          loader={<div style={{ color: "white" }}>Infinite Scrolling</div>}
          endMessage={<div>You reached End page</div>}
        >
          <CardComponent
            text={seriesReduxData?.text}
            characters={seriesReduxData?.data}
          />
        </InfiniteScroll>
      </Suspense>
    </Container>
  );
};

export default SeriesPage;
