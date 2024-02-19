"use client";
import { AuthContext } from "@/src/context/AuthContext";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import { CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import { signIn, signUp } from "aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
  email: string;
  phone_number: string;
}

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

// interface ClientSignPageProps {
//   handleSignUp: (formData: FormData) => Promise<void>;
//   handleSignIn: (formData: FormData) => Promise<void>;
// }

export default function ClientSignPage({}): React.JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

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
        localStorage.setItem("isAuthenticated", "true");

        router.push("/");
      }
    } catch (error) {
      console.log("error signing up:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const handleSignUp = async (event: any) => {
    setIsLoadingPage(true);
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
          },
          autoSignIn: true,
        },
      });
      if (userId) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");

        router.push("/");
      }
    } catch (error) {
      console.log("error signing up:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };
  return (
    <>
      <Stack height={"100dvh"}>
        <CustomHeader title={"Inicia"} />

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

              {!isSignUp ? (
                <Typography
                  paddingTop={0.5}
                  variant="body2"
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                  onClick={() => setIsSignUp(true)}
                >
                  Registrarse
                </Typography>
              ) : (
                <Typography
                  paddingTop={0.5}
                  variant="body2"
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                  onClick={() => setIsSignUp(false)}
                >
                  Iniciar Sesión
                </Typography>
              )}
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
          <CustomButton
            text={isSignUp ? "Registrarse" : "Acceder"}
            onClick={isSignUp ? handleSignUp : handleSignIn}
          />
        </Stack>
      </Stack>
    </>
  );
}
