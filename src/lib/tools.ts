import { FileText, Image, FileVideo, Download, Scissors, Merge, SplitSquareHorizontal, FileOutput, Minimize2, Maximize2, RefreshCw, Instagram, Video, Youtube } from "lucide-react";

export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  icon: any;
  gradient: string;
  category: ToolCategory;
  acceptFile?: boolean;
  fileAccept?: string;
  placeholder?: string;
  faqs: { q: string; a: string }[];
}

export type ToolCategory = "pdf" | "image" | "video" | "downloader";

export const categories: Record<ToolCategory, { label: string; description: string; slug: string; icon: any; gradient: string }> = {
  pdf: { label: "PDF Tools", description: "Compress, merge, split, and convert PDF files online for free.", slug: "pdf-tools", icon: FileText, gradient: "from-red-500 to-rose-600" },
  image: { label: "Image Tools", description: "Compress, resize, and convert images in seconds.", slug: "image-tools", icon: Image, gradient: "from-violet-500 to-purple-600" },
  video: { label: "Video Tools", description: "Convert and compress video files to any format.", slug: "video-tools", icon: FileVideo, gradient: "from-amber-500 to-orange-500" },
  downloader: { label: "Downloaders", description: "Download videos from Instagram, TikTok, and YouTube.", slug: "downloaders", icon: Download, gradient: "from-cyan-500 to-teal-500" },
};

export const tools: Tool[] = [
  // PDF Tools
  {
    slug: "compress-pdf",
    title: "Compress PDF",
    shortTitle: "Compress",
    description: "Reduce PDF file size without losing quality. Optimize PDFs for email, web, and storage.",
    metaDescription: "Compress PDF files online for free. Reduce PDF size up to 90% without losing quality. Fast, secure, no registration.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-red-500 via-rose-500 to-pink-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "How much can I compress a PDF?", a: "Our tool can reduce PDF size by up to 90% depending on the content. Image-heavy PDFs see the most reduction." },
      { q: "Does compression affect quality?", a: "We use smart compression that maintains visual quality while significantly reducing file size." },
      { q: "Is there a file size limit?", a: "You can compress PDFs up to 100MB for free." },
    ],
  },
  {
    slug: "merge-pdf",
    title: "Merge PDF",
    shortTitle: "Merge",
    description: "Combine multiple PDF files into one document. Easy drag-and-drop interface.",
    metaDescription: "Merge PDF files online for free. Combine multiple PDFs into one document in seconds. No software needed.",
    icon: Merge,
    gradient: "bg-gradient-to-br from-rose-500 via-red-500 to-orange-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "How many PDFs can I merge?", a: "You can merge up to 20 PDF files at once." },
      { q: "Can I reorder pages?", a: "Yes, you can drag and drop to reorder files before merging." },
      { q: "Is the merged PDF quality preserved?", a: "Absolutely. Merging doesn't affect the quality of your documents." },
    ],
  },
  {
    slug: "split-pdf",
    title: "Split PDF",
    shortTitle: "Split",
    description: "Split a PDF into multiple files. Extract specific pages from your document.",
    metaDescription: "Split PDF files online for free. Extract pages or split into multiple documents instantly.",
    icon: SplitSquareHorizontal,
    gradient: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "Can I extract specific pages?", a: "Yes, you can select individual pages or page ranges to extract." },
      { q: "What happens to the original PDF?", a: "The original file is untouched. We create new files from the selected pages." },
    ],
  },
  {
    slug: "pdf-to-word",
    title: "PDF to Word",
    shortTitle: "To Word",
    description: "Convert PDF files to editable Word documents while preserving formatting.",
    metaDescription: "Convert PDF to Word (DOCX) online for free. Preserve formatting and layout. Fast and accurate conversion.",
    icon: FileOutput,
    gradient: "bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "Is the formatting preserved?", a: "Our converter preserves most formatting including fonts, images, and layout." },
      { q: "Can I edit the converted document?", a: "Yes, the output is a fully editable .docx file compatible with Microsoft Word and Google Docs." },
    ],
  },
  // Image Tools
  {
    slug: "image-compressor",
    title: "Image Compressor",
    shortTitle: "Compress",
    description: "Compress JPEG, PNG, and WebP images without losing quality. Reduce file size up to 80%.",
    metaDescription: "Compress images online for free. Reduce JPEG, PNG, WebP size up to 80% without quality loss. Fast bulk compression.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Which image formats are supported?", a: "We support JPEG, PNG, WebP, GIF, and BMP formats." },
      { q: "How much can I compress?", a: "Typically 50-80% file size reduction while maintaining visual quality." },
      { q: "Can I compress multiple images?", a: "Yes, you can upload and compress multiple images at once." },
    ],
  },
  {
    slug: "image-resizer",
    title: "Image Resizer",
    shortTitle: "Resize",
    description: "Resize images to any dimension. Perfect for social media, web, and print.",
    metaDescription: "Resize images online for free. Change dimensions for social media, web, or print. Maintains aspect ratio.",
    icon: Maximize2,
    gradient: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Can I maintain aspect ratio?", a: "Yes, aspect ratio is maintained by default. You can also set custom dimensions." },
      { q: "What output formats are available?", a: "You can export as JPEG, PNG, or WebP." },
    ],
  },
  {
    slug: "image-converter",
    title: "Image Converter",
    shortTitle: "Convert",
    description: "Convert images between formats: JPEG, PNG, WebP, GIF, and more.",
    metaDescription: "Convert images between formats online for free. Support JPEG, PNG, WebP, GIF, BMP. Instant conversion.",
    icon: RefreshCw,
    gradient: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Which formats can I convert between?", a: "We support JPEG, PNG, WebP, GIF, and BMP conversions." },
      { q: "Does conversion affect quality?", a: "We use high-quality settings by default. You can adjust quality for lossy formats." },
    ],
  },
  // Video Tools
  {
    slug: "video-converter",
    title: "Video to MP4 Converter",
    shortTitle: "To MP4",
    description: "Convert any video format to MP4 quickly and easily. Supports AVI, MOV, MKV, WebM and more.",
    metaDescription: "Convert video to MP4 online for free. Support AVI, MOV, MKV, WebM. Fast browser-based conversion.",
    icon: FileVideo,
    gradient: "bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-400",
    category: "video",
    acceptFile: true,
    fileAccept: "video/*",
    faqs: [
      { q: "Which video formats are supported?", a: "We support AVI, MOV, MKV, WebM, FLV, WMV, and many more." },
      { q: "Is there a file size limit?", a: "You can convert videos up to 500MB for free." },
      { q: "How long does conversion take?", a: "Most videos convert in under a minute, depending on file size." },
    ],
  },
  {
    slug: "video-compressor",
    title: "Video Compressor",
    shortTitle: "Compress",
    description: "Reduce video file size while maintaining quality. Perfect for sharing and uploading.",
    metaDescription: "Compress video files online for free. Reduce video size without quality loss. Fast and easy.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500",
    category: "video",
    acceptFile: true,
    fileAccept: "video/*",
    faqs: [
      { q: "How much can videos be compressed?", a: "Typically 40-70% reduction depending on the original video quality and settings." },
      { q: "Does it affect video quality?", a: "We use smart compression to maintain visual quality while reducing file size." },
    ],
  },
  // Downloaders
  {
    slug: "instagram-downloader",
    title: "Instagram Downloader",
    shortTitle: "Instagram",
    description: "Download Instagram Reels, Videos, and Photos in HD quality. Fast, free, and easy to use.",
    metaDescription: "Download Instagram Reels, videos, and photos for free. Save Instagram content in HD quality. No registration required.",
    icon: Instagram,
    gradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500",
    category: "downloader",
    placeholder: "https://www.instagram.com/reel/...",
    faqs: [
      { q: "Can I download Instagram Reels?", a: "Yes! Simply paste the Reel URL and click download to save it in HD quality." },
      { q: "Is it free to use?", a: "Completely free. No registration or sign-up required." },
      { q: "Can I download private content?", a: "No, only publicly available content can be downloaded." },
    ],
  },
  {
    slug: "tiktok-downloader",
    title: "TikTok Downloader",
    shortTitle: "TikTok",
    description: "Download TikTok videos without watermark in HD quality. Save any TikTok video for free.",
    metaDescription: "Download TikTok videos without watermark for free. Save TikTok videos in HD quality. No registration needed.",
    icon: Video,
    gradient: "bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500",
    category: "downloader",
    placeholder: "https://www.tiktok.com/@user/video/...",
    faqs: [
      { q: "Can I remove the TikTok watermark?", a: "Yes, our tool downloads videos without the TikTok watermark." },
      { q: "What quality are downloads?", a: "Videos are downloaded in the highest available quality, usually HD or Full HD." },
    ],
  },
  {
    slug: "youtube-shorts-downloader",
    title: "YouTube Shorts Downloader",
    shortTitle: "YT Shorts",
    description: "Download YouTube Shorts in HD quality. Save any YouTube Short to your device for free.",
    metaDescription: "Download YouTube Shorts in HD quality for free. Save any Short to your device instantly. No software needed.",
    icon: Youtube,
    gradient: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500",
    category: "downloader",
    placeholder: "https://youtube.com/shorts/...",
    faqs: [
      { q: "Can I download any YouTube Short?", a: "Yes, as long as the Short is publicly available." },
      { q: "What quality options are available?", a: "We offer HD (720p) and Full HD (1080p) download options." },
    ],
  },
];

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, limit = 4): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return tools.slice(0, limit);
  const sameCategory = tools.filter((t) => t.category === tool.category && t.slug !== slug);
  const others = tools.filter((t) => t.category !== tool.category);
  return [...sameCategory, ...others].slice(0, limit);
}
