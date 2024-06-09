import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./context/Context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddBookshelf from "./component/addBookshelf/AddBookshelf";
const root = ReactDOM.createRoot(document.getElementById("root"));

let router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/bookShelf", element: <AddBookshelf/> },
  
]);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
