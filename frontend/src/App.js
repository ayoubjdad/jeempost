import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./themes/overrides";
import Editor from "./pages/editor/Editor";
import Article from "./pages/article/Article";
import Categories from "./pages/categories/Categories";
import { useContext } from "react";
import { CategoriesContext } from "./context/CategoriesContext";

export default function App() {
  const queryClient = new QueryClient();
  const { category } = useContext(CategoriesContext);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:linkDate/:headline" element={<Article />} />
            <Route path="/editor" element={<Editor />} />
            <Route
              path={`/${category}`}
              element={<Categories category={category} />}
            />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
