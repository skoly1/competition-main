import * as React from "react";
import Card from "@mui/material/Card";

export default function MediaCard(props: any) {
  return <Card {...props}>{props.children}</Card>;
}
