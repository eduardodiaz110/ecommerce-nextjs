"use client";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import { Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
  email: string;
  phone_number: string;
}

interface ClientSignupPageProps {
  handleSignUp: (formData: FormData) => Promise<void>;
}

export default function ClientSingupPage({
  handleSignUp,
}: ClientSignupPageProps): React.JSX.Element {
  const theme = useTheme();

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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleSignUp(formData);
  };

  return (
    <>
      <Stack height={"100dvh"}>
        <CustomHeader title="Registro" />

        <Stack flex={1} spacing={1} padding={1.5}>
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

        <Stack
          height={"76px"}
          justifyContent={"center"}
          bgcolor={theme.palette.primary.main}
          padding={1.5}
          marginTop={"auto"}
        >
          <CustomButton text="Registrarse" onClick={handleSubmit} />
        </Stack>
      </Stack>
    </>
  );
}
