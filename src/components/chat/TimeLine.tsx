import { Stack, Typography, Divider } from "@mui/material";

const TimeLine = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider
        sx={{
          width: "46%",
        }}
      />
      <Typography color="primary" sx={{ color: "black" }}>
        Today
      </Typography>
      <Divider
        sx={{
          width: "46%",
        }}
      />
    </Stack>
  );
};

export default TimeLine;
