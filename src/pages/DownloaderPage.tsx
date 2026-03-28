import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Instagram,
  Youtube,
  Video,
  Globe,
  Music,
  Film,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import AdBanner from "@/components/AdBanner";
import { getRelatedTools } from "@/lib/tools";

type Platform = "instagram" | "youtube" | "tiktok" | "unknown";
type Format = "mp4-hd" | "mp4-sd" | "mp3";

const platformConfig: Record<Platform, { label: string; icon: any; color: string }> = {
  instagram: { label: "Instagram", icon: Instagram, color: "text-pink-500" },
  youtube: { label: "YouTube", icon: Youtube, color: "text-red-500" },
  tiktok: { label: "TikTok", icon: Video, color: "text-teal-500" },
  unknown: { label: "Auto-detect", icon: Globe, color: "text-muted-foreground" },
};

const formats: { value: Format; label: string; icon: any; desc: string }[] = [
  { value: "mp4-hd", label: "MP4 (HD)", icon: Film, desc: "High quality video" },
  { value: "mp4-sd", label: "MP4 (SD)", icon: Film, desc: "Smaller file size" },
  { value: "mp3", label: "MP3", icon: Music, desc: "Audio only" },
];

const faqs = [
  { q: "Which platforms are supported?", a: "We support Instagram (Reels, Videos, Photos), YouTube (Shorts, Videos), and TikTok videos. More platforms coming soon." },
  { q: "Can I download TikTok videos without watermark?", a: "Yes! Our downloader removes the TikTok watermark automatically for a clean download." },
  { q: "Is it free to use?", a: "Completely free. No registration, no sign-up, no hidden charges." },
  { q: "Can I download audio only?", a: "Yes, select the MP3 format option to extract audio from any video." },
  { q: "Can I download private content?", a: "No, only publicly available content can be downloaded. Private or restricted content is not accessible." },
  { q: "What video quality is available?", a: "We offer HD (720p/1080p) and SD options. The maximum quality depends on the original video." },
];

function detectPlatform(url: string): Platform {
  const lower = url.toLowerCase();
  if (lower.includes("instagram.com") || lower.includes("instagr.am")) return "instagram";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("tiktok.com") || lower.includes("vm.tiktok")) return "tiktok";
  return "unknown";
}

const DownloaderPage = () => {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [selectedFormat, setSelectedFormat] = useState<Format>("mp4-hd");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const relatedTools = getRelatedTools("downloader", 4);

  useEffect(() => {
    document.title = "All-in-One Video Downloader — Free Online Tool | ToolHub";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Download videos from Instagram, YouTube, TikTok and more. Free online video downloader with MP4 HD, SD, and MP3 audio options. No registration required.");
  }, []);

  useEffect(() => {
    if (url.trim()) {
      setPlatform(detectPlatform(url));
    } else {
      setPlatform("unknown");
    }
  }, [url]);

  useEffect(() => {
    if (status === "success" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    if (!url.startsWith("http")) {
      setStatus("error");
      setErrorMsg("Please enter a valid URL starting with http:// or https://");
      return;
    }
    if (platform === "unknown") {
      setStatus("error");
      setErrorMsg("Unsupported platform. Please paste a link from Instagram, YouTube, or TikTok.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const cleanUrl = url.split("?")[0].trim();
      const apiUrl = `https://downloadhubworker.karanvirsidhu03.workers.dev?url=${encodeURIComponent(cleanUrl)}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.success && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        setVideoTitle(data.title || "Video from " + platformConfig[platform].label);
        if (data.thumbnail) {
          const workerBase = "https://downloadhubworker.karanvirsidhu03.workers.dev";
          setThumbnail(`${workerBase}/proxy-image?img=${encodeURIComponent(data.thumbnail)}`);
        } else {
          setThumbnail("");
        }
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to fetch download link. The content may be private or unavailable.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  const PlatformIcon = platformConfig[platform].icon;

  return (
    <div className="min-h-[80vh]">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#1a0533]">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#833ab4] via-[#c13584] to-[#e1306c] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00f2ea]/30 via-transparent to-[#ff0050]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a0533]/60" />

        {/* Glowing orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#833ab4]/40 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00f2ea]/30 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_1s]" />
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#ff0000]/15 blur-[100px] animate-[pulse_12s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-[20%] left-[15%] w-[250px] h-[250px] rounded-full bg-[#e1306c]/25 blur-[90px] animate-[pulse_9s_ease-in-out_infinite_0.5s]" />

        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/15" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card/20 backdrop-blur-sm mb-6">
              <Download className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              All-in-One Video Downloader
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-2">
              Download videos from Instagram, YouTube, TikTok and more
            </p>

            {/* Platform badges */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {(["instagram", "youtube", "tiktok"] as Platform[]).map((p) => {
                const cfg = platformConfig[p];
                const Icon = cfg.icon;
                return (
                  <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/15 backdrop-blur-sm text-primary-foreground/90 text-sm">
                    <Icon className="h-4 w-4" />
                    {cfg.label}
                  </span>
                );
              })}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <PlatformIcon className={`h-5 w-5 ${platform !== "unknown" ? platformConfig[platform].color : "text-primary-foreground/50"}`} />
                  </div>
                  <Input
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setStatus("idle"); }}
                    placeholder="Paste Instagram, YouTube, or TikTok link here..."
                    className="h-14 pl-12 bg-card/20 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-base rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!url.trim() || status === "loading"}
                  size="lg"
                  className="h-14 px-8 bg-card text-foreground hover:bg-card/90 font-semibold rounded-xl"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>

              {/* Platform detection indicator */}
              <AnimatePresence>
                {platform !== "unknown" && url.trim() && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-sm text-primary-foreground/70 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {platformConfig[platform].label} link detected
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Loading state */}
            <AnimatePresence>
              {status === "loading" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 flex items-center justify-center gap-3 text-primary-foreground/80">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-medium">Fetching video details...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {status === "error" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center justify-center gap-2 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errorMsg}</span>
              </motion.div>
            )}

            {/* Success / Preview */}
            {status === "success" && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-card/20 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10"
              >
                <div className="flex flex-col items-center gap-5">
                  {/* Preview */}
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt="Video preview"
                      className="w-full max-w-sm rounded-xl shadow-lg"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  )}

                  <div className="text-center">
                    <h3 className="text-primary-foreground font-semibold text-lg mb-1">{videoTitle}</h3>
                    <span className="inline-flex items-center gap-1.5 text-primary-foreground/70 text-sm">
                      <PlatformIcon className="h-4 w-4" />
                      {platformConfig[platform].label}
                    </span>
                  </div>

                  {/* Format selector */}
                  <div className="w-full max-w-sm">
                    <p className="text-primary-foreground/70 text-sm mb-3 font-medium">Download as:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {formats.map((fmt) => {
                        const FmtIcon = fmt.icon;
                        const isActive = selectedFormat === fmt.value;
                        return (
                          <button
                            key={fmt.value}
                            onClick={() => setSelectedFormat(fmt.value)}
                            className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all text-sm ${
                              isActive
                                ? "bg-card/30 border-primary-foreground/40 text-primary-foreground"
                                : "bg-card/10 border-primary-foreground/10 text-primary-foreground/60 hover:bg-card/20"
                            }`}
                          >
                            <FmtIcon className="h-4 w-4" />
                            <span className="font-medium">{fmt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="w-full flex justify-center py-2">
                    <AdBanner />
                  </div>

                  {/* Download button */}
                  <a
                    href={downloadUrl}
                    target="_self"
                    download={`download_${Date.now()}`}
                    className="inline-flex items-center justify-center w-full max-w-sm h-14 bg-card text-foreground hover:bg-card/90 font-bold text-lg rounded-xl shadow-lg no-underline transition-colors"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Now
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <AdBanner className="container mx-auto px-4 rounded-lg" />

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { step: "1", title: "Paste Link", desc: "Copy any video URL from Instagram, YouTube, or TikTok" },
            { step: "2", title: "Choose Format", desc: "Select MP4 (HD/SD) or MP3 audio" },
            { step: "3", title: "Download", desc: "Click download and save to your device" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                <span className="font-display font-bold text-primary-foreground">{s.step}</span>
              </div>
              <h3 className="font-display font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-8">
          <h2 className="font-display text-xl font-bold mb-4">Free Online Video Downloader</h2>
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              ToolHub's All-in-One Video Downloader lets you save videos from Instagram, YouTube, and TikTok in just a few clicks. Whether you want to download Instagram Reels, YouTube Shorts, or TikTok videos without watermark — we've got you covered.
            </p>
            <p>
              Choose from multiple format options including MP4 HD for the best quality, MP4 SD for smaller file sizes, or MP3 to extract audio only. Our downloader works on all devices — desktop, tablet, and mobile.
            </p>
            <p>
              No registration, no software installation, completely free. Just paste your link and download.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="font-display text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <Collapsible key={i}>
              <CollapsibleTrigger className="flex items-center justify-between w-full bg-card rounded-xl p-4 border border-border text-left hover:border-primary/30 transition-colors group">
                <span className="font-medium text-sm">{faq.q}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 pt-2 text-sm text-muted-foreground">
                {faq.a}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </section>

      <AdBanner className="container mx-auto px-4 rounded-lg" />

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <h2 className="font-display text-2xl font-bold text-center mb-8">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {relatedTools.map((rt) => (
              <Link key={rt.slug} to={`/${rt.slug}`} className="group block bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all card-shadow">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${rt.gradient} text-primary-foreground mb-3 group-hover:scale-110 transition-transform`}>
                  <rt.icon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-sm font-semibold mb-1">{rt.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{rt.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DownloaderPage;
