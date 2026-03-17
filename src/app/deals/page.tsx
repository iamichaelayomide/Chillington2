import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { deals } from "@/lib/deals-data";
import { formatCurrency } from "@/lib/format";

function formatDealDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function DealsPage() {
  const ongoingDeals = deals.filter((deal) => deal.status === "ongoing");
  const upcomingDeals = deals.filter((deal) => deal.status === "coming-soon");
  const pausedDeals = deals.filter((deal) => deal.status === "sold-out" || deal.status === "expired");

  return (
    <main className="min-h-screen bg-[#faf8f5] px-4 pb-16 pt-8 text-neutral-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
                <Sparkles className="h-3.5 w-3.5" />
                Akure deal board
              </p>
              <h1 className="text-4xl font-black text-slate-950 sm:text-5xl">Deals worth opening before they disappear.</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                See what is live, what is coming next, and what already sold out. Open each deal to inspect the full offer and order through the locked customer flow.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-900">Ongoing Deals</h2>
            <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">Live now</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {ongoingDeals.map((deal) => (
              <article key={deal.slug} className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-sm">
                <div className="relative h-64">
                  <Image src={deal.hero_image} alt={deal.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-orange-500 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">{deal.badge}</span>
                    <div className="flex flex-wrap justify-end gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
                        Save {formatCurrency(deal.original_price - deal.deal_price)}
                      </span>
                      <span className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
                        Max {deal.max_quantity}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">{deal.product_name}</p>
                    <h3 className="mt-2 text-3xl font-black">{deal.title}</h3>
                  </div>
                </div>
                <div className="space-y-5 p-5">
                  <p className="text-sm leading-7 text-slate-600">{deal.teaser}</p>
                  <div className="flex flex-wrap gap-2">
                    {deal.ends_at ? (
                      <span className="rounded-full bg-green-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-green-700">
                        Ends {formatDealDate(deal.ends_at)}
                      </span>
                    ) : null}
                    <span className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                      Starts {formatDealDate(deal.starts_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-[1.3rem] bg-orange-50 px-4 py-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Deal price</p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-950">{formatCurrency(deal.deal_price)}</span>
                        <span className="text-sm font-semibold text-slate-400 line-through">{formatCurrency(deal.original_price)}</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700">
                      {deal.size}
                    </span>
                  </div>
                  <Link href={`/deals/${deal.slug}`} className="inline-flex rounded-[1.2rem] bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                    View deal
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-900">Upcoming Deals</h2>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Preview only</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {upcomingDeals.map((deal) => (
              <article key={deal.slug} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="relative h-52">
                  <Image src={deal.hero_image} alt={deal.title} fill className="object-cover grayscale-[0.1]" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-slate-950/85 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">{deal.badge}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-2xl font-black">{deal.title}</h3>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <p className="text-sm leading-7 text-slate-600">{deal.teaser}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                      Starts {formatDealDate(deal.starts_at)}
                    </span>
                    <span className="rounded-full bg-orange-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
                      Save {formatCurrency(deal.original_price - deal.deal_price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-[1.3rem] bg-slate-50 px-4 py-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Expected deal price</p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-950">{formatCurrency(deal.deal_price)}</span>
                        <span className="text-sm font-semibold text-slate-400 line-through">{formatCurrency(deal.original_price)}</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                      {deal.size}
                    </span>
                  </div>
                  <Link href={`/deals/${deal.slug}`} className="inline-flex rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600">
                    View preview
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-900">Paused Deals</h2>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Sold out or expired</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {pausedDeals.map((deal) => (
              <article key={deal.slug} className="overflow-hidden rounded-[2rem] border border-amber-200 bg-[#fffaf1] shadow-sm">
                <div className="relative h-52">
                  <Image src={deal.hero_image} alt={deal.title} fill className="object-cover grayscale-[0.2]" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-amber-500 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">{deal.badge}</span>
                    <span className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
                      Save {formatCurrency(deal.original_price - deal.deal_price)}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-2xl font-black">{deal.title}</h3>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <p className="text-sm leading-7 text-slate-600">{deal.teaser}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-800">
                      {deal.status === "sold-out" ? "Allocation finished" : "Offer closed"}
                    </span>
                    {deal.ends_at ? (
                      <span className="rounded-full bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                        Ended {formatDealDate(deal.ends_at)}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between rounded-[1.3rem] bg-amber-50 px-4 py-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Deal price</p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-950">{formatCurrency(deal.deal_price)}</span>
                        <span className="text-sm font-semibold text-slate-400 line-through">{formatCurrency(deal.original_price)}</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                      {deal.size}
                    </span>
                  </div>
                  <Link href={`/deals/${deal.slug}`} className="inline-flex rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600">
                    View deal
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
