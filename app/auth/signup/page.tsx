import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import * as queries from "@/src/graphql/queries";
import { signUp } from "aws-amplify/auth";
import ClientSingupPage from "./client_SignupPage";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";

Amplify.configure(config);

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

export default async function signupPage() {
  const handleSignUp = async (formData: SignUpParameters) => {
    "use server";
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
          },
          autoSignIn: true,
        },
      });

      console.log(userId);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  return (
    <>
      <ClientSingupPage handleSignUp={handleSignUp} />
    </>
  );
}
