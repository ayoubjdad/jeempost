import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/home/Home";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./themes/overrides";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}