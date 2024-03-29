import "./style.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/NavBar";
import SidebarProfile from "./components/SidebarProfile";
import Footer from "./components/Footer";
import ThemeContext from "./utils/themeContext";

const httpLink = createHttpLink({ uri: "/graphql" });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const isLoggedIn = !!localStorage.getItem("id_token");
  const [theme, setTheme] = useState("Poke Ball");

  return (
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Navbar />
        <div className="row" style={{maxWidth: "100%"}}>
          {isLoggedIn && <SidebarProfile />}
          <div className={isLoggedIn ? "col-9" : "col-12"}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </ThemeContext.Provider>
    </ApolloProvider>
  );
}

export default App;
