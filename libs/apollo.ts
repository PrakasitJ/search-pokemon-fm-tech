import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://graphql-pokemon2.vercel.app/",
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
