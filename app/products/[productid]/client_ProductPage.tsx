"use client";
import { Product } from "@/src/API";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomDeleteDialog from "@/src/shared/components/CustomDeleteDialog";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import theme from "@/src/theme";
import { CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ClientProductPageProps {
  fetchProduct: () => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<void>;
}

export default function ClientProductPage({
  fetchProduct,
  deleteProduct,
}: ClientProductPageProps) {
  const router = useRouter();

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [product, setProduct] = useState<Product | null>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const fetch = async () => {
    const product = await fetchProduct();
    setProduct(product);
    setIsLoadingPage(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Stack minHeight={"100dvh"}>
        <CustomHeader back title="Ver Articulo" />

        <Stack flex={1} padding={1.5}>
          {!isLoadingPage && product && product.price ? (
            <Stack spacing={1}>
              <CustomTextField
                text="Nombre*"
                name="name"
                value={product?.name}
                disabled
                shown
              />

              <CustomTextField
                text="Precio*"
                name="price"
                type="number"
                value={product?.price.toString() || "0"}
                disabled
                shown
              />

              <CustomTextField
                text="IVA 16*"
                type="number"
                value={(product?.price * 0.16 || 0).toFixed(2)}
                disabled
                shown
              />

              <CustomTextField
                text="Precio con IVA*"
                type="number"
                value={(product?.price * 1.16 || 0).toFixed(2)}
                disabled
                shown
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
          bgcolor={theme.palette.primary.main}
          padding={1.5}
          marginTop={"auto"}
          flexDirection={"row"}
        >
          <Stack width={"50%"} padding={1}>
            <CustomButton
              text="Editar"
              onClick={() => router.push(`/products/edit/${product?.id}`)}
            />
          </Stack>
          <Stack width={"50%"} padding={1}>
            <CustomDeleteDialog
              title="Eliminar Articulo"
              text="¿Estás seguro que deseas eliminar este articulo?"
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
              onAccept={() => {
                deleteProduct(product?.id || "");
                router.push("/");
              }}
            />

            <CustomButton
              delete
              text="Eliminar"
              onClick={() => {
                setOpenDeleteDialog(true);
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
