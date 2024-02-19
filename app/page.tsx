import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import * as queries from "@/src/graphql/queries";
import config from "@/src/amplifyconfiguration.json";
import ClientHomePage from "./client_HomePage";

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

export default async function Home() {
  const fetchProducts = async () => {
    "use server";
    const { data, errors } = await cookiesClient.graphql({
      query: queries.listProducts,
    });

    return data.listProducts.items;
  };

  return (
    <>
      <ClientHomePage fetchProducts={fetchProducts} />
    </>
  );
}
