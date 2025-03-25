import React from "react";
import Search from "./components/Search";
import ProductList from "./components/Users";
interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <Search />
      <ProductList/>
    </>
  );
};

export default App;
