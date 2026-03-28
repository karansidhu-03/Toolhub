import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, Wrench } from "lucide-react";
import { categories, getToolsByCategory, type ToolCategory } from "@/lib/tools";
import { Input } from "@/components/ui/input";
import { tools } from "@/lib/tools";
import AdBanner from "./AdBanner";

const navCategories: { key: ToolCategory; label: string }[] = [
  { key: "pdf", label: "PDF Tools" },
  { key: "image", label: "Image Tools" },
  { key: "video", label: "Video Tools" },
  { key: "downloader", label: "Downloaders" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  const filteredTools = searchQuery.trim()
    ? tools.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdBanner className="w-full" />

      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold gradient-text">ToolHub</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Home
            </Link>

            {navCategories.map((cat) => (
              <div
                key={cat.key}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(cat.key)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to={`/${categories[cat.key].slug}`}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname.includes(categories[cat.key].slug) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat.label}
                  <ChevronDown className="h-3 w-3" />
                </Link>

                <AnimatePresence>
                  {openDropdown === cat.key && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-card rounded-xl border border-border shadow-lg p-2 z-50"
                    >
                      {getToolsByCategory(cat.key).map((tool) => (
                        <Link
                          key={tool.slug}
                          to={`/${tool.slug}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <tool.icon className="h-4 w-4 text-primary" />
                          {tool.shortTitle}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              to="/blog"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === "/blog" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Search + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Search className="h-5 w-5 text-muted-foreground" />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-card rounded-xl border border-border shadow-lg p-3 z-50"
                  >
                    <Input
                      autoFocus
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-2"
                    />
                    {filteredTools.length > 0 && (
                      <div className="max-h-60 overflow-y-auto space-y-1">
                        {filteredTools.map((tool) => (
                          <Link
                            key={tool.slug}
                            to={`/${tool.slug}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                          >
                            <tool.icon className="h-4 w-4 text-primary" />
                            <span>{tool.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchQuery.trim() && filteredTools.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-2">No tools found</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                <Link to="/" className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted">Home</Link>
                {navCategories.map((cat) => (
                  <div key={cat.key}>
                    <Link
                      to={`/${categories[cat.key].slug}`}
                      className="block px-3 py-2 rounded-lg text-sm font-semibold text-foreground"
                    >
                      {cat.label}
                    </Link>
                    <div className="pl-4 space-y-1">
                      {getToolsByCategory(cat.key).map((tool) => (
                        <Link
                          key={tool.slug}
                          to={`/${tool.slug}`}
                          className="block px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-muted"
                        >
                          {tool.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link to="/blog" className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted">Blog</Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                  <Wrench className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-display text-lg font-bold">ToolHub</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Free online tools to convert, compress, and download your files. Fast, secure, and easy to use.
              </p>
            </div>
            {Object.entries(categories).map(([key, cat]) => (
              <div key={key}>
                <h4 className="font-display font-semibold mb-3">
                  <Link to={`/${cat.slug}`} className="hover:text-primary transition-colors">{cat.label}</Link>
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {getToolsByCategory(key as ToolCategory).slice(0, 4).map((tool) => (
                    <li key={tool.slug}>
                      <Link to={`/${tool.slug}`} className="hover:text-primary transition-colors">{tool.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ToolHub. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky Footer Ad */}
      <div className="sticky bottom-0 z-40 bg-card/90 backdrop-blur border-t border-border">
        <AdBanner className="my-0 min-h-[50px]" />
      </div>
    </div>
  );
};

export default Layout;
