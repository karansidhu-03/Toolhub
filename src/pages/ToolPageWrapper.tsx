import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getToolBySlug } from "@/lib/tools";
import ToolPage from "@/components/ToolPage";

const ToolPageWrapper = () => {
  const { toolSlug } = useParams<{ toolSlug: string }>();
  const tool = toolSlug ? getToolBySlug(toolSlug) : undefined;

  useEffect(() => {
    if (tool) {
      document.title = `${tool.title} — Free Online Tool | ToolHub`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", tool.metaDescription);
    }
  }, [tool]);

  if (!tool) return <Navigate to="/" replace />;

  return <ToolPage tool={tool} />;
};

export default ToolPageWrapper;
