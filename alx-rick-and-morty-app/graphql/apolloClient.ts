import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({ 
  link: new HttpLink({ 
    uri: "https://rickandmortyapi.com/graphql",
  }), 
  cache: new InMemoryCache(), // InMemoryCache is the default cache implementation for Apollo Client 3.0
});

export default client;