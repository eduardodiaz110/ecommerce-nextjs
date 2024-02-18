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
          <Stack width={"15%"} alignItems={"center"} justifyContent={"center"}>
            <button
              onClick={handleGoBack}
              style={{
                backgroundColor: "transparent",
                border: "none",
                zIndex: 10,
              }}
              // variant="text"
              // sx={{
              //   justifyContent: "center",
              //   alignItems: "center",
              //   color: "#000",
              //   width: "50px", // Ajusta el ancho según tus necesidades
              //   height: "50px", // Ajusta la altura según tus necesidades
              //   borderRadius: "50%",
              //   boxShadow: "none",
              //   backgroundColor: "transparent",
              //   padding: "0px",
              //   "&:hover": {
              //     backgroundColor: "transparent",
              //     boxShadow: "none",
              //   },
              //   "&:active": {
              //     boxShadow: "none",
              //     backgroundColor: "transparent",
              //   },
              //   "&:focus": {
              //     boxShadow: "none",
              //     backgroundColor: "transparent",
              //   },
              // }}
            >
              <div
                style={{
                  backgroundColor: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2px",
                  borderRadius: "50%",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                >
                  <ArrowBackIcon
                    sx={{
                      padding: "0px",
                      margin: "0px",
                      fontSize: "24px",
                    }}
                  />
                </div>
              </div>
            </button>
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
