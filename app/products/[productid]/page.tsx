import { getProduct } from "@/src/graphql/queries";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import config from "@/src/amplifyconfiguration.json";
import ClientProductPage from "./client_ProductPage";
import * as mutations from "../../../src/graphql/mutations";

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

export default async function ProductPage({
  params,
}: {
  params: { productid: string };
}) {
  async function fetchProduct() {
    "use server";
    const { data, errors } = await cookiesClient.graphql({
      query: getProduct,
      variables: { id: params.productid },
    });

    return data.getProduct || null;
  }

  const deleteProduct = async (id: string) => {
    "use server";
    const { data, errors } = await cookiesClient.graphql({
      query: mutations.deleteProduct,
      variables: {
        input: { id: id },
      },
    });
  };

  return (
    <>
      <ClientProductPage
        fetchProduct={fetchProduct}
        deleteProduct={deleteProduct}
      />
    </>
  );
}
