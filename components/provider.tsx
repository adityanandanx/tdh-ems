"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const ThemeProvider = dynamic(() => import("./theme-provider"), { ssr: false });

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const Provider = ({ children }: Props) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default Provider;
