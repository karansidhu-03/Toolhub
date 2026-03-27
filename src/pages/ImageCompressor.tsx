import { Image } from "lucide-react";
import ToolPage from "@/components/ToolPage";

const ImageCompressor = () => (
  <ToolPage
    title="Image Compressor"
    description="Compress JPEG, PNG, and WebP images without losing quality. Reduce file size up to 80%."
    placeholder=""
    icon={<Image className="h-8 w-8 text-primary-foreground" />}
    gradient="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500"
    acceptFile
    fileAccept="image/*"
  />
);

export default ImageCompressor;
