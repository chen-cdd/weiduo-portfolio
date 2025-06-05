"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon, GlobeIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("EN");

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#about-me", label: "About Me" },
    { href: "#resume", label: "Resume Assistant" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-screen-lg flex h-16 items-center justify-center">
        <nav className="flex items-center justify-center space-x-20 text-lg font-medium">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative transition-all hover:text-foreground/90 px-3 py-1 rounded-md",
                "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0",
                "after:-translate-x-1/2 after:bg-primary after:transition-all hover:after:w-3/4",
                pathname === href || (href !== "/" && pathname?.startsWith(href))
                  ? "text-foreground after:w-3/4"
                  : "text-foreground/70"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>


        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center ml-10"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <SunIcon className="absolute text-yellow-500 transition-all duration-300 transform dark:opacity-0 dark:scale-50" />
            <MoonIcon className="absolute text-blue-400 transition-all duration-300 transform opacity-0 scale-50 dark:opacity-100 dark:scale-100" />
          </div>
        </button>

      </div>
    </header>
  );
}