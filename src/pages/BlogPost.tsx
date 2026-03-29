import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import AdBanner from "@/components/AdBanner";

const blogPosts: Record<string, { title: string; metaDescription: string; date: string; category: string; content: string; relatedTools: { slug: string; label: string }[] }> = {
  "how-to-download-instagram-reels": {
    title: "How to Download Instagram Reels in 2026",
    metaDescription: "Learn how to download Instagram Reels videos for free. Step-by-step guide to saving Instagram content to your device.",
    date: "Mar 18, 2026",
    category: "Instagram",
    content: `Instagram Reels have become one of the most popular content formats on social media. Whether you want to save a recipe, a workout routine, or a funny clip, here's how to download Instagram Reels easily.

## Method: Use ClipGrabber Hub's Instagram Downloader

The simplest way to download Instagram Reels is with our free online downloader:

1. **Open Instagram** and find the Reel you want to download
2. **Copy the link** — Tap the three dots (⋯) and select "Copy Link"
3. **Paste the link** into ClipGrabber Hub's Instagram Downloader
4. **Choose your format** — Select MP4 HD, MP4 SD, or MP3 (audio only)
5. **Click Download** — Save the video to your device

## Can I Download Instagram Stories?

Yes! Our Instagram Downloader also supports Stories from public accounts. Stories disappear after 24 hours, so save them before they're gone.

## Can I Download Instagram Posts?

Absolutely. Our tool handles Reels, Stories, and regular photo/video Posts — all from one simple interface.

## Is It Legal?

Downloading publicly available content for personal use is generally acceptable. However, always:

- Respect the original creator's copyright
- Don't redistribute content without permission
- Follow Instagram's Terms of Service
- Give credit when sharing content

## Tips for Best Quality

- Download in **MP4 HD** for the highest quality
- Ensure the Reel is **publicly visible** (private accounts can't be downloaded)
- Use a stable internet connection for faster downloads

Try our free Instagram downloader — no registration, no software installation needed.`,
    relatedTools: [
      { slug: "instagram-downloader", label: "Instagram Downloader" },
      { slug: "tiktok-downloader", label: "TikTok Downloader" },
      { slug: "youtube-downloader", label: "YouTube Downloader" },
    ],
  },
  "tiktok-downloader-no-watermark": {
    title: "TikTok Downloader: Save Videos Without Watermark",
    metaDescription: "Download TikTok videos without watermark for free. Step-by-step guide to saving TikTok content in high quality.",
    date: "Mar 14, 2026",
    category: "TikTok",
    content: `Want to save TikTok videos without the watermark? ClipGrabber Hub's TikTok downloader removes the watermark automatically, giving you clean, high-quality video files.

## How to Download TikTok Videos Without Watermark

1. **Open TikTok** and find the video you want to save
2. **Copy the link** — Tap "Share" then "Copy Link"
3. **Paste into ClipGrabber Hub** — Go to our TikTok Downloader page
4. **Download** — The tool automatically removes the watermark

## Why Remove the Watermark?

- **Cleaner look** when sharing on other platforms
- **Professional presentations** without branding
- **Content creation** — use clips in compilations (with permission)

## Available Formats

Our TikTok downloader supports multiple formats:

- **MP4 HD** — Highest quality video
- **MP4 SD** — Smaller file size, good for messaging apps
- **MP3** — Extract audio only (great for music and sounds)

## Important Notes

- Only **public** TikTok videos can be downloaded
- Always respect content creators and their rights
- Don't claim others' content as your own
- Give proper credit when reposting

## Why ClipGrabber Hub?

Unlike many TikTok downloaders that are filled with ads and pop-ups, ClipGrabber Hub offers a clean, fast, and ad-minimal experience. No registration, no software — just paste and download.

Start downloading TikTok videos without watermark today!`,
    relatedTools: [
      { slug: "tiktok-downloader", label: "TikTok Downloader" },
      { slug: "instagram-downloader", label: "Instagram Downloader" },
      { slug: "youtube-downloader", label: "YouTube Downloader" },
    ],
  },
  "youtube-to-mp3-guide": {
    title: "How to Convert YouTube Videos to MP3 in 2026",
    metaDescription: "Convert YouTube videos to MP3 for free. Easy guide to extracting audio from YouTube videos and Shorts.",
    date: "Mar 20, 2026",
    category: "YouTube",
    content: `Want to save YouTube audio as MP3? Whether it's music, a podcast, or a lecture, ClipGrabber Hub makes it easy to extract audio from any YouTube video.

## How to Convert YouTube to MP3

1. **Find the YouTube video** you want to convert
2. **Copy the URL** from the address bar or share button
3. **Paste into ClipGrabber Hub** — Go to our YouTube Downloader
4. **Select MP3 format** from the download options
5. **Download** — Save the MP3 file to your device

## Does It Work with YouTube Shorts?

Yes! Our YouTube downloader supports both regular videos and YouTube Shorts. You can download Shorts as MP4 video or extract the audio as MP3.

## What Quality Can I Expect?

Our tool extracts audio at the highest available quality from the source video. The MP3 output is suitable for music listening, podcast playback, and more.

## Is It Legal?

Downloading YouTube content for personal use exists in a legal gray area. Always:

- Respect copyright and content creators
- Don't redistribute copyrighted music
- Use downloads for personal, offline listening only
- Consider supporting creators directly

## Other Download Options

Besides MP3, you can also download YouTube videos as:

- **MP4 HD** — Full quality video up to 1080p
- **MP4 SD** — Smaller file for quick sharing

Try our free YouTube downloader and MP3 converter today!`,
    relatedTools: [
      { slug: "youtube-downloader", label: "YouTube Downloader" },
      { slug: "instagram-downloader", label: "Instagram Downloader" },
      { slug: "video-converter", label: "Video Converter" },
    ],
  },
  "how-to-compress-pdf": {
    title: "How to Compress PDF Files Without Losing Quality",
    metaDescription: "Learn how to compress PDF files online for free without losing quality. Step-by-step guide with tips.",
    date: "Mar 25, 2026",
    category: "PDF",
    content: `Large PDF files can be a headache when you need to email them or upload them. Fortunately, compressing PDFs doesn't have to mean sacrificing quality.

## Why Compress PDFs?

- **Email attachments**: Most email providers limit attachment sizes to 25MB
- **Website uploads**: Smaller files load faster
- **Storage savings**: Reduce cloud storage costs
- **Faster sharing**: Compressed files transfer more quickly

## How to Compress PDF Online

Using ClipGrabber Hub's free PDF compressor:

1. **Upload your PDF** — Click upload or drag and drop
2. **Wait for processing** — Our tool compresses automatically
3. **Download** — Get your compressed PDF instantly

## Tips for Maximum Compression

- **Remove unnecessary images** before compressing
- **Use web-optimized settings** for the smallest files
- **Compress before merging** multiple PDFs
- **Check the output** to ensure quality meets your needs

## How Much Can You Compress?

Image-heavy PDFs can be reduced by up to 90%, while text-only documents see 20-40% reduction.

Try our free PDF compressor today — no registration required.`,
    relatedTools: [
      { slug: "compress-pdf", label: "Compress PDF" },
      { slug: "merge-pdf", label: "Merge PDF" },
      { slug: "pdf-to-word", label: "PDF to Word" },
    ],
  },
  "best-image-compression-tips": {
    title: "5 Tips to Compress Images Without Losing Quality",
    metaDescription: "Discover the best image compression tips to reduce file size without losing quality.",
    date: "Mar 22, 2026",
    category: "Images",
    content: `Image optimization is crucial for website performance and SEO. Here are five proven tips.

## 1. Choose the Right Format

- **JPEG**: Best for photographs
- **PNG**: Ideal for graphics with transparency
- **WebP**: 25-35% smaller than JPEG at equivalent quality

## 2. Resize Before Compressing

Don't compress a 4000x3000 image if displaying at 800x600. Resize first.

## 3. Use Smart Compression

ClipGrabber Hub's Image Compressor uses intelligent algorithms for 50-80% file size reduction while maintaining quality.

## 4. Batch Process Your Images

Upload multiple files and download them all optimized at once.

## 5. Test Different Quality Levels

Reducing quality from 100% to 85% often produces visually identical images at half the size.

## Why Image Compression Matters for SEO

- Improve page load speed by 40-60%
- Reduce bounce rates
- Boost search engine rankings
- Save bandwidth costs

Start optimizing with our free image compressor.`,
    relatedTools: [
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "image-converter", label: "Image Converter" },
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ClipGrabber Hub Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", post.metaDescription);
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-[80vh]">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.category}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-3">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Calendar className="h-4 w-4" />
            {post.date}
          </div>

          <AdBanner className="mb-8 rounded-lg" />

          <div className="prose prose-sm max-w-none text-muted-foreground">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-4">{block.replace("## ", "")}</h2>;
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1 mb-4">
                    {block.split("\n").map((li, j) => (
                      <li key={j}>{li.replace(/^- \*\*(.*?)\*\*(.*)/, (_, bold, rest) => bold + rest).replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              if (/^\d\./.test(block)) {
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-1 mb-4">
                    {block.split("\n").map((li, j) => (
                      <li key={j}>{li.replace(/^\d+\.\s*\*\*(.*?)\*\*\s*(.*)/, (_, bold, rest) => bold + " " + rest).replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="mb-4">{block}</p>;
            })}
          </div>

          <AdBanner className="my-8 rounded-lg" />

          <div className="bg-card rounded-2xl border border-border p-6 mt-8">
            <h3 className="font-display font-semibold mb-4">Try These Tools</h3>
            <div className="flex flex-wrap gap-3">
              {post.relatedTools.map((rt) => (
                <Link
                  key={rt.slug}
                  to={`/${rt.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {rt.label} →
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;
