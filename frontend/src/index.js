import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CategoriesProvider } from "./context/CategoriesContext";
import { DataProvider } from "./context/DataProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./context/UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <DataProvider>
          <CategoriesProvider>
            <App />
          </CategoriesProvider>
        </DataProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
