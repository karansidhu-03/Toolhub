import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
  adKey: string;
  width: number;
  height: number;
}

const AdBanner = ({ className, adKey, width, height }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      style={{ minHeight: height }}
    >
      <div ref={adRef}></div>
    </div>
  );
};

export default AdBanner;
