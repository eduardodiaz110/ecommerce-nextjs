"use client";
import { Button, Stack, Typography } from "@mui/material";
import theme from "../../../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Person2Icon from "@mui/icons-material/Person2";
import { useRouter, usePathname } from "next/navigation";
import { Person } from "@mui/icons-material";

interface CustomHeaderProps {
  title: string;
  back?: boolean;
  profile?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  back,
  profile,
}) => {
  const router = useRouter();
  const isHomePage = usePathname() === "/";

  const handleGoBack = () => {
    router.back();
  };

  const handleGoProfile = () => {
    router.push("/auth/profile");
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
        alignContent={"center"}
        width={"100%"}
      >
        <Stack width={"20%"} alignItems={"center"} justifyContent={"center"}>
          {back && (
            <button
              onClick={handleGoBack}
              style={{
                backgroundColor: "transparent",
                border: "none",
                zIndex: 10,
              }}
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
          )}
        </Stack>
        <Stack width={"60%"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h6">{title}</Typography>
        </Stack>
        <Stack width={"20%"} alignItems={"center"} justifyContent={"center"}>
          {profile && (
            <button
              onClick={handleGoProfile}
              style={{
                backgroundColor: "transparent",
                border: "none",
                zIndex: 10,
              }}
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
                  <Person2Icon
                    sx={{
                      padding: "0px",
                      margin: "0px",
                      fontSize: "24px",
                    }}
                  />
                </div>
              </div>
            </button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CustomHeader;
