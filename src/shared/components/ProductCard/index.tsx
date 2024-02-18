import { Product } from "@/src/API";
import { Stack, Typography } from "@mui/material";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Stack
      minWidth={"323px"}
      height={"68px"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      spacing={1}
    >
      <Typography variant="h2">{product.name}</Typography>
      <Typography variant="h3">
        Precio con IVA: ${product.priceIva?.toFixed(2)}
      </Typography>
    </Stack>
  );
};

export default ProductCard;
