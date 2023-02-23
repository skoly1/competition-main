import React, { Suspense } from "react";

import * as CONSTANTS from "../../utility/constants";

import { Container } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import CardComponent from "../UI Component";
import { useGetPageData, usePageInit } from "../../hooks";

const EventsPage = () => {
  const eventReduxData = usePageInit(CONSTANTS.EVENTS);

  const getData = useGetPageData(CONSTANTS.EVENTS);

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
          dataLength={eventReduxData?.data?.length || 0}
          next={fetchMore}
          hasMore={(eventReduxData?.data?.length || 0) < eventReduxData?.total}
          loader={<div style={{ color: "white" }}>Infinite Scrolling</div>}
          endMessage={<div>You reached End page</div>}
        >
          <CardComponent
            text={eventReduxData?.text}
            characters={eventReduxData?.data}
          />
        </InfiniteScroll>
      </Suspense>
    </Container>
  );
};

export default EventsPage;
