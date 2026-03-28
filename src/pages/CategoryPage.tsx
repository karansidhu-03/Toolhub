import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { categories, getToolsByCategory, type ToolCategory } from "@/lib/tools";
import AdBanner from "@/components/AdBanner";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = Object.entries(categories).find(([, cat]) => cat.slug === slug);
  const [key, category] = (entry || []) as [ToolCategory, typeof categories[ToolCategory]];
  const categoryTools = entry ? getToolsByCategory(key) : [];
  const Icon = category?.icon;

  useEffect(() => {
    if (category) document.title = `${category.label} — Free Online Tools | ToolHub`;
  }, [category]);

  if (!entry) return <Navigate to="/" replace />;

  return (
    <div className="min-h-[80vh]">
      <section className={`relative overflow-hidden py-16 md:py-24 bg-gradient-to-br ${category.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card/20 backdrop-blur-sm mb-6">
              <Icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">{category.label}</h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">{category.description}</p>
          </motion.div>
        </div>
      </section>

      <AdBanner className="container mx-auto px-4 rounded-lg" />

      <section className="container mx-auto px-4 py-16">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {categoryTools.map((tool) => (
            <motion.div key={tool.slug} variants={item}>
              <Link to={`/${tool.slug}`} className="group block bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border hover:border-primary/30">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${tool.gradient} text-primary-foreground mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <h2 className="font-display text-lg font-semibold mb-2">{tool.title}</h2>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default CategoryPage;
