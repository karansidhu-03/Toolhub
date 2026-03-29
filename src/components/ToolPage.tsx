import React, { useState, useRef } from "react";
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
          processed = [{
            name: "merged.pdf",
            url: URL.createObjectURL(blob),
            blob,
            oldSize: files.reduce((a, f) => a + f.size, 0),
            newSize: blob.size
          }];
        } else {
          processed = await processBatch(files, async (f) => {
            if (tool.slug === "compress-pdf") {
              const res = await compressPDF(f);
              return { ...res, oldSize: f.size };
            }
            if (tool.slug === "image-compressor") {
              const res = await compressImageFile(f);
              return { ...res, oldSize: f.size };
            }
            if (tool.slug === "pdf-to-word") {
              return { blob: await pdfToWord(f), name: f.name + ".docx" };
            }
            if (tool.slug === "split-pdf") {
              return { blob: await splitPDF(f) };
            }
          });
        }

        setResults(processed);
        setStatus("success");
      } catch (err: any) {
        setErrorMsg(err.message || "Processing failed");
        setStatus("error");
      }
      return;
    }

    // ================= VIDEO =================
    if (!url) return;

    setStatus("loading");

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 15000);

      const res = await fetch(
        `https://toolhubworker.karanvirsidhu03.workers.dev?url=${encodeURIComponent(url)}`,
        { signal: controller.signal }
      );

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const items = [];

      if (data.downloadUrl) {
        items.push({ name: "Download MP4", url: data.downloadUrl });
      }
      if (data.audioUrl) {
        items.push({ name: "Download MP3", url: data.audioUrl });
      }

      setResults(items);
      setThumbnail(data.thumbnail || "");
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.name === "AbortError" ? "Timeout, try again" : err.message);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-[80vh]">
      <section className={`relative py-20 ${gradient}`}>
        <div className="max-w-2xl mx-auto px-4 text-center">

          <div className="mb-6 flex justify-center">
            <Icon className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-white/80 mb-8">{description}</p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">

            {acceptFile ? (
              <input
                type="file"
                multiple
                accept={fileAccept}
                className="w-full text-white"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
            ) : (
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={placeholder}
                  className="h-14 text-lg"
                />
                <Button type="button" onClick={handlePaste}>
                  <ClipboardPaste />
                </Button>
              </div>
            )}

            <Button className="mt-4 w-full h-14 text-lg font-bold">
              {status === "loading" ? <Loader2 className="animate-spin" /> : "Download"}
            </Button>
          </form>

          {/* AD */}
          <div className="mt-6 flex justify-center">
            <AdBanner adKey="2bc0fd71dd9ccc822fa5e4090e0d961e" width={300} height={250} />
          </div>

          {/* ERROR */}
          {status === "error" && (
            <div className="mt-4 text-red-300 flex items-center justify-center gap-2">
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          {/* SUCCESS */}
          {status === "success" && (
            <motion.div className="mt-6 space-y-4">

              <div className="text-green-300 flex flex-col items-center">
                <CheckCircle2 size={24} />
                <span className="font-semibold">Success</span>
              </div>

              {thumbnail && <img src={thumbnail} className="rounded-lg mx-auto max-w-sm" />}

              {results.map((r, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex justify-between items-center">

                  <div className="text-left">
                    <p className="text-white font-medium">{r.name}</p>

                    {r.oldSize && r.newSize && (
                      <p className="text-green-300 text-xs">
                        Saved {Math.round(((r.oldSize - r.newSize) / r.oldSize) * 100)}% ({formatBytes(r.newSize)})
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="icon" onClick={() => window.open(r.url)}>
                      <Eye />
                    </Button>

                    <a
                      href="https://fortunateambiguous.com/c275tpt4?key=3525ba08264f6d29e507b16c38e44591"
                      target="_blank"
                      onClick={() => setTimeout(() => window.open(r.url), 800)}
                    >
                      <Button size="icon">
                        <Download />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* MOBILE AD */}
          <AdBanner adKey="c1fb6e002cfa88054dace1dc2d7a964d" width={320} height={50} />

        </div>
      </section>

      <div className="flex justify-center my-8">
        <AdBanner adKey="bea0808c433ba62644f402ac70f08391" width={728} height={90} />
      </div>

      <div className="flex justify-center my-8">
        <AdBanner adKey="5a377b4924aaffb1918162b4d2ca513f" width={468} height={60} />
      </div>
    </div>
  );
}
