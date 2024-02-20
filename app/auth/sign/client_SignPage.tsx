"use client";
import { AuthContext } from "@/src/context/AuthContext";
import CustomAlertDialog from "@/src/shared/components/CustomAlertDialog";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomFormDialog from "@/src/shared/components/CustomFormDialog";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import { CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import {
  confirmSignUp,
  resendSignUpCode,
  signIn,
  signUp,
} from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  verificationCode: string;
}

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
    verificationCode: "",
  });
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    title: "",
    text: "",
    onClose: () => {},
  });
  const [confirmationCodeDialog, setConfirmationCodeDialog] = useState({
    open: false,
    title: "",
    text: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (event: any) => {
    if (!formData.email || !formData.password) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "Por favor, complete todos los campos.",
        onClose: () => {
          setAlertDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        },
      });
      return;
    }

    setIsLoadingPage(true);
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: formData.email,
        password: formData.password,
      });
      console.log("nextStep", nextStep);
      console.log("isSignedIn", isSignedIn);
      if (nextStep.signInStep === "DONE") {
        setIsAuthenticated(true);

        router.push("/");
      }
      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        setConfirmationCodeDialog({
          open: true,
          title: "Código de verificación",
          text: "Ingresa el código de verificación que hemos enviado a tu correo.",
        });
      }
    } catch (error) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "El usuario no existe. Regístrate para acceder al sistema.",
        onClose: () => {
          setAlertDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        },
      });
    } finally {
      setIsLoadingPage(false);
    }
  };

  const handleSignUp = async (event: any) => {
    if (!formData.email || !formData.password) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "Por favor, complete todos los campos.",
        onClose: () => {
          setAlertDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        },
      });
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "Por favor, ingresa un correo válido.",
        onClose: () => {
          setAlertDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        },
      });
      return;
    }

    if (formData.password.length < 8) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "La contraseña debe tener al menos 8 caracteres.",
        onClose: () => {
          setAlertDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        },
      });
      return;
    }

    setIsLoadingPage(true);
    try {
      const { isSignUpComplete, nextStep, userId } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
          },
          autoSignIn: true,
        },
      });
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setConfirmationCodeDialog({
          open: true,
          title: "Código de verificación",
          text: "Ingresa el código de verificación que hemos enviado a tu correo.",
        });
      }
    } catch (error) {
      console.log("error signing up:", error);
      setAlertDialog({
        open: true,
        title: "Error",
        text: "El correo ya está registrado. Por favor, intenta con otro correo.",
        onClose: () => {
          setAlertDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        },
      });
      formData.email = "";
      formData.password = "";
    } finally {
      setIsLoadingPage(false);
    }
  };

  const handleVerificationCode = async (confirmationCode: string) => {
    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: confirmationCode,
      });

      setAlertDialog({
        open: true,
        title: "Éxito",
        text: "¡Tu cuenta ha sido verificada con éxito!",
        onClose: () => {
          setAlertDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        },
      });
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "El código de verificación es incorrecto. Por favor, inténtalo nuevamente.",
        onClose: () => {
          setAlertDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        },
      });
    }
  };

  return (
    <>
      <Stack height={"100dvh"}>
        <CustomHeader title={"Control de Acceso"} />

        <Stack flex={1} padding={1.5}>
          {!isLoadingPage ? (
            <Stack spacing={1}>
              <CustomTextField
                text="Correo*"
                name="email"
                placeholder="Correo electrónico"
                onChange={handleChange}
                value={formData.email}
              />

              <CustomTextField
                text="Contraseña*"
                placeholder="Contraseña"
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
      <CustomAlertDialog
        open={alertDialog.open}
        onClose={alertDialog.onClose}
        title={alertDialog.title}
        text={alertDialog.text}
      />
      <CustomFormDialog
        open={confirmationCodeDialog.open}
        title={confirmationCodeDialog.title}
        text={confirmationCodeDialog.text}
        onClose={() => {
          setConfirmationCodeDialog((prevData) => ({
            ...prevData,
            open: false,
          }));
        }}
        onAccept={() => handleVerificationCode(formData.verificationCode)}
        form={
          <Stack spacing={1.5}>
            <CustomTextField
              text="Código de verificación*"
              placeholder="Código de verificación"
              name="verificationCode"
              onChange={handleChange}
            />
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                opacity: 0.7,
                textAlign: "left",
                justifyContent: "left",
                marginTop: "16px",
                padding: 0,
              }}
              onClick={() => {
                resendSignUpCode({
                  username: formData.email,
                }).catch((error) => {
                  console.error("error resending code:", error);
                });
              }}
            >
              Reenviar código
            </button>
          </Stack>
        }
      />
    </>
  );
}
