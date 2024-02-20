import { getProduct } from "@/src/graphql/queries";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import config from "@/src/amplifyconfiguration.json";
import ClientEditProductPage from "./client_EditProductPage";
import * as mutations from "../../../../src/graphql/mutations";
import { revalidatePath } from "next/cache";

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

export default async function EditProductPage({
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

  async function updateProduct(formData: FormData) {
    "use server";
    const name = formData.get("name")?.toString() ?? "";
    const price = formData.get("price")
      ? parseFloat(formData.get("price")?.toString() || "0")
      : 0;
    const priceIva = parseFloat((price * 1.16).toFixed(2));

    const { data } = await cookiesClient.graphql({
      query: mutations.updateProduct,
      variables: {
        input: {
          id: params.productid,
          name: name,
          price: price,
          priceIva: priceIva,
        },
      },
    });

    console.log("Updated Todo: ", data?.updateProduct);
    revalidatePath("/");
  }

  return (
    <>
      <ClientEditProductPage
        fetchProduct={fetchProduct}
        updateProduct={updateProduct}
      />
    </>
  );
}
