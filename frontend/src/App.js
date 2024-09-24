import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/home/Home";
import Header from "./layouts/header/Header";
import UrgentHeader from "./layouts/urgent-header/UrgentHeader";
import Footer from "./layouts/footer/Footer";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <UrgentHeader />
      <Home />
      <Footer />
    </QueryClientProvider>
  );
}
