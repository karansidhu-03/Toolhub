import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdBanner from "./AdBanner";

type ToolPageProps = {
  title: string;
  description: string;
  placeholder: string;
  icon: React.ReactNode;
  gradient: string;
  acceptFile?: boolean;
  fileAccept?: string;
};

const ToolPage = ({ title, description, placeholder, icon, gradient, acceptFile, fileAccept }: ToolPageProps) => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!acceptFile && !url.trim()) return;
  if (!acceptFile && !url.startsWith("http")) {
    setStatus("error");
    setErrorMsg("Please enter a valid URL");
    return;
  }

  setStatus("loading");
  setErrorMsg("");

  try {
    // FIX 1: Sanitize URL (Strips tracking params like ?si= for YouTube/TikTok)
    const cleanUrl = url.split('?')[0].trim();

    // Build request URL
    const apiUrl = `https://downloadhubworker.karanvirsidhu03.workers.dev?url=${encodeURIComponent(cleanUrl)}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.success && data.downloadUrl) {
      setDownloadUrl(data.downloadUrl);
      
      // FIX 2: Only set the thumbnail ONCE using the proxy
      if (data.thumbnail) {
        const workerBase = "https://downloadhubworker.karanvirsidhu03.workers.dev";
        const proxiedThumbnail = `${workerBase}/proxy-image?img=${encodeURIComponent(data.thumbnail)}`;
        setThumbnail(proxiedThumbnail);
      } else {
        setThumbnail(""); 
      }
      
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(data.error || "Failed to fetch download link");
    }
  } catch (err) {
    setStatus("error");
    setErrorMsg("Network error. Please try again.");
  }
};

  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <section className={`relative overflow-hidden py-16 md:py-24 ${gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="container mx-auto px-4 relative z-10">
  {/* Add this line here */}
  <div className="flex justify-center mb-8">
    <AdBanner />
  </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card/20 backdrop-blur-sm mb-6">
              {icon}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              {title}
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8">{description}</p>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              {acceptFile ? (
                <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10">
                  <label className="flex flex-col items-center gap-4 cursor-pointer">
                    <div className="w-20 h-20 rounded-full bg-card/20 flex items-center justify-center">
                      <Download className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="text-primary-foreground font-medium">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </span>
                    <input
                      type="file"
                      accept={fileAccept}
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  <Button
                    type="submit"
                    disabled={!file || status === "loading"}
                    size="lg"
                    className="mt-6 w-full bg-card text-foreground hover:bg-card/90 font-semibold"
                  >
                    {status === "loading" ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                      <><Download className="mr-2 h-4 w-4" /> Process File</>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setStatus("idle"); }}
                    placeholder={placeholder}
                    className="flex-1 h-14 bg-card/20 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-base rounded-xl"
                  />
                  <Button
                    type="submit"
                    disabled={!url.trim() || status === "loading"}
                    size="lg"
                    className="h-14 px-8 bg-card text-foreground hover:bg-card/90 font-semibold rounded-xl"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Download className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              )}
            </form>

            {/* Status Messages */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center gap-2 text-red-200"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errorMsg}</span>
              </motion.div>
            )}
            {status === "success" && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6 bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10"
  >
    <div className="flex flex-col items-center gap-4">
      {/* 1. Preview */}
      {thumbnail && (
        <img src={thumbnail} alt="Preview" className="w-full max-w-sm rounded-lg shadow-lg" />
      )}
      
      {/* 2. Success Message */}
      <div className="flex items-center justify-center gap-2 text-green-200">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Ready to download!</span>
      </div>

      {/* 3. The Ad (Critical for Profit) */}
      <div className="w-full flex justify-center py-2">
        <AdBanner />
      </div>

      {/* 4. The Money Button */}
     <Button 
  onClick={() => {
    // 1. OPEN THE SMARTLINK (THE PROFIT)
    // This opens your ad in a new tab immediately
    window.open("https://www.profitablecpmratenetwork.com/c5fv366ys?key=9500a49c2e1e39d9dcc78e03078013ba", "_blank");

    // 2. TRIGGER THE DOWNLOAD (THE SERVICE)
    // We use a small timeout (100ms) to ensure the browser registers the window.open first
    setTimeout(() => {
      if (downloadUrl) {
        // Option A: Direct Download via a hidden link
        const link = document.createElement('a');
        link.href = downloadUrl;
        // This 'target="_self"' ensures it stays in the current tab
        link.target = "_self"; 
        link.setAttribute('download', 'video.mp4');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 100);
  }} 
  className="w-full max-w-sm h-14 bg-card text-foreground hover:bg-card/90 font-bold text-lg shadow-lg"
>
  <Download className="mr-2 h-5 w-5" /> Download Now
</Button>
    </div>
  </motion.div>
)}
          </motion.div>
        </div>
      </section>

      <AdBanner slot="in-content" className="my-6 container mx-auto px-4 rounded-lg" />

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { step: "1", title: acceptFile ? "Upload File" : "Paste Link", desc: acceptFile ? "Select your file from your device" : "Copy the URL and paste it above" },
            { step: "2", title: "Process", desc: "We process your content instantly" },
            { step: "3", title: "Download", desc: "Get your file ready to save" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                <span className="font-display font-bold text-primary-foreground">{item.step}</span>
              </div>
              <h3 className="font-display font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolPage;
