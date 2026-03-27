import { Video } from "lucide-react";
import ToolPage from "@/components/ToolPage";

const TikTokDownloader = () => (
  <ToolPage
    title="TikTok Downloader"
    description="Download TikTok videos without watermark in HD. Save any TikTok video for free."
    placeholder="https://www.tiktok.com/@user/video/..."
    icon={<Video className="h-8 w-8 text-primary-foreground" />}
    gradient="bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500"
  />
);

export default TikTokDownloader;
