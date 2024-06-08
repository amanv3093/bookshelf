import { createContext, useContext, useState } from "react";

export const Context = createContext(null);

export const UseContext = () => {
  return useContext(Context);
};
export const ContextProvider = (props) => {
  const [searchText, setSearchText] = useState("aman");

  return (
    <Context.Provider value={{ searchText, setSearchText }}>
      {props.children}
    </Context.Provider>
  );
};
