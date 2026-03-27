import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import InstagramDownloader from "./pages/InstagramDownloader";
import TikTokDownloader from "./pages/TikTokDownloader";
import YouTubeShortsDownloader from "./pages/YouTubeShortsDownloader";
import ImageCompressor from "./pages/ImageCompressor";
import VideoConverter from "./pages/VideoConverter";
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
            <Route path="/instagram-downloader" element={<InstagramDownloader />} />
            <Route path="/tiktok-downloader" element={<TikTokDownloader />} />
            <Route path="/youtube-shorts-downloader" element={<YouTubeShortsDownloader />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/video-converter" element={<VideoConverter />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
