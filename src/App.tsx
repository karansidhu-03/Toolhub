import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useParams, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ToolPageWrapper from "./pages/ToolPageWrapper";
import DownloaderPage from "./pages/DownloaderPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import { categories, getToolBySlug, seoRedirects } from "@/lib/tools";

const queryClient = new QueryClient();

const categorySlugs = Object.values(categories).map((c) => c.slug);
const downloaderSlugs = ["instagram-downloader", "tiktok-downloader", "youtube-downloader"];

const SlugRouter = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/" replace />;
  if (seoRedirects[slug]) return <Navigate to={seoRedirects[slug]} replace />;
  if (downloaderSlugs.includes(slug)) return <DownloaderPage />;
  if (categorySlugs.includes(slug)) return <CategoryPage />;
  if (getToolBySlug(slug)) return <ToolPageWrapper />;
  return <NotFound />;
};

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
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/:slug" element={<SlugRouter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
