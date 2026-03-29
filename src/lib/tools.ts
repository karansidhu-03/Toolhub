import { FileText, Image, FileVideo, Download, Scissors, Merge, SplitSquareHorizontal, FileOutput, Minimize2, Maximize2, RefreshCw, Instagram, Youtube, Video } from "lucide-react";

export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  seoContent: string;
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
  downloader: { label: "Downloaders", description: "Download videos from Instagram, TikTok, and YouTube in MP4 & MP3.", slug: "downloaders", icon: Download, gradient: "from-pink-500 to-violet-600" },
  pdf: { label: "PDF Tools", description: "Compress, merge, split, and convert PDF files online for free.", slug: "pdf-tools", icon: FileText, gradient: "from-red-500 to-rose-600" },
  image: { label: "Image Tools", description: "Compress, resize, and convert images in seconds.", slug: "image-tools", icon: Image, gradient: "from-violet-500 to-purple-600" },
  video: { label: "Video Tools", description: "Convert and compress video files to any format.", slug: "video-tools", icon: FileVideo, gradient: "from-amber-500 to-orange-500" },
};

export const tools: Tool[] = [
  // Downloaders
  {
    slug: "instagram-downloader",
    title: "Instagram Downloader — Reels, Stories & Posts",
    shortTitle: "Instagram",
    description: "Download Instagram Reels, Stories, and Posts in HD. Save videos as MP4 or extract audio as MP3.",
    metaDescription: "Free Instagram downloader — save Reels, Stories & Posts in HD MP4 or MP3. No registration, no watermark. Works on all devices.",
    seoContent: `ClipGrabber Hub's Instagram Downloader lets you save any public Instagram content to your device in seconds. Whether it's a Reel, Story, or regular Post — just paste the link and download.

Our tool automatically detects the content type and provides the best download options. Choose MP4 HD for crystal-clear video quality, MP4 SD for smaller file sizes perfect for sharing, or MP3 to extract just the audio.

Instagram Reels have become one of the most popular content formats. With our downloader, you can save recipe tutorials, workout routines, travel clips, and more for offline viewing. Stories disappear after 24 hours — save them before they're gone.

All downloads happen instantly with no registration required. Your privacy is protected — we don't store any of your data or downloaded content. Compatible with iPhone, Android, Windows, Mac, and all modern browsers.

Whether you're a content creator backing up your own posts, a social media manager archiving campaigns, or simply want to save inspiring content, ClipGrabber Hub makes it effortless.`,
    icon: Instagram,
    gradient: "bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600",
    category: "downloader",
    placeholder: "Paste Instagram link here (Reels, Stories, Posts)...",
    faqs: [
      { q: "Can I download Instagram Reels?", a: "Yes! Paste any public Instagram Reel URL and download it in MP4 HD, SD, or MP3 format." },
      { q: "Can I download Instagram Stories?", a: "Yes, you can download Stories from public accounts. Stories from private accounts are not accessible." },
      { q: "Does it work with Instagram Posts?", a: "Absolutely. Our tool supports Reels, Stories, and regular photo/video Posts." },
      { q: "Is registration required?", a: "No. Our Instagram downloader is 100% free with no sign-up needed." },
      { q: "Can I download in MP3 format?", a: "Yes, select the MP3 option to extract audio from any Instagram video." },
    ],
  },
  {
    slug: "tiktok-downloader",
    title: "TikTok Downloader — No Watermark, HD Quality",
    shortTitle: "TikTok",
    description: "Download TikTok videos without watermark in HD. Save as MP4 video or MP3 audio instantly.",
    metaDescription: "Free TikTok video downloader without watermark. Save TikTok videos in HD MP4 or extract audio as MP3. No registration needed.",
    seoContent: `Download TikTok videos without the watermark using ClipGrabber Hub's free TikTok downloader. Get clean, high-quality videos ready for sharing or personal use.

Our TikTok downloader automatically removes the TikTok watermark from your downloads, giving you a clean video file. No other tools or apps needed — just paste the link and download.

Choose from multiple formats: MP4 HD for the highest quality, MP4 SD for smaller file sizes ideal for messaging apps, or MP3 to extract just the audio — perfect for saving trending sounds and music.

TikTok has become the go-to platform for short-form entertainment, education, and creativity. Save your favorite cooking tutorials, dance routines, comedy sketches, and educational content for offline viewing anytime.

Our downloader works on all devices — desktop, tablet, and mobile. No software installation, no registration, completely free. Fast processing with instant downloads.`,
    icon: Video,
    gradient: "bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500",
    category: "downloader",
    placeholder: "Paste TikTok video link here...",
    faqs: [
      { q: "Can I download TikTok videos without watermark?", a: "Yes! Our tool automatically removes the TikTok watermark for clean downloads." },
      { q: "What formats are available?", a: "MP4 HD (highest quality), MP4 SD (smaller size), and MP3 (audio only)." },
      { q: "Can I download TikTok audio/sounds?", a: "Yes, select the MP3 format to extract audio from any TikTok video." },
      { q: "Does it work on mobile?", a: "Yes, our TikTok downloader works perfectly on iPhone, Android, and all mobile browsers." },
      { q: "Is it free?", a: "Completely free. No registration, no hidden charges, no limits." },
    ],
  },
  {
    slug: "youtube-downloader",
    title: "YouTube Downloader — Videos & Shorts to MP4/MP3",
    shortTitle: "YouTube",
    description: "Download YouTube videos and Shorts in MP4 or convert to MP3 audio. Fast, free, no registration.",
    metaDescription: "Free YouTube video downloader. Download YouTube videos & Shorts as MP4 or convert to MP3. No registration, fast & easy.",
    seoContent: `ClipGrabber Hub's YouTube Downloader makes it easy to save YouTube videos and Shorts to your device. Convert any YouTube video to MP4 for offline viewing or MP3 for audio-only playback.

Whether you want to save a music video, podcast, tutorial, or YouTube Short — our tool handles it all. Just paste the YouTube URL, choose your preferred format, and download instantly.

Supported formats include MP4 HD for full-quality video, MP4 SD for a smaller file size, and MP3 for extracting audio. Perfect for saving music playlists, podcast episodes, language learning content, and educational videos.

YouTube Shorts have become incredibly popular for quick entertainment and learning. Our downloader supports both regular videos and Shorts with the same simple interface.

No software needed, no registration required, works on any device. Your downloads start instantly with fast processing speeds. All content must be publicly available — we respect creator rights and YouTube's terms of service.`,
    icon: Youtube,
    gradient: "bg-gradient-to-br from-red-500 via-red-600 to-rose-600",
    category: "downloader",
    placeholder: "Paste YouTube video or Shorts link here...",
    faqs: [
      { q: "Can I download YouTube Shorts?", a: "Yes! Our tool supports both regular YouTube videos and YouTube Shorts." },
      { q: "Can I convert YouTube to MP3?", a: "Yes, select the MP3 format option to extract audio from any YouTube video." },
      { q: "What video quality is available?", a: "We offer MP4 HD (up to 1080p) and MP4 SD options depending on the original video quality." },
      { q: "Is it legal to download YouTube videos?", a: "Downloading publicly available content for personal use is generally acceptable. Always respect copyright and YouTube's Terms of Service." },
      { q: "Do I need to install anything?", a: "No. Our YouTube downloader works entirely in your browser — no software or extensions needed." },
    ],
  },
  // PDF Tools
  {
    slug: "compress-pdf",
    title: "Compress PDF Online Free",
    shortTitle: "Compress",
    description: "Reduce PDF file size without losing quality. Optimize PDFs for email, web, and storage.",
    metaDescription: "Compress PDF files online for free. Reduce PDF size up to 90% without losing quality. Fast, secure, no registration required.",
    seoContent: "Our free online PDF compressor helps you reduce the size of your PDF files quickly and easily. Whether you need to email a large document, upload a PDF to a website, or simply save storage space, our tool can shrink your PDFs by up to 90% while maintaining visual quality.\n\nThe compression process is entirely browser-based — your files never leave your device. This ensures complete privacy and security. We use intelligent compression algorithms that analyze each page and optimize images, fonts, and metadata without affecting readability.\n\nClipGrabber Hub's PDF compressor supports files up to 100MB and works on all devices including desktop, tablet, and mobile. No software installation or registration required — just upload, compress, and download.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-red-500 via-rose-500 to-pink-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "How much can I compress a PDF?", a: "Our tool can reduce PDF size by up to 90% depending on the content. Image-heavy PDFs see the most reduction." },
      { q: "Does compression affect quality?", a: "We use smart compression that maintains visual quality while significantly reducing file size." },
      { q: "Is there a file size limit?", a: "You can compress PDFs up to 100MB for free." },
      { q: "Is my PDF safe during compression?", a: "Yes, all processing happens in your browser. Your files are never uploaded to our servers." },
    ],
  },
  {
    slug: "merge-pdf",
    title: "Merge PDF Files Online",
    shortTitle: "Merge",
    description: "Combine multiple PDF files into one document. Easy drag-and-drop interface.",
    metaDescription: "Merge PDF files online for free. Combine multiple PDFs into one document in seconds. No software needed.",
    seoContent: "Easily combine multiple PDF documents into a single file with ClipGrabber Hub's free online PDF merger. Whether you're compiling reports, combining invoices, or assembling a portfolio, our tool makes it simple.\n\nJust drag and drop your PDF files, arrange them in your preferred order, and click merge. The entire process takes seconds and produces a high-quality combined document.\n\nOur PDF merger preserves all formatting, images, links, and bookmarks from the original files. It works entirely in your browser, so your documents remain private and secure.",
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
    title: "Split PDF Pages Online",
    shortTitle: "Split",
    description: "Split a PDF into multiple files. Extract specific pages from your document.",
    metaDescription: "Split PDF files online for free. Extract pages or split into multiple documents instantly.",
    seoContent: "Need to extract specific pages from a PDF? ClipGrabber Hub's free PDF splitter lets you break any PDF into smaller files or pull out individual pages in seconds.\n\nPerfect for extracting chapters from ebooks, separating invoices, or pulling specific pages from a large report. Simply upload your PDF, select the pages you want, and download.\n\nThe tool preserves all formatting and quality from the original document. Works on any device with no software installation required.",
    icon: SplitSquareHorizontal,
    gradient: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "Can I extract specific pages?", a: "Yes, you can select individual pages or page ranges to extract." },
      { q: "What happens to the original PDF?", a: "The original file is untouched. We create new files from the selected pages." },
      { q: "Can I split a password-protected PDF?", a: "You'll need to remove the password first before splitting." },
    ],
  },
  {
    slug: "pdf-to-word",
    title: "Convert PDF to Word Free",
    shortTitle: "To Word",
    description: "Convert PDF files to editable Word documents while preserving formatting.",
    metaDescription: "Convert PDF to Word (DOCX) online for free. Preserve formatting and layout. Fast and accurate conversion.",
    seoContent: "Convert your PDF documents to fully editable Microsoft Word (DOCX) files with ClipGrabber Hub's free online converter. Our advanced conversion engine preserves the original formatting, fonts, images, and layout.\n\nWhether you need to edit a contract, update a report, or modify a brochure, our PDF to Word converter makes it easy. The output is compatible with Microsoft Word, Google Docs, and other word processors.\n\nSimply upload your PDF, wait a few seconds, and download your editable Word document. No registration or software installation needed.",
    icon: FileOutput,
    gradient: "bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500",
    category: "pdf",
    acceptFile: true,
    fileAccept: ".pdf",
    faqs: [
      { q: "Is the formatting preserved?", a: "Our converter preserves most formatting including fonts, images, and layout." },
      { q: "Can I edit the converted document?", a: "Yes, the output is a fully editable .docx file compatible with Microsoft Word and Google Docs." },
      { q: "Does it work with scanned PDFs?", a: "Scanned PDFs may require OCR. Our tool works best with text-based PDFs." },
    ],
  },
  // Image Tools
  {
    slug: "image-compressor",
    title: "Image Compressor Online",
    shortTitle: "Compress",
    description: "Compress JPEG, PNG, and WebP images without losing quality. Reduce file size up to 80%.",
    metaDescription: "Compress images online for free. Reduce JPEG, PNG, WebP size up to 80% without quality loss. Fast bulk compression.",
    seoContent: "Optimize your images for the web with ClipGrabber Hub's free online image compressor. Reduce JPEG, PNG, and WebP file sizes by up to 80% while maintaining visual quality.\n\nPerfect for web developers, bloggers, and anyone who needs to optimize images for faster page loading. Our smart compression algorithms analyze each image and apply the optimal compression level.\n\nSupports batch compression — upload multiple images at once and download them all compressed. Works entirely in your browser for maximum privacy and speed.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Which image formats are supported?", a: "We support JPEG, PNG, WebP, GIF, and BMP formats." },
      { q: "How much can I compress?", a: "Typically 50-80% file size reduction while maintaining visual quality." },
      { q: "Can I compress multiple images?", a: "Yes, you can upload and compress multiple images at once." },
      { q: "Will compressed images look different?", a: "Our smart compression maintains visual quality. Most users can't see any difference." },
    ],
  },
  {
    slug: "image-resizer",
    title: "Resize Images Online Free",
    shortTitle: "Resize",
    description: "Resize images to any dimension. Perfect for social media, web, and print.",
    metaDescription: "Resize images online for free. Change dimensions for social media, web, or print. Maintains aspect ratio.",
    seoContent: "Quickly resize your images to any dimension with ClipGrabber Hub's free online image resizer. Whether you need to prepare images for social media, optimize photos for your website, or create print-ready files, our tool handles it all.\n\nChoose from preset sizes for popular social media platforms or enter custom dimensions. The tool automatically maintains aspect ratio to prevent distortion.\n\nSupports JPEG, PNG, and WebP output formats. No registration or software needed — resize your images directly in your browser.",
    icon: Maximize2,
    gradient: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Can I maintain aspect ratio?", a: "Yes, aspect ratio is maintained by default. You can also set custom dimensions." },
      { q: "What output formats are available?", a: "You can export as JPEG, PNG, or WebP." },
      { q: "Can I resize for social media?", a: "Yes, we offer preset dimensions for Instagram, Facebook, Twitter, and more." },
    ],
  },
  {
    slug: "image-converter",
    title: "Image Format Converter",
    shortTitle: "Convert",
    description: "Convert images between formats: JPEG, PNG, WebP, GIF, and more.",
    metaDescription: "Convert images between formats online for free. Support JPEG, PNG, WebP, GIF, BMP. Instant conversion.",
    seoContent: "Convert images between all popular formats with ClipGrabber Hub's free online image converter. Support for JPEG, PNG, WebP, GIF, and BMP means you can convert any image to the format you need.\n\nNeed to convert PNG to JPEG for smaller file sizes? Or convert JPEG to WebP for better web performance? Our tool handles all conversions instantly in your browser.\n\nBatch conversion is supported — convert multiple images at once. All processing happens locally in your browser for maximum speed and privacy.",
    icon: RefreshCw,
    gradient: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500",
    category: "image",
    acceptFile: true,
    fileAccept: "image/*",
    faqs: [
      { q: "Which formats can I convert between?", a: "We support JPEG, PNG, WebP, GIF, and BMP conversions." },
      { q: "Does conversion affect quality?", a: "We use high-quality settings by default. You can adjust quality for lossy formats." },
      { q: "Can I convert WebP to PNG?", a: "Yes, you can convert between any supported formats including WebP to PNG." },
    ],
  },
  // Video Tools
  {
    slug: "video-converter",
    title: "Video to MP4 Converter Online",
    shortTitle: "To MP4",
    description: "Convert any video format to MP4 quickly and easily. Supports AVI, MOV, MKV, WebM and more.",
    metaDescription: "Convert video to MP4 online for free. Support AVI, MOV, MKV, WebM. Fast browser-based conversion.",
    seoContent: "Convert your videos to MP4 format with ClipGrabber Hub's free online video converter. MP4 is the most widely supported video format, compatible with virtually all devices and platforms.\n\nOur converter supports input formats including AVI, MOV, MKV, WebM, FLV, and WMV. Simply upload your video, and we'll convert it to a high-quality MP4 file.\n\nThe conversion process happens directly in your browser using advanced WebAssembly technology. Your videos are never uploaded to external servers, ensuring complete privacy. Supports files up to 500MB.",
    icon: FileVideo,
    gradient: "bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-400",
    category: "video",
    acceptFile: true,
    fileAccept: "video/*",
    faqs: [
      { q: "Which video formats are supported?", a: "We support AVI, MOV, MKV, WebM, FLV, WMV, and many more." },
      { q: "Is there a file size limit?", a: "You can convert videos up to 500MB for free." },
      { q: "How long does conversion take?", a: "Most videos convert in under a minute, depending on file size." },
      { q: "Can I convert to formats other than MP4?", a: "Currently we focus on MP4 as the output format. More formats coming soon." },
    ],
  },
  {
    slug: "video-compressor",
    title: "Compress Video Online Free",
    shortTitle: "Compress",
    description: "Reduce video file size while maintaining quality. Perfect for sharing and uploading.",
    metaDescription: "Compress video files online for free. Reduce video size without quality loss. Fast and easy.",
    seoContent: "Reduce the size of your video files without sacrificing quality using ClipGrabber Hub's free online video compressor. Perfect for sharing videos via email, messaging apps, or uploading to social media with file size limits.\n\nOur intelligent compression technology analyzes your video and applies optimal settings to achieve the best balance between file size and visual quality.\n\nWorks with MP4, AVI, MOV, MKV, and other popular video formats. All processing happens in your browser — your videos stay private and secure.",
    icon: Minimize2,
    gradient: "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500",
    category: "video",
    acceptFile: true,
    fileAccept: "video/*",
    faqs: [
      { q: "How much can videos be compressed?", a: "Typically 40-70% reduction depending on the original video quality and settings." },
      { q: "Does it affect video quality?", a: "We use smart compression to maintain visual quality while reducing file size." },
      { q: "What video formats are supported?", a: "MP4, AVI, MOV, MKV, WebM, and more." },
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

// SEO keyword redirect map
export const seoRedirects: Record<string, string> = {
  "downloader": "/instagram-downloader",
  "video-downloader": "/instagram-downloader",
  "instagram-video-downloader": "/instagram-downloader",
  "instagram-reel-downloader": "/instagram-downloader",
  "download-instagram-reels": "/instagram-downloader",
  "save-instagram-stories": "/instagram-downloader",
  "tiktok-video-downloader": "/tiktok-downloader",
  "tiktok-downloader-no-watermark": "/tiktok-downloader",
  "download-tiktok-no-watermark": "/tiktok-downloader",
  "youtube-to-mp3": "/youtube-downloader",
  "youtube-shorts-downloader": "/youtube-downloader",
  "youtube-video-downloader": "/youtube-downloader",
  "download-youtube-mp3": "/youtube-downloader",
  "compress-pdf-online": "/compress-pdf",
  "pdf-compressor": "/compress-pdf",
  "convert-pdf-to-word": "/pdf-to-word",
  "pdf-to-docx": "/pdf-to-word",
  "compress-image": "/image-compressor",
  "resize-image": "/image-resizer",
  "convert-video-to-mp4": "/video-converter",
  "compress-video": "/video-compressor",
};
