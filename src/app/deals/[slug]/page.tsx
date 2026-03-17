import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getDealBySlug } from "@/lib/deals-data";
import { formatCurrency } from "@/lib/format";

export default async function DealDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  const savings = deal.original_price - deal.deal_price;
  const message = encodeURIComponent(
    [
      `Hello, I want to order this deal: ${deal.title}`,
      "",
      `Product: ${deal.product_name}`,
      `Deal size: ${deal.size}`,
      `Deal price: ${formatCurrency(deal.deal_price)}`,
      `Maximum quantity: ${deal.max_quantity}`,
    ].join("\n"),
  );

  return (
    <main className="min-h-screen bg-[#faf8f5] px-4 pb-16 pt-8 text-neutral-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-sm">
          <Image src={deal.hero_image} alt={deal.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
          <div className="absolute left-6 top-6">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to deals
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">{deal.badge}</p>
            <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">{deal.title}</h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-orange-50/90">{deal.teaser}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Offer math</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.25rem] bg-orange-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Original</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{formatCurrency(deal.original_price)}</p>
              </div>
              <div className="rounded-[1.25rem] bg-green-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">Deal</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{formatCurrency(deal.deal_price)}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-100 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">You save</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{formatCurrency(savings)}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              <p>Product: {deal.product_name}</p>
              <p>Deal size: {deal.size}</p>
              <p>Maximum quantity: {deal.max_quantity}</p>
              <p>Starts: {new Date(deal.starts_at).toLocaleDateString("en-NG", { dateStyle: "full" })}</p>
              {deal.ends_at ? (
                <p>Ends: {new Date(deal.ends_at).toLocaleDateString("en-NG", { dateStyle: "full" })}</p>
              ) : null}
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Deal details</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{deal.description}</p>

            {deal.status === "ongoing" ? (
              <div className="mt-6 space-y-4">
                <div className="rounded-[1.5rem] bg-green-50 p-4 text-sm text-slate-700">
                  This deal is active now. Open WhatsApp and send the locked offer through directly.
                </div>
                <a
                  href={`https://wa.me/2347041249727?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-green-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-green-600"
                >
                  Proceed with order
                </a>
              </div>
            ) : deal.status === "coming-soon" ? (
              <div className="mt-6 rounded-[1.5rem] bg-slate-100 p-4 text-sm font-semibold text-slate-700">
                This deal is coming soon. It becomes claimable from {new Date(deal.starts_at).toLocaleDateString("en-NG", { dateStyle: "medium" })}.
              </div>
            ) : deal.status === "sold-out" ? (
              <div className="mt-6 rounded-[1.5rem] bg-amber-100 p-4 text-sm font-semibold text-amber-800">
                This deal sold out before the offer window ended.
              </div>
            ) : (
              <div className="mt-6 rounded-[1.5rem] bg-neutral-100 p-4 text-sm font-semibold text-neutral-700">
                This deal has expired. Check the main deals page for the next active drop.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
