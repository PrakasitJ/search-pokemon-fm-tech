"use client";

import { ApolloProvider } from "@apollo/client/react";
import createApolloClient from "@/libs/apollo";
import { useMemo } from "react";

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const client = useMemo(() => createApolloClient(), []);
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
