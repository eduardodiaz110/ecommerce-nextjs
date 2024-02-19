"use client";
import { Product } from "@/src/API";
import CustomAlertDialog from "@/src/shared/components/CustomAlertDialog";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import theme from "@/src/theme";
import { CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ClientEditProductPageProps {
  fetchProduct: () => Promise<Product | null>;
  updateProduct: (formData: FormData) => Promise<void>;
}

export default function ClientEditProductPage({
  updateProduct,
  fetchProduct,
}: ClientEditProductPageProps) {
  const router = useRouter();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [product, setProduct] = useState<Product | null>();
  const [formData, setFormData] = useState(new FormData());
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    title: "",
    text: "",
    onClose: () => {},
  });

  const name = product?.name || "";
  const price = product?.price || 0;

  const fetch = async () => {
    const product = await fetchProduct();
    formData.set("id", product?.id || "");
    formData.set("name", product?.name || "");
    formData.set("price", product?.price?.toString() || "");
    formData.set("priceIva", (product?.price || 0 * 1.16).toFixed(2));
    setProduct(product);
    setIsLoadingPage(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formData.set(name, value);
    setProduct((prevProduct) => {
      if (prevProduct) {
        return { ...prevProduct, [name]: value };
      }
      return prevProduct;
    });
  };

  const handleSubmit = async (event: any) => {
    if (
      !formData.get("name") ||
      (formData.get("name")?.toString().length || 0) > 200
    ) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "Por favor, complete el campo nombre correctamente (máximo 200 caracteres).",
        onClose: () => {
          setAlertDialog({ ...alertDialog, open: false });
        },
      });
      return;
    }

    if (price === 0 || isNaN(price) || price <= 0 || price > 99999) {
      setAlertDialog({
        open: true,
        title: "Error",
        text: "Ingresa un precio válido. Debe estar entre 1 y 99,999.",
        onClose: () => {
          setAlertDialog({ ...alertDialog, open: false });
        },
      });
      return;
    }

    await updateProduct(formData);
    setAlertDialog({
      open: true,
      title: "Éxito",
      text: "El producto ha sido actualizado.",
      onClose: () => {
        setAlertDialog({ ...alertDialog, open: false });
        router.replace(`/products/${product?.id}`);
      },
    });
  };

  useEffect(() => {
    fetch();
  }, [fetch, fetchProduct]);

  return (
    <>
      <Stack minHeight={"100dvh"}>
        <CustomHeader title="Editar Articulo" />

        <Stack flex={1} padding={1.5}>
          {!isLoadingPage ? (
            <Stack spacing={1}>
              <CustomTextField
                text="Nombre*"
                name="name"
                onChange={handleChange}
                defaultValue={name}
              />

              <CustomTextField
                text="Precio*"
                name="price"
                type="number"
                onChange={handleChange}
                defaultValue={price}
              />

              <CustomTextField
                text="IVA 16*"
                type="number"
                value={(price * 0.16).toFixed(2)}
                disabled
              />

              <CustomTextField
                text="Precio con IVA*"
                type="number"
                value={(price * 1.16).toFixed(2)}
                disabled
              />
            </Stack>
          ) : (
            <Stack
              flex={1}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress color="secondary" />
            </Stack>
          )}
        </Stack>

        <Stack
          height={"76px"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={theme.palette.primary.main}
          padding={1.5}
          marginTop={"auto"}
          flexDirection={"row"}
        >
          <CustomButton text="Guardar cambios" onClick={handleSubmit} />
        </Stack>
      </Stack>
      <CustomAlertDialog
        open={alertDialog.open}
        onClose={alertDialog.onClose}
        title={alertDialog.title}
        text={alertDialog.text}
      />
    </>
  );
}
