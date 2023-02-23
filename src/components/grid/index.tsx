import { Grid } from "@mui/material";

const grid = (props: any) => {
  return <Grid {...props}>{props.children}</Grid>;
};

export default grid;
