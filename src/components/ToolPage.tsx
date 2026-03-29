import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, AlertCircle, CheckCircle2, ClipboardPaste, Eye, Files } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdBanner from "./AdBanner";
import { type Tool } from "@/lib/tools";
import { compressPDF, compressImageFile, formatBytes, mergePDFs, splitPDF, pdfToWord, processBatch } from "@/lib/pdf-engine";

type ToolPageProps = { tool: Tool };

export default function ToolPage({ tool }: ToolPageProps) {
  const { title, description, placeholder, icon: Icon, gradient, acceptFile, fileAccept } = tool;

  const [url, setUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      setErrorMsg("Paste failed");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ================= FILE TOOLS =================
    if (acceptFile) {
      if (!files.length) return;

      setStatus("loading");
      setResults([]);

      try {
        let processed: any[] = [];

        if (tool.slug === "merge-pdf") {
          const blob = await mergePDFs(files);
          processed = [{ name: "merged.pdf", url: URL.createObjectURL(blob), blob }];
        } else {
          processed = await processBatch(files, async (f) => {
            if (tool.slug === "compress-pdf") return await compressPDF(f);
            if (tool.slug === "image-compressor") return await compressImageFile(f);
            if (tool.slug === "pdf-to-word") return { blob: await pdfToWord(f), name: f.name + ".docx" };
            if (tool.slug === "split-pdf") return { blob: await splitPDF(f) };
          });
        }

        setResults(processed);
        setStatus("success");
      } catch (err: any) {
  if (err.name === "AbortError") {
    setErrorMsg("Server timeout. Try again.");
  } else {
    setErrorMsg(err.message || "Something went wrong");
  }
  setStatus("error");
}
      return;
    }

    // ================= VIDEO DOWNLOADER =================
    if (!url) return;

    setStatus("loading");

    try {
      const api = `https://toolhubworker.karanvirsidhu03.workers.dev?url=${encodeURIComponent(url)}`;
      const res = await fetch(api);
      const controller = new AbortController();
setTimeout(() => controller.abort(), 15000);

const res = await fetch(api, { signal: controller.signal });
      const data = await res.json();

      if (!data.success) throw new Error(data.error);

      // 🔥 IMPORTANT FIX: DO NOT FETCH VIDEO AGAIN
      const items = [];

if (data.downloadUrl) {
  items.push({
    name: "Download MP4",
    url: data.downloadUrl,
  });
}

if (data.audioUrl) {
  items.push({
    name: "Download MP3",
    url: data.audioUrl,
  });
}

setResults(items);

      if (data.thumbnail) setThumbnail(data.thumbnail);

      setStatus("success");
    } catch (err: any) {
  if (err.name === "AbortError") {
    setErrorMsg("Server timeout. Try again.");
  } else {
    setErrorMsg(err.message || "Something went wrong");
  }
  setStatus("error");
}
  };

  return (
    <div className="min-h-[80vh]">
      <section className={`py-20 ${gradient}`}>
        <div className="max-w-2xl mx-auto text-center px-4">

          <Icon className="mx-auto mb-4" size={40} />

          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="mb-6">{description}</p>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit}>

            {acceptFile ? (
              <>
                <input
                  type="file"
                  multiple
                  accept={fileAccept}
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
              </>
            ) : (
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={placeholder}
                />
                <Button type="button" onClick={handlePaste}>
                  <ClipboardPaste />
                </Button>
              </div>
            )}

            <Button type="submit" className="mt-4 w-full">
              {status === "loading" ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </form>

          {/* 🔥 300x250 */}
          <AdBanner adKey="2bc0fd71dd9ccc822fa5e4090e0d961e" width={300} height={250} />

          {/* ================= STATUS ================= */}
          {status === "error" && <p className="text-red-500 mt-4">{errorMsg}</p>}

          {status === "success" && (
            <div className="mt-6">
              <CheckCircle2 className="mx-auto text-green-500" />

              {thumbnail && <img src={thumbnail} className="mx-auto my-4 max-w-sm" />}

              {results.map((r, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded mt-2">
                  <span>{r.name}</span>

                  <div className="flex gap-2">
                    <Button onClick={() => window.open(r.url)}>
                      <Eye />
                    </Button>

                    <a
  href="https://fortunateambiguous.com/c275tpt4?key=3525ba08264f6d29e507b16c38e44591"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => {
    setTimeout(() => {
      window.open(r.url, "_blank");
    }, 800);
  }}
>
  <Button>
    <Download />
  </Button>
</a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🔥 320x50 */}
          <AdBanner adKey="c1fb6e002cfa88054dace1dc2d7a964d" width={320} height={50} />

        </div>
      </section>

      {/* 🔥 728x90 */}
      <div className="flex justify-center my-8">
        <AdBanner adKey="bea0808c433ba62644f402ac70f08391" width={728} height={90} />
      </div>

      {/* 🔥 468x60 */}
      <div className="flex justify-center my-8">
        <AdBanner adKey="5a377b4924aaffb1918162b4d2ca513f" width={468} height={60} />
      </div>
    </div>
  );
}
