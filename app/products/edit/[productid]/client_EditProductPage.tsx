"use client";
import { Product } from "@/src/API";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import theme from "@/src/theme";
import { Stack, Typography } from "@mui/material";
import { Client } from "aws-amplify/api";
import { useState } from "react";

interface ClientEditProductPageProps {
  product: Product | null | undefined;
}

export default function ClientEditProductPage({
  product,
}: ClientEditProductPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const pageHeight = window.innerHeight;

  return (
    <>
      <Stack minHeight={pageHeight}>
        <CustomHeader title="Editar Articulo" />

        {product && product.price ? (
          <Stack spacing={1} padding={1.5}>
            <Stack spacing={1} padding={1.5}>
              <CustomTextField
                text="Nombre*"
                name="name"
                //   onChange={handleChange}
                value={product?.name}
              />

              <CustomTextField
                text="Precio*"
                name="price"
                type="number"
                defaultValue={0}
                //   onChange={handleChange}
                value={product?.price.toString() || "0"}
              />

              <CustomTextField
                text="IVA 16*"
                type="number"
                value={(product?.price * 0.16 || 0).toFixed(2)}
                disabled
              />

              <CustomTextField
                text="Precio con IVA*"
                type="number"
                value={(product?.price * 1.16 || 0).toFixed(2)}
                disabled
              />
            </Stack>
          </Stack>
        ) : (
          <Typography>No se encontró el producto</Typography>
        )}

        <Stack
          height={"76px"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={theme.palette.primary.main}
          padding={1.5}
          marginTop={"auto"}
          flexDirection={"row"}
        >
          <CustomButton text="Guardar cambios" />
        </Stack>
      </Stack>
    </>
  );
}
