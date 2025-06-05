"use client";
import { ArrowDown } from "lucide-react";
export default function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      onClick={() => {
        const el = document.getElementById("about-me");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <ArrowDown className="h-8 w-8 text-foreground/80 animate-pulse" />
    </div>
  );
}