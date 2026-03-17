import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import type { Promotion } from "@/types/domain";

export function PromoBanner({ promotion }: { promotion: Promotion | null }) {
  if (!promotion) {
    return null;
  }

  return (
    <section className="px-4 py-4 sm:px-6 lg:px-8">
      <Link
        href="/deals"
        className="mx-auto flex max-w-7xl items-start justify-between gap-4 rounded-[2rem] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(16,66,44,0.96),rgba(10,18,14,0.98))] px-5 py-5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.28)] transition hover:border-emerald-300/40 hover:bg-[linear-gradient(135deg,rgba(18,78,51,0.98),rgba(12,22,16,0.98))]"
      >
        <div className="flex items-start gap-4">
          <span className="rounded-2xl bg-white/10 p-3">
            <Megaphone className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-100/80">Active Promo</p>
            <h2 className="mt-1 font-heading text-2xl font-black">{promotion.title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-emerald-50/85 sm:text-base">{promotion.description}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-emerald-100/80">
              Tap to open deals and buy the live offer
            </p>
          </div>
        </div>
        <span className="hidden shrink-0 items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#11331f] sm:inline-flex">
          View deals
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </section>
  );
}
