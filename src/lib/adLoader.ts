const PRODUCTION_DOMAINS = [
  "toolhub.app",
  "www.toolhub.app",
];

export const isProductionDomain = () => {
   if (typeof window === "undefined") return false;
  return PRODUCTION_DOMAINS.includes(window.location.hostname);
};

export const loadScript = (src: string) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
};

export const loadAds = () => {
  if (!isProductionDomain()) {
    console.log("Ads disabled on Vercel preview");
    return;
  }

  loadScript(
    "https://fortunateambiguous.com/5f/56/36/5f5636a4bdf6c693d70d90f63515f724.js"
  );
};
