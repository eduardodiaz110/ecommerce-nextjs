"use client";
import { Button, Stack, Typography } from "@mui/material";
import theme from "../../../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, usePathname } from "next/navigation";

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const router = useRouter();
  const isHomePage = usePathname() === "/";

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Stack
      bgcolor={theme.palette.primary.main}
      alignItems={"center"}
      justifyContent={"center"}
      height={"76px"}
      spacing={0.5}
    >
      <Typography variant="h3">Ferremercado SA de CV</Typography>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        alignContent={"flex-start"}
        width={"100%"}
      >
        {!isHomePage && (
          <Stack
            width={"15%"}
            alignItems={"center"}
            border={"none"}
            justifyContent={"center"}
            boxShadow={"0px 0px 0px 0px"}
          >
            <Button
              onClick={handleGoBack}
              variant="contained"
              color="primary"
              sx={{
                boxShadow: "none",
              }}
            >
              <ArrowBackIcon />
            </Button>
          </Stack>
        )}
        <Stack
          {...(!isHomePage && { marginLeft: "-15%" })}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h6">{title}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CustomHeader;
