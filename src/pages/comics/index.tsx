import React, { Suspense } from "react";
import * as CONSTANTS from "../../utility/constants";
import { Container } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import CardComponent from "../UI Component";
import { useGetPageData, usePageInit } from "../../hooks";

const ComicsPage = () => {
  const comicReduxData = usePageInit(CONSTANTS.COMICS);

  const getData = useGetPageData(CONSTANTS.COMICS);

  const fetchMore = () => {
    getData();
  };

  return (
    <>
      <Container
        sx={{
          maxWidth: { sm: "sm", md: "md", lg: "lg", xl: "xl" },
        }}
      >
        <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
          <InfiniteScroll
            dataLength={comicReduxData?.data?.length || 0}
            next={fetchMore}
            hasMore={
              (comicReduxData?.data?.length || 0) < comicReduxData?.total
            }
            loader={<div style={{ color: "white" }}>Infinite Scrolling</div>}
            endMessage={<div>You reached End page</div>}
          >
            <CardComponent
              text={comicReduxData?.text}
              characters={comicReduxData?.data}
            />
          </InfiniteScroll>
        </Suspense>
      </Container>
    </>
  );
};

export default ComicsPage;
