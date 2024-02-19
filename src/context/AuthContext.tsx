"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import ClientSignPage from "@/app/auth/sign/client_SignPage";
import LoadingPage from "../shared/components/LoadingPage";

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
  const fetchSession = async () => {
    try {
      const session = await fetchAuthSession().catch((error) => {
        console.log("error", error);
      });
      if (session) {
        setIsAuthenticated(true);

        return true;
      } else {
        setIsAuthenticated(false);

        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, fetchSession }}
    >
      {isAuthenticated === false ? (
        <ClientSignPage />
      ) : isAuthenticated === true ? (
        <>{children}</>
      ) : (
        <LoadingPage />
      )}
    </AuthContext.Provider>
  );
};
