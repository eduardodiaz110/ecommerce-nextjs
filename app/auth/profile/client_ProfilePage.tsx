"use client";

import { AuthContext } from "@/src/context/AuthContext";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomHeader from "@/src/shared/components/Header";
import theme from "@/src/theme";
import { Stack, Typography } from "@mui/material";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import React from "react";
import { useState } from "react";

export default function ClientProfilePage() {
  const { setIsAuthenticated, isAuthenticated } = React.useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.log("error signing out:", error);
    }
  };

  return (
    <>
      <Stack height={"100dvh"}>
        <CustomHeader title="Iniciar Sesión" />

        <Stack flex={1} spacing={1} padding={1.5}>
          <Typography>
            {isAuthenticated ? "Bienvenido" : "No estas autenticado"}
          </Typography>
        </Stack>

        <Stack
          height={"76px"}
          justifyContent={"center"}
          bgcolor={theme.palette.primary.main}
          padding={1.5}
          marginTop={"auto"}
        >
          <CustomButton text="Cerrar Sesión" delete onClick={handleSignOut} />
        </Stack>
      </Stack>
    </>
  );
}
