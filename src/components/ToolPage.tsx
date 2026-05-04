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
  const [imageFormat, setImageFormat] = useState("image/jpeg");
  const [resizeWidth, setResizeWidth] = useState(800);

  useEffect(() => {
          if (!navigator?.clipboard?.readText) {
            setCanPaste(false);
          }
        }, []);
          
  useEffect(() => {
          return () => {
            results.forEach(r => {
              if (r.url.startsWith("blob:")) {
                URL.revokeObjectURL(r.url);
              }
            });
          };
        }, [results]);

  const relatedTools = getRelatedTools(tool.slug);

  const handlePaste = async () => {
    try {
          const text = await navigator.clipboard.readText();
          if (!text) throw new Error("Clipboard is empty");
          setUrl(text.trim());
          if (inputRef.current) inputRef.current.focus(); // ADD THE "IF" CHECK
          setStatus("idle");
            } 
    catch (err) {
                setStatus("error");
                setErrorMsg("Paste blocked. Use Ctrl+V / Cmd+V.");
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
            results.forEach(r => {
                if (r.url && r.url.startsWith("blob:")) {
                URL.revokeObjectURL(r.url);
                }
              });
      
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
            if (tool.slug === "compress-pdf") {
                          const blob = await compressPDF(f);
                                      
                          return {
                            blob,
                            name: f.name,
                            url: URL.createObjectURL(blob),
                            oldSize: f.size,
                            newSize: blob.size
                          };
                        }
            if (tool.slug === "image-compressor") {
                          const result = await compressImageFile(f);
                        
                          return {
                            ...result,
                            url: URL.createObjectURL(result.blob),
                            oldSize: f.size,
                            newSize: result.blob.size
                          };
                        }  
            
            if (tool.slug === "image-resize" || tool.slug === "image-convert") {
                        const img = new Image();
                        const tempUrl = URL.createObjectURL(f);
                      
                        await new Promise((resolve) => {
                          img.onload = resolve;
                          img.src = tempUrl;
                        });
                      
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                      
                        const width = tool.slug === "image-resize" ? resizeWidth : img.width;
                        const height = (img.height / img.width) * width;
                      
                        canvas.width = width;
                        canvas.height = height;
                      
                        ctx?.drawImage(img, 0, 0, width, height);
                      
                        const blob: Blob = await new Promise((resolve, reject) => {
                                    canvas.toBlob((b) => {
                                      if (!b) return reject(new Error("Image processing failed"));
                                      resolve(b);
                                    }, imageFormat, 0.8);
                                  });
                      
                        URL.revokeObjectURL(tempUrl);
                      
                        const ext = imageFormat.split("/")[1];
                      
                        return {
                          blob,
                          name: f.name.replace(/\.[^/.]+$/, `.${ext}`),
                          url: URL.createObjectURL(blob),
                          oldSize: f.size,
                          newSize: blob.size
                        };
                      }
            
            if (tool.slug === "pdf-to-word") {
            const blob = await pdfToWord(f);
            const newName = f.name.replace(/\.[^/.]+$/, "") + ".docx";
            return { 
              blob, 
              name: newName, 
              url: URL.createObjectURL(blob) // ADD THIS LINE
              };
            }
            if (tool.slug === "split-pdf") {
            const blob = await splitPDF(f);
            return {
              blob,
              name: f.name.replace(/\.[^/.]+$/, "_split.pdf"),
              url: URL.createObjectURL(blob)
            };
          }
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

    // URL Downloader Logic (Original Functionality)
    const cleanInput = url.trim();
    if (!cleanInput) return;
    setStatus("loading");
    setErrorMsg("");
    setResults([]);     // ✅ clear previous outputs
    setThumbnail("");   // ✅ clear previous preview

    try {
  const apiUrl = `https://toolhubworker.karanvirsidhu03.workers.dev?url=${encodeURIComponent(cleanInput)}`;
  
  const res = await fetch(apiUrl);
  
  // Read as text FIRST to debug and handle potential non-JSON errors
  const rawText = await res.text();
  let data;
  
  try {
              data = JSON.parse(rawText);
            } catch (e) {
              console.error("Failed to parse JSON:", rawText);
              throw new Error("Invalid response from server.");
            }
          
            if (!res.ok || !data.success) {
              throw new Error(data?.error || `Server error: ${res.status}`);
            }
          
            const items: ProcessedResult[] = [];
          
           if (data.downloadUrl?.startsWith("http")) {
                  const response = await fetch(data.downloadUrl);
                  if (!response.ok) throw new Error("Failed to fetch video");
                  const blob = await response.blob();
                  const objectUrl = URL.createObjectURL(blob);
                  items.push({
                    name: "Download Video",
                    url: objectUrl,
                    blob: blob
                  });
                }  
          
           if (data.audioUrl?.startsWith("http")) {
              const response = await fetch(data.audioUrl);
              if (!response.ok) throw new Error("Failed to fetch audio");
              const blob = await response.blob();
              const objectUrl = URL.createObjectURL(blob);
              items.push({
                name: "Download Audio",
                url: objectUrl,
                blob: blob
              });
            }
          
            if (items.length === 0) {
              throw new Error("No downloadable content found");
            }
          
            setResults(items);
          
            if (data.thumbnail) {
              const workerBase = "https://toolhubworker.karanvirsidhu03.workers.dev";
              setThumbnail(`${workerBase}/proxy-image?img=${encodeURIComponent(data.thumbnail)}`);
            }
          
            setStatus("success");
          
          } catch (err: any) {
            console.error("Detailed Error:", err);
            setStatus("error");
            // Check specifically for CORS/Network failures
            setErrorMsg(err.name === 'TypeError' ? "Connection blocked by browser (CORS). Check Worker headers." : err.message);
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
              {acceptFile ? (
                <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10">
                  <label className="flex flex-col items-center gap-4 cursor-pointer">
                    <div className="w-20 h-20 rounded-full bg-card/20 flex items-center justify-center">
                      <Files className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="text-primary-foreground font-medium">
                      {files.length > 0 ? `${files.length} files selected` : "Click to upload multiple files"}
                    </span>
                    <input 
                      type="file" 
                      accept={fileAccept} 
                      multiple={tool.slug !== "split-pdf"} 
                      className="hidden" 
                      onChange={(e) => {
                        if (status === "loading") return;
  const selectedFiles = Array.from(e.target.files || []);
  setFiles(selectedFiles);
  setStatus("idle");
  setResults([]);
  setThumbnail("");
}}
                    />
                  </label>
                      {tool.slug.includes("image") && (
                          <div className="mt-4 flex flex-col gap-3">
                            {/* FORMAT SELECT */}
                            <select
                              value={imageFormat}
                              onChange={(e) => setImageFormat(e.target.value)}
                              className="p-2 rounded-lg bg-white/10 text-white"
                            >
                              <option value="image/jpeg">JPG</option>
                              <option value="image/png">PNG</option>
                              <option value="image/webp">WEBP</option>
                            </select>
                            {/* RESIZE INPUT */}
                            {tool.slug === "image-resize" && (
                              <input
                                type="number"
                                placeholder="Width (px)"
                                value={resizeWidth}
                                onChange={(e) => setResizeWidth(Math.max(50, Number(e.target.value)))}
                                className="p-2 rounded-lg bg-white/10 text-white"
                              />
                            )}
                          </div>
                        )}
                  <Button type="submit" disabled={files.length === 0 || status === "loading"} size="lg" className="mt-6 w-full bg-card text-foreground hover:bg-card/90 font-semibold">
                    {status === "loading" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Process Files
                    </>
                  )}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                    <div className="relative flex-1 w-full">
                      <Input 
                        ref={inputRef}
                        value={url} 
                        onChange={(e) => { setUrl(e.target.value); setStatus("idle"); }} 
                        placeholder={placeholder} 
                        className="h-16 pr-28 bg-card/20 backdrop-blur-md border-2 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 text-lg rounded-2xl w-full" 
                      />
                      <button type="button" onClick={handlePaste} disabled={!canPaste} className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl flex items-center gap-2 transition-all">
                        <ClipboardPaste className="w-4 h-4" />
                        <span className="text-xs font-bold">{canPaste ? "PASTE" : "N/A"}</span>
                      </button>
                    </div>
                    <Button type="submit" disabled={!url.trim() || status === "loading"} className="h-16 px-10 bg-card text-foreground hover:bg-card/90 font-bold text-lg rounded-2xl shrink-0">
                      {status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              )}
            </form>

            {status === "error" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center justify-center gap-2 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errorMsg}</span>
              </motion.div>
            )}

            {status === "success" && results.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                 <div className="flex flex-col items-center gap-2 text-green-200">
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="font-medium text-xl">Success!</span>
                 </div>

                 {thumbnail && <img src={thumbnail} alt="Preview" className="w-full max-w-sm mx-auto rounded-lg shadow-lg mb-4" referrerPolicy="no-referrer" crossOrigin="anonymous" />}
                 
                 <div className="max-w-xl mx-auto space-y-3">
                    {results.map((res, i) => (
                      <div key={i} className="bg-card/30 backdrop-blur-md rounded-xl p-4 border border-primary-foreground/10 flex items-center justify-between">
                        <div className="text-left overflow-hidden pr-4">
                          <p className="text-primary-foreground font-medium truncate text-sm">{res.name}</p>
                          {res.oldSize && res.newSize && (
  <p className="text-xs text-green-300">
    {res.newSize < res.oldSize
      ? `Saved ${Math.round(((res.oldSize - res.newSize) / res.oldSize) * 100)}% (${formatBytes(res.newSize)})`
      : `Processed (${formatBytes(res.newSize)})`}
  </p>
)}
                        </div>
                        <div className="flex gap-2">
                           <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-white/10" onClick={() => window.open(res.url, '_blank')}>
                              <Eye className="w-4 h-4" />
                           </Button>
                           <a href={res.url} download={res.name} className="bg-card text-foreground px-4 py-2 rounded-lg text-xs font-bold hover:scale-105 transition-transform no-underline">
                              DOWNLOAD
                           </a>
                        </div>
                      </div>
                    ))}
                 </div>
                 <div className="w-full flex justify-center py-2"><AdBanner /></div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

 

      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-display text-2xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { step: "1", title: acceptFile ? "Upload Files" : "Paste Link", desc: "Select your content" },
            { step: "2", title: "Process", desc: "Fast cloud-based processing" },
            { step: "3", title: "Download", desc: "Save your results" },
          ].map((s) => (
            <div key={s.step}>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">{s.step}</div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {seoContent && (
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-8">
            <h2 className="font-display text-xl font-bold mb-4">{title}</h2>
            <div className="text-sm text-muted-foreground space-y-3">
              {seoContent.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <h2 className="font-display text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <Collapsible key={i}>
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-card rounded-xl p-4 border border-border text-left group">
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown className="h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 pt-2 text-sm text-muted-foreground">{faq.a}</CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </section>
      )}

      <AdBanner className="container mx-auto px-4 rounded-lg" />

      {relatedTools.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <h2 className="font-display text-2xl font-bold text-center mb-8">Try Other Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {relatedTools.map((rt) => (
              <Link key={rt.slug} to={`/${rt.slug}`} className="group block bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${rt.gradient} text-primary-foreground mb-3`}>
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

export default ToolPage;
