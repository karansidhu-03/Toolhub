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
  // 🚫 Don't even run ad logic if ads are disabled
  if (!SHOW_ADS) return;

  if (!adRef.current) return;

  // clear old ad (important for React re-renders)
  adRef.current.innerHTML = "";

  try {
    const scriptConfig = document.createElement("script");
    scriptConfig.type = "text/javascript";
    scriptConfig.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    const scriptInvoke = document.createElement("script");
    scriptInvoke.type = "text/javascript";
    scriptInvoke.src = "https://fortunateambiguous.com/" + adKey + "/invoke.js";
    scriptInvoke.async = true;

    adRef.current.appendChild(scriptConfig);
    adRef.current.appendChild(scriptInvoke);
  } catch (err) {
    console.error("Ad error:", err);
  }
}, [adKey, width, height]);useEffect(() => {
  // 🚫 Don't even run ad logic if ads are disabled
  if (!SHOW_ADS) return;

  if (!adRef.current) return;

  // clear old ad (important for React re-renders)
  adRef.current.innerHTML = "";

  try {
    const scriptConfig = document.createElement("script");
    scriptConfig.type = "text/javascript";
    scriptConfig.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    const scriptInvoke = document.createElement("script");
    scriptInvoke.type = "text/javascript";
    scriptInvoke.src = "https://fortunateambiguous.com/" + adKey + "/invoke.js";
    scriptInvoke.async = true;

    adRef.current.appendChild(scriptConfig);
    adRef.current.appendChild(scriptInvoke);
  } catch (err) {
    console.error("Ad error:", err);
  }
}, [adKey, width, height]);
  
  return (
  <div
    className={cn(
      "flex justify-center my-4 overflow-hidden",
      className
    )}
    style={{ minHeight: SHOW_ADS ? height : 0 }} // 👈 small improvement
  >
    <div ref={adRef}></div>
  </div>
);
if (!SHOW_ADS) return null;
};

export default AdBanner;
