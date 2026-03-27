import { Instagram } from "lucide-react";
import ToolPage from "@/components/ToolPage";

const InstagramDownloader = () => (
  <ToolPage
    title="Instagram Downloader"
    description="Download Instagram Reels, Videos, Photos & Stories in HD quality. Fast, free, and no login required."
    placeholder="https://www.instagram.com/reel/..."
    icon={<Instagram className="h-8 w-8 text-primary-foreground" />}
    gradient="bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400"
  />
);

export default InstagramDownloader;
