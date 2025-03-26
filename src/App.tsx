import React from "react";
import HeaderText from "./components/HeaderText";
import Search from "./components/Search";
import Toggle from "./components/Toggle"
import Users from "./components/Users";
import { UserProvider } from "./contexts/UserContext";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
    <div className="p-5">

      <UserProvider>
        <HeaderText/>
        <Search />
        <Toggle/>
        <Users />
      </UserProvider>
    </div>

    </>
  );
};

export default App;
