import { FileVideo } from "lucide-react";
import ToolPage from "@/components/ToolPage";

const VideoConverter = () => (
  <ToolPage
    title="Video to MP4 Converter"
    description="Convert any video format to MP4 quickly and easily. Supports AVI, MOV, MKV, WebM and more."
    placeholder=""
    icon={<FileVideo className="h-8 w-8 text-primary-foreground" />}
    gradient="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-400"
    acceptFile
    fileAccept="video/*"
  />
);

export default VideoConverter;
