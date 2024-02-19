"use client";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import { Stack, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ClientAddProductProps {
  createProduct: (formData: FormData) => Promise<void>;
}

export default function ClientAddProduct({
  createProduct,
}: ClientAddProductProps): React.JSX.Element {
  const theme = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState(new FormData());
  const [price, setPrice] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formData.set(name, value);
    if (name === "price") {
      setPrice(parseFloat(value));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProduct(formData);
    router.push("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack height={"100dvh"}>
          <CustomHeader title="Nuevo Articulo" />

          <Stack spacing={1} padding={1.5}>
            <CustomTextField
              text="Nombre*"
              name="name"
              onChange={handleChange}
            />

            <CustomTextField
              text="Precio*"
              name="price"
              onChange={handleChange}
              placeholder="0.00"
            />

            <CustomTextField
              text="IVA 16*"
              type="number"
              value={(price * 0.16 || 0).toFixed(2)}
              disabled
            />

            <CustomTextField
              text="Precio con IVA*"
              type="number"
              value={(price * 1.16 || 0).toFixed(2)}
              disabled
            />
          </Stack>

          <Stack
            height={"76px"}
            justifyContent={"center"}
            bgcolor={theme.palette.primary.main}
            padding={1.5}
            marginTop={"auto"}
          >
            <CustomButton text="Guardar Articulo" type="submit" />
          </Stack>
        </Stack>
      </form>
    </>
  );
}
