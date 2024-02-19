import { Stack, CircularProgress } from "@mui/material";

export default function LoadingPage() {
  return (
    <Stack
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"#fff"}
    >
      <CircularProgress color="secondary" />
    </Stack>
  );
}
