import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Loader2, AlertCircle, CheckCircle2, ChevronDown, ClipboardPaste, Eye, Files } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import AdBanner from "./AdBanner";
import { type Tool, getRelatedTools } from "@/lib/tools";
import { compressPDF, compressImageFile, formatBytes, mergePDFs, splitPDF, pdfToWord, processBatch } from "@/lib/pdf-engine";

type ToolPageProps = {
  tool: Tool;
};

type ProcessedResult = {
  name: string;
  url: string;
  blob: Blob;
  oldSize?: number;
  newSize?: number;
};

const ToolJsonLd = ({ tool }: { tool: Tool }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.title,
    "url": `https://toolhub.app/${tool.slug}`,
    "description": tool.metaDescription,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };

  const faqJsonLd = tool.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
    </>
  );
};

const ToolPage = ({ tool }: ToolPageProps) => {
  const { title, description, placeholder, icon: Icon, gradient, acceptFile, fileAccept, faqs, seoContent } = tool;
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState<ProcessedResult[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [canPaste, setCanPaste] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.clipboard || !navigator.clipboard.readText) {
      setCanPaste(false);
    }
  }, []);

  const relatedTools = getRelatedTools(tool.slug);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) throw new Error("Clipboard is empty");
      setUrl(text.trim());
      inputRef.current?.focus();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Paste blocked. Please press Ctrl+V.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (acceptFile) {
      if (files.length === 0) {
        setStatus("error");
        setErrorMsg("Please select at least one file to continue.");
        return;
      }
      
      setStatus("loading");
      setErrorMsg("");
      setResults([]);

      try {
        let processed: ProcessedResult[] = [];

        if (tool.slug === "merge-pdf") {
          const blob = await mergePDFs(files);
          processed = [{ 
            name: "merged_document.pdf", 
            url: URL.createObjectURL(blob), 
            blob,
            oldSize: files.reduce((acc, f) => acc + f.size, 0),
            newSize: blob.size
          }];
        } else {
          processed = await processBatch(files, async (f) => {
            if (tool.slug === "compress-pdf") return await compressPDF(f);
            if (tool.slug === "image-compressor") return await compressImageFile(f);
            
            if (tool.slug === "pdf-to-word") {
              const blob = await pdfToWord(f);
              const newName = f.name.replace(/\.[^/.]+$/, "") + ".docx";
              return { blob, name: newName };
            }
            
            if (tool.slug === "split-pdf") return { blob: await splitPDF(f) };
            throw new Error("Tool logic not found.");
          });
        }

        setResults(processed);
        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        setErrorMsg(err.message || "Failed to process.");
      }
      return;
    }

    const cleanInput = url.trim();
    if (!cleanInput) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const cleanUrl = cleanInput.split("?")[0].trim();
      const apiUrl = `https://toolhubworker.karanvirsidhu03.workers.dev?url=${encodeURIComponent(cleanUrl)}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.success && data.downloadUrl) {
  // Fetch the video Blob
  const videoRes = await fetch(data.downloadUrl);
  if (!videoRes.ok) throw new Error("Failed to fetch video");
  const videoBlob = await videoRes.blob();
  // Create a download URL for the Blob
  const downloadBlobUrl = URL.createObjectURL(videoBlob);
  setResults([{ name: "video.mp4", url: downloadBlobUrl, blob: videoBlob }]);
        if (data.thumbnail) {
          const workerBase = "https://toolhubworker.karanvirsidhu03.workers.dev";
          setThumbnail(`${workerBase}/proxy-image?img=${encodeURIComponent(data.thumbnail)}`);
        }
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to fetch download link");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh]">
      <ToolJsonLd tool={tool} />

      <section className={`relative overflow-hidden py-16 md:py-24 ${gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card/20 backdrop-blur-sm mb-6">
              <Icon className="h-8 w-8 text-primary-foreground" />
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">{title}</h1>
            <p className="text-primary-foreground/80 text-lg mb-8">{description}</p>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              {/* FORM CONTENT UNCHANGED */}
            </form>

            {/* 🔥 300x250 */}
            <div className="mt-6 flex justify-center">
              <AdBanner adKey="2bc0fd71dd9ccc822fa5e4090e0d961e" width={300} height={250} />
            </div>

            {status === "success" && results.length > 0 && (
              <motion.div className="mt-6 space-y-4">
                {/* SUCCESS UI UNCHANGED */}

                {/* 🔥 320x50 */}
                <div className="w-full flex justify-center py-2">
                  <AdBanner adKey="c1fb6e002cfa88054dace1dc2d7a964d" width={320} height={50} />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 🔥 728x90 */}
      <div className="flex justify-center my-8">
        <AdBanner adKey="bea0808c433ba62644f402ac70f08391" width={728} height={90} />
      </div>

      <section className="container mx-auto px-4 py-16 text-center">
        {/* HOW IT WORKS UNCHANGED */}
      </section>

      {/* 🔥 468x60 */}
      <div className="flex justify-center my-8">
        <AdBanner adKey="5a377b4924aaffb1918162b4d2ca513f" width={468} height={60} />
      </div>

      {/* REST OF YOUR FILE UNCHANGED */}
    </div>
  );
};

export default ToolPage;
