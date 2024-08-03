import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      <Skeleton variant="rectangular" width={210} height={118} />
    </Grid>
  );
}

export default function YouTube() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
      <Media />
    </Box>
  );
}
