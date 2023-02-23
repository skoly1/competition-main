import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonLoading = (props: any) => {
  return (
    <>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton {...props}>{props.children}</Skeleton>
      {/* For other variants, adjust the size with `width` and `height`
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} /> */}
    </>
  );
};

export default SkeletonLoading;
