"use client";
import CustomAlertDialog from "@/src/shared/components/CustomAlertDialog";
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
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    title: "",
    text: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formData.set(name, value);
    if (name === "price") {
      setPrice(parseFloat(value));
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (
      !formData.get("name") ||
      (formData.get("name")?.toString().length || 0) > 200
    ) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "Por favor, complete el campo nombre correctamente (máximo 200 caracteres).",
      });
      return;
    }

    if (price === 0 || isNaN(price) || price <= 0 || price > 99999) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "Ingresa un precio válido. Debe estar entre 1 y 99,999.",
      });
      return;
    }

    createProduct(formData);
    router.push("/");
  };

  return (
    <>
      <Stack height={"100dvh"}>
        <CustomHeader back title="Nuevo Articulo" />

        <Stack spacing={1} padding={1.5}>
          <CustomTextField
            text="Nombre*"
            placeholder="Nombre del artículo"
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
          <CustomButton text="Guardar Articulo" onClick={handleSubmit} />
        </Stack>
      </Stack>
      <CustomAlertDialog
        open={alertDialog.open}
        onClose={() => setAlertDialog({ ...alertDialog, open: false })}
        title={alertDialog.title}
        text={alertDialog.text}
      />
    </>
  );
}
