const AdBanner = ({ slot, className = "" }: { slot: string; className?: string }) => {
  return (
    <div
      className={`flex items-center justify-center bg-muted/50 border border-dashed border-border text-muted-foreground text-xs py-2 ${className}`}
      data-ad-slot={slot}
    >
      {/* Google AdSense placeholder — replace with real ad code */}
      <span className="opacity-50">Ad Space ({slot})</span>
    </div>
  );
};

export default AdBanner;
