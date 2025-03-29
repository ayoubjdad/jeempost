import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
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
import Edit from "./pages/admin/edit/Edit";
import Login from "./pages/login/Login";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import { UserContext } from "./context/UserProvider";
import ProtectedRoute from "./routes/protected-route/ProtectedRoute";
import { DataContext } from "./context/DataProvider";
import Loader from "./layouts/loader/Loader";
import Data from "./pages/home/Data";

export default function App() {
  const queryClient = new QueryClient();
  const { category } = useContext(CategoriesContext);
  const { fetched } = useContext(DataContext);

  // return
  //  !fetched ? (
  //   <Loader />
  // ) : (
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Data />} />
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/news/:linkDate/:headline" element={<Article />} />
              <Route path="/admin/news/add-new" element={<Editor />} />
              {/* <Route
                path="/admin/news/add-new"
                element={<ProtectedRoute element={<Editor />} />}
              /> */}
              <Route path="/admin/news/edit" element={<Edit />} />
              <Route
                path={`/${category}`}
                element={<Categories category={category} />}
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function MainLayout() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
