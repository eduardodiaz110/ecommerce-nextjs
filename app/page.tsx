import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import * as queries from "@/src/graphql/queries";
import ClientHomePage from "./client_HomePage";
import config from "@/src/amplifyconfiguration.json";

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

export default async function App() {
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
