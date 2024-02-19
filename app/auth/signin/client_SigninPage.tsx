"use client";
import { AuthContext } from "@/src/context/AuthContext";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import { CircularProgress, Stack, useTheme } from "@mui/material";
import { signIn, fetchAuthSession, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
  email: string;
  phone_number: string;
}

export default function ClientSinginPage(): React.JSX.Element {
  const router = useRouter();
  const theme = useTheme();

  const { setIsAuthenticated } = React.useContext(AuthContext);

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    phone_number: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (event: any) => {
    setIsLoadingPage(true);
    try {
      const { nextStep } = await signIn({
        username: formData.email,
        password: formData.password,
      });
      if (nextStep.signInStep === "DONE") {
        setIsAuthenticated(true);
      }
      router.push("/");
    } catch (error) {
      console.log("error signing up:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  return (
    <>
      <Stack height={"100dvh"}>
        <CustomHeader title="Iniciar Sesión" />

        <Stack flex={1} padding={1.5}>
          {!isLoadingPage ? (
            <Stack spacing={1}>
              <CustomTextField
                text="Correo*"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />

              <CustomTextField
                text="Contraseña*"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
              />
            </Stack>
          ) : (
            <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
              <CircularProgress color="secondary" />
            </Stack>
          )}
        </Stack>

        <Stack
          height={"76px"}
          justifyContent={"center"}
          bgcolor={theme.palette.primary.main}
          padding={1.5}
          marginTop={"auto"}
        >
          <CustomButton text="Acceder" onClick={handleSignIn} />
        </Stack>
      </Stack>
    </>
  );
}
