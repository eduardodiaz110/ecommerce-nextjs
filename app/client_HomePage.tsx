"use client";
import { Product } from "@/src/API";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomHeader from "@/src/shared/components/Header";
import ProductCard from "@/src/shared/components/ProductCard";
import { CircularProgress, Stack, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";

interface ClientHomePageProps {
  fetchProducts: () => Promise<Product[]>;
}

export default function ClientHomePage({
  fetchProducts,
}: ClientHomePageProps): React.JSX.Element {
  const theme = useTheme();
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    fetch();
    setIsLoadingPage(false);
  }, [fetchProducts]);

  return (
    <>
      <Stack minHeight={"100dvh"}>
        <CustomHeader profile title="Artículos" />
        <Stack flex={1} padding={1.5}>
          {!isLoadingPage ? (
            <Stack spacing={1}>
              {products.map((product) => {
                return (
                  <div key={product.id}>
                    <Link
                      href={`products/${product.id}`}
                      style={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                      }}
                      as={`/products/${product.id}`}
                    >
                      <ProductCard key={product.id} product={product} />
                    </Link>
                  </div>
                );
              })}
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
          <Link href="/products/add" as={"/products/add"}>
            <CustomButton text="Nuevo artículo" />
          </Link>
        </Stack>
      </Stack>
    </>
  );
}
