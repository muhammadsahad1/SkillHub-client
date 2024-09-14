
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function SkeletonUsers() {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 8,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          sx={{ bgcolor: "grey.400", margin: "8px" }}
          variant="rectangular"
          width={180}
          height={150}
        />
      ))}
    </Box>
  );
}
