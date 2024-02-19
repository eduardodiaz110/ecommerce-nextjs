"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
import ClientSinginPage from "@/app/auth/signin/client_SigninPage";

Amplify.configure(config);

interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  fetchSession: () => Promise<true | false | undefined>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
  fetchSession: async () => {
    return false;
  },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  //   const fetchSession = async () => {
  //     try {
  //       const session = await fetchAuthSession().catch((error) => {
  //         console.log("error", error);
  //       });
  //       console.log(session);
  //       setIsAuthenticated(session ? true : false);
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //     }
  //     };

  const fetchSession = async () => {
    try {
      const session = await fetchAuthSession().catch((error) => {
        console.log("error", error);
      });
      if (session) {
        return true;
      }
      //   setIsAuthenticated(session ? true : false);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    fetchSession();
    console.log("fetchSession");
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, fetchSession }}
    >
      {isAuthenticated === false ? <ClientSinginPage /> : <>{children}</>}
    </AuthContext.Provider>
  );
};
