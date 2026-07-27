import React from "react";
import Link from "next/link";
import { Code2, Globe, Share2, MessageSquare } from "lucide-react";


export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Code2 className="h-5 w-5" />
              </div>
              <span>Dev<span className="text-emerald-400">OS</span></span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Your development knowledge, finally connected. Streamline workflow, context, and code intelligence.
            </p>
          </div>

          {/* Link Columns */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Product
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 DevOS. Built by DeveloperSRG.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Website"
            >
              <Globe className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Community"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
