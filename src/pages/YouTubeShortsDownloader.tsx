import { Youtube } from "lucide-react";
import ToolPage from "@/components/ToolPage";

const YouTubeShortsDownloader = () => (
  <ToolPage
    title="YouTube Shorts Downloader"
    description="Download YouTube Shorts in HD quality. Fast and completely free."
    placeholder="https://youtube.com/shorts/..."
    icon={<Youtube className="h-8 w-8 text-primary-foreground" />}
    gradient="bg-gradient-to-br from-red-500 via-red-600 to-orange-500"
  />
);

export default YouTubeShortsDownloader;
