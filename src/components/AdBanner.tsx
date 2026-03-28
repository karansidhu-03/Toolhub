import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
}

const AdBanner = ({ className }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const scriptConfig = document.createElement("script");
      scriptConfig.type = "text/javascript";
      scriptConfig.innerHTML = `
        atOptions = {
          'key' : '3b6c7c30e0ddaca25482279da85212ef',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };
      `;

      const scriptInvoke = document.createElement("script");
      scriptInvoke.type = "text/javascript";
      scriptInvoke.src = "//www.highperformanceformat.com/3b6c7c30e0ddaca25482279da85212ef/invoke.js";

      adRef.current.appendChild(scriptConfig);
      adRef.current.appendChild(scriptInvoke);
    }
  }, []);

  return (
    <div className={cn("flex justify-center my-4 overflow-hidden min-h-[60px]", className)}>
      <div ref={adRef}></div>
    </div>
  );
};

export default AdBanner;
