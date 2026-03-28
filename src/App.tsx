import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ToolPageWrapper from "./pages/ToolPageWrapper";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/:categorySlug" element={<CategoryPageOrTool />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Smart router: check if slug matches a category or a tool
import { categories } from "@/lib/tools";
import { useParams, Navigate } from "react-router-dom";

const categorySlugs = Object.values(categories).map((c) => c.slug);

const CategoryPageOrTool = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  if (!categorySlug) return <Navigate to="/" replace />;
  if (categorySlugs.includes(categorySlug)) return <CategoryPage />;
  // Treat as tool slug
  return <ToolPageWrapper />;
};

// Re-import for the wrapper to use toolSlug param correctly
import { getToolBySlug } from "@/lib/tools";

// Override ToolPageWrapper to use categorySlug param since we're using a single route param
const ToolPageWrapperInner = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const tool = categorySlug ? getToolBySlug(categorySlug) : undefined;
  if (!tool) return <NotFound />;
  return <ToolPageWrapper />;
};

export default App;
