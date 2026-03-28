import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import AdBanner from "@/components/AdBanner";

const posts = [
  {
    slug: "how-to-compress-pdf",
    title: "How to Compress PDF Files Without Losing Quality",
    excerpt: "Learn the best techniques to reduce PDF file size while maintaining document quality.",
    date: "Mar 25, 2026",
    category: "PDF",
  },
  {
    slug: "best-image-compression-tips",
    title: "5 Tips to Compress Images Without Losing Quality",
    excerpt: "Optimize your images for the web with these proven compression techniques.",
    date: "Mar 22, 2026",
    category: "Images",
  },
  {
    slug: "how-to-download-instagram-reels",
    title: "How to Download Instagram Reels in 2026",
    excerpt: "The fastest and easiest way to save Instagram Reels to your phone or computer.",
    date: "Mar 18, 2026",
    category: "Instagram",
  },
  {
    slug: "tiktok-downloader-no-watermark",
    title: "TikTok Downloader: Save Videos Without Watermark",
    excerpt: "Step-by-step guide to downloading TikTok videos without any watermark.",
    date: "Mar 14, 2026",
    category: "TikTok",
  },
];

const Blog = () => (
  <div className="min-h-[80vh]">
    <section className="container mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Tips, guides, and updates about our free online tools.</p>
      </motion.div>

      <AdBanner className="mb-8 rounded-lg max-w-3xl mx-auto" />

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {posts.map((post, i) => (
          <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 card-shadow border border-border hover:border-primary/30 transition-all group">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.category}</span>
            <h2 className="font-display text-lg font-semibold mt-3 mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {post.date}</span>
              <span className="text-primary text-sm font-medium flex items-center gap-1">Read More <ArrowRight className="h-3 w-3" /></span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  </div>
);

export default Blog;
