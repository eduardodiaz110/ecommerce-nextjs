"use client";
import { Product } from "@/src/API";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomTextField from "@/src/shared/components/CustomTextField";
import CustomHeader from "@/src/shared/components/Header";
import theme from "@/src/theme";
import { Dialog, Stack, Typography } from "@mui/material";
import { Client } from "aws-amplify/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ClientProductPageProps {
  product: Product | null | undefined;
  deleteProduct: (id: string) => Promise<void>;
}

export default function ClientProductPage({
  product,
  deleteProduct,
}: ClientProductPageProps) {
  const router = useRouter();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const DeleteDialog = () => {
    return (
      <>
        <Stack
          height={"35px"}
          bgcolor={theme.palette.primary.main}
          justifyContent={"center"}
          alignItems={"left"}
          padding={1.5}
        >
          <Typography>Eliminar Articulo</Typography>
        </Stack>
        <Stack padding={1.5} minHeight={"50px"}>
          <Typography>
            ¿Estás seguro que deseas eliminar este producto?
          </Typography>
        </Stack>
        <Stack>
          <Stack
            direction="row"
            justifyContent={"right"}
            padding={1.5}
            spacing={1}
          >
            <CustomButton
              text="Si"
              delete
              sx={{
                borderRadius: "800px",
                width: "25%",
              }}
              onClick={() => {
                deleteProduct(product?.id || "");
                router.push("/");
              }}
            />
            <CustomButton
              text="No"
              onClick={() => setOpenDeleteDialog(false)}
              sx={{
                backgroundColor: theme.palette.error.main,
                borderRadius: "800px",
                width: "25%",
              }}
            />
          </Stack>
        </Stack>
      </>
    );
  };

  return (
    <>
      <Stack minHeight={"100dvh"}>
        <CustomHeader title="Ver Articulo" />

        {product && product.price ? (
          <Stack spacing={1} padding={1.5}>
            <Stack spacing={1} padding={1.5}>
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
          </Stack>
        ) : (
          <Typography>No se encontró el producto</Typography>
        )}

        <Stack
          height={"76px"}
          justifyContent={"center"}
          bgcolor={theme.palette.primary.main}
          padding={1.5}
          marginTop={"auto"}
          flexDirection={"row"}
        >
          <Stack width={"50%"} padding={1}>
            <Link
              href={`/products/edit/${product?.id}`}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <CustomButton text="Editar" />
            </Link>
          </Stack>
          <Stack width={"50%"} padding={1}>
            <Dialog
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
            >
              <DeleteDialog />
            </Dialog>
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
