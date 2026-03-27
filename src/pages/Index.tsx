import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Video, Youtube, Image, FileVideo, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/AdBanner";

const tools = [
  {
    to: "/instagram-downloader",
    icon: <Instagram className="h-6 w-6" />,
    title: "Instagram Downloader",
    desc: "Download Reels, Videos & Photos",
    color: "from-pink-500 to-rose-500",
  },
  {
    to: "/tiktok-downloader",
    icon: <Video className="h-6 w-6" />,
    title: "TikTok Downloader",
    desc: "Save videos without watermark",
    color: "from-cyan-500 to-teal-500",
  },
  {
    to: "/youtube-shorts-downloader",
    icon: <Youtube className="h-6 w-6" />,
    title: "YouTube Shorts",
    desc: "Download Shorts in HD quality",
    color: "from-red-500 to-orange-500",
  },
  {
    to: "/image-compressor",
    icon: <Image className="h-6 w-6" />,
    title: "Image Compressor",
    desc: "Compress images without quality loss",
    color: "from-violet-500 to-purple-500",
  },
  {
    to: "/video-converter",
    icon: <FileVideo className="h-6 w-6" />,
    title: "Video to MP4",
    desc: "Convert any video format to MP4",
    color: "from-amber-500 to-yellow-500",
  },
];

const features = [
  { icon: <Zap className="h-5 w-5" />, title: "Lightning Fast", desc: "Instant processing with no wait times" },
  { icon: <Shield className="h-5 w-5" />, title: "100% Free & Safe", desc: "No registration or hidden charges" },
  { icon: <Globe className="h-5 w-5" />, title: "Works Everywhere", desc: "Compatible with all devices and browsers" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Free Online Tools — No Sign Up Required
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Download <span className="gradient-text">Anything</span> From{" "}
              <span className="gradient-text">Anywhere</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The fastest way to download Instagram Reels, TikTok videos, YouTube Shorts, compress images, and convert videos — all for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="h-14 px-8 gradient-hero border-0 text-primary-foreground font-semibold rounded-xl text-base">
                <Link to="/instagram-downloader">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-xl text-base font-medium">
                <Link to="/blog">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <AdBanner slot="after-hero" className="container mx-auto px-4 rounded-lg mb-8" />

      {/* Tools Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Popular Tools</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Choose from our collection of fast, free, and reliable online tools.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {tools.map((tool) => (
            <motion.div key={tool.to} variants={item}>
              <Link
                to={tool.to}
                className="group block bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border hover:border-primary/30"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} text-primary-foreground mb-4 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate / Recommendations */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-card rounded-2xl p-8 md:p-12 card-shadow border border-border max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold mb-2">Recommended Tools</h2>
            <p className="text-muted-foreground text-sm">Trusted services we recommend</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "NordVPN", desc: "Stay safe online with the #1 VPN", tag: "Security" },
              { name: "Canva Pro", desc: "Design anything with pro templates", tag: "Design" },
              { name: "Grammarly", desc: "Write better, everywhere", tag: "Writing" },
            ].map((a) => (
              <div key={a.name} className="rounded-xl bg-muted/50 p-5 text-center">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{a.tag}</span>
                <h4 className="font-display font-semibold mt-3 mb-1">{a.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">{a.desc}</p>
                <Button variant="outline" size="sm" className="text-xs">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdBanner slot="footer" className="container mx-auto px-4 rounded-lg mb-8" />
    </>
  );
};

export default Index;
