import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SHOW_ADS = import.meta.env.VITE_SHOW_ADS === "true";

interface AdBannerProps {
className?: string;
adKey: string;
width: number;
height: number;
}

const AdBanner = ({ className, adKey, width, height }: AdBannerProps) => {
const adRef = useRef<HTMLDivElement>(null);

useEffect(() => {
if (!SHOW_ADS) return;
if (!adRef.current) return;

```
// clear previous ad to avoid duplicates in React re-renders
adRef.current.innerHTML = "";

try {
  const scriptConfig = document.createElement("script");
  scriptConfig.type = "text/javascript";
  scriptConfig.innerHTML = `
    atOptions = {
      key: "${adKey}",
      format: "iframe",
      height: ${height},
      width: ${width},
      params: {}
    };
  `;

  const scriptInvoke = document.createElement("script");
  scriptInvoke.type = "text/javascript";
  scriptInvoke.src = `https://fortunateambiguous.com/${adKey}/invoke.js`;
  scriptInvoke.async = true;

  adRef.current.appendChild(scriptConfig);
  adRef.current.appendChild(scriptInvoke);
} catch (err) {
  console.error("Ad error:", err);
}
```

}, [adKey, width, height]);

if (!SHOW_ADS) return null;

return (
<div
className={cn("flex justify-center my-4 overflow-hidden", className)}
style={{ minHeight: height }}
> <div ref={adRef} /> </div>
);
};

export default AdBanner;
