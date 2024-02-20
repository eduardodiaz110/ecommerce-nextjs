import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import config from "@/src/amplifyconfiguration.json";
import { cookies } from "next/headers";
import * as mutations from "../../../src/graphql/mutations";
import { revalidatePath } from "next/cache";
import ClientAddProduct from "./client_AddProduct";

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

async function createProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString() ?? "";
  const price = formData.get("price")
    ? parseFloat(formData.get("price")?.toString() || "0")
    : 0;
  const priceIva = parseFloat((price * 1.16).toFixed(2));

  const { data } = await cookiesClient.graphql({
    query: mutations.createProduct,
    variables: {
      input: {
        name: name,
        price: price,
        priceIva: priceIva,
      },
    },
  });

  console.log("Created Todo: ", data?.createProduct);

  revalidatePath("/");
}

export default async function addProductPage() {
  return (
    <>
      <ClientAddProduct createProduct={createProduct} />
    </>
  );
}
