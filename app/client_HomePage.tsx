"use client";
import { Product } from "@/src/API";
import CustomButton from "@/src/shared/components/CustomButton";
import CustomHeader from "@/src/shared/components/Header";
import ProductCard from "@/src/shared/components/ProductCard";
import { Stack, useTheme } from "@mui/material";
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
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    getProducts();
  }, [fetchProducts]);

  return (
    <>
      <Stack minHeight={"100vh"}>
        <CustomHeader title="Artículos" />

        <Stack spacing={1} padding={1.5}>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <Link
                  href={`products/${product.id}`}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                >
                  <ProductCard key={product.id} product={product} />
                </Link>
              </div>
            );
          })}
        </Stack>

        <Stack
          height={"76px"}
          justifyContent={"center"}
          bgcolor={theme.palette.primary.main}
          padding={1.5}
          marginTop={"auto"}
        >
          <Link href="/addproduct">
            <CustomButton text="Add Product" />
          </Link>
        </Stack>
      </Stack>
    </>
  );
}
