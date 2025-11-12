import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetail } from "./pages/ProductDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout/Layout";
import { Toast } from "./components/common";
import { SearchBar } from "./components/common";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<div>Home page</div>} />
            <Route path="/products/:slug" element={<ProductDetail />} />
          </Routes>
        </Layout>
        <Toast />
        <SearchBar />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
