import { getProduct } from "@/src/graphql/queries";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { Typography } from "@mui/material";
import { cookies } from "next/headers";
import config from "@/src/amplifyconfiguration.json";
import ClientEditProductPage from "./client_EditProductPage";

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

export default async function EditProductPage({
  params,
}: {
  params: { productid: string };
}) {
  const { data, errors } = await cookiesClient.graphql({
    query: getProduct,
    variables: { id: params.productid },
  });

  const product = data.getProduct;

  return (
    <>
      <ClientEditProductPage product={product} />
    </>
  );
}
function graphqlOperation(getProduct: any, arg1: { id: string }): any {
  throw new Error("Function not implemented.");
}
