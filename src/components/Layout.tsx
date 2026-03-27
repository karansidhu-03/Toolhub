import { Link, useLocation } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdBanner from "./AdBanner";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/instagram-downloader", label: "Instagram" },
  { to: "/tiktok-downloader", label: "TikTok" },
  { to: "/youtube-shorts-downloader", label: "YouTube Shorts" },
  { to: "/image-compressor", label: "Image Compressor" },
  { to: "/video-converter", label: "Video to MP4" },
  { to: "/blog", label: "Blog" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Ad Banner */}
      <AdBanner slot="header" className="w-full" />

      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero">
              <Download className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold gradient-text">Download Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <div className="px-4 py-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                  <Download className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-display text-lg font-bold">Download Hub</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Free online tools to download and convert your favorite content.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/instagram-downloader" className="hover:text-primary transition-colors">Instagram Downloader</Link></li>
                <li><Link to="/tiktok-downloader" className="hover:text-primary transition-colors">TikTok Downloader</Link></li>
                <li><Link to="/youtube-shorts-downloader" className="hover:text-primary transition-colors">YouTube Shorts</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Utilities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/image-compressor" className="hover:text-primary transition-colors">Image Compressor</Link></li>
                <li><Link to="/video-converter" className="hover:text-primary transition-colors">Video to MP4</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Download Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
