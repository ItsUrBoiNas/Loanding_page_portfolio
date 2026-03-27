"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-slate-400 text-sm">
            Copyright NAS {currentYear}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}












