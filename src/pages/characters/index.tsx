import React, { Suspense, useEffect } from "react";

import * as CONSTANTS from "../../utility/constants";

import InfiniteScroll from "react-infinite-scroll-component";
import CardComponent from "../UI Component";
import { usePageInit, useGetPageData } from "../../hooks";
import { Container } from "../../components";
import { useSelector } from "react-redux";

const CharactersPage = () => {
  const charReduxData = usePageInit(CONSTANTS.CHARACTERS);
  const searchPageData = useSelector((state: any) => {
    return state.search;
  });

  console.log(searchPageData);

  useEffect(() => {}, [searchPageData]);

  const getData = useGetPageData(CONSTANTS.CHARACTERS);

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
        <Suspense fallback={<div>Loading...</div>}>
          <InfiniteScroll
            dataLength={
              searchPageData.text === "OK"
                ? searchPageData?.data?.length
                : charReduxData?.data?.length || 0
            }
            next={fetchMore}
            hasMore={
              (searchPageData.text === "OK"
                ? searchPageData?.data?.length
                : charReduxData?.data?.length || 0) <
              (searchPageData?.total || charReduxData?.total)
            }
            loader={<div>Infinite Scrolling</div>}
            endMessage={<div>You reached End page</div>}
          >
            <CardComponent
              text={
                searchPageData.text === "OK"
                  ? searchPageData?.text
                  : charReduxData?.text
              }
              characters={
                searchPageData === "OK"
                  ? searchPageData?.data
                  : charReduxData?.data
              }
            />
          </InfiniteScroll>
        </Suspense>
      </Container>
    </>
  );
};

export default CharactersPage;
