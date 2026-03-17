"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  Clock3,
  Facebook,
  Flame,
  Instagram,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

type MenuSize = "regular" | "special" | "jumbo";
type MenuCategory = "premium" | "combo" | "classic";

type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  image: string;
  prices: Partial<Record<MenuSize, number>>;
  tag?: string;
};

type CartItem = {
  id: string;
  name: string;
  image: string;
  size: MenuSize;
  price: number;
  quantity: number;
};

type DealStatus = "ongoing" | "coming-soon" | "sold-out" | "expired";

type Deal = {
  slug: string;
  title: string;
  status: DealStatus;
  startsAt: string;
  endsAt?: string;
  heroImage: string;
  productName: string;
  size: MenuSize;
  originalPrice: number;
  dealPrice: number;
  maxQuantity: number;
  badge: string;
  teaser: string;
  description: string;
};

type Testimonial = {
  id: string;
  name: string;
  location: string;
  order: string;
  quote: string;
  accent: string;
};

const tabs = ["All", "Premium Treat", "Combo Treats", "Classic Treats"] as const;

const sizeLabels: Record<MenuSize, string> = {
  regular: "Regular",
  special: "Special",
  jumbo: "Jumbo",
};

const premiumTreats: MenuItem[] = [
  { id: "beef", name: "Beef Shawarma", category: "premium", image: "/images/food/closeup.jpg", tag: "Classic", prices: { regular: 2800, special: 3200, jumbo: 3700 } },
  { id: "chicken", name: "Chicken Shawarma", category: "premium", image: "/images/food/platter.jpg", tag: "Fan Fave", prices: { regular: 2900, special: 3500, jumbo: 3700 } },
  { id: "suya", name: "Suya Shawarma", category: "premium", image: "/images/food/wrap.jpg", tag: "Spicy", prices: { regular: 2900, special: 3400, jumbo: 3900 } },
  { id: "goat", name: "Goat Shawarma", category: "premium", image: "/images/food/closeup.jpg", prices: { regular: 3200, special: 3600, jumbo: 3900 } },
  { id: "turkey", name: "Turkey Shawarma", category: "premium", image: "/images/food/platter.jpg", prices: { regular: 3900, special: 4300, jumbo: 4800 } },
  { id: "shrimpken", name: "Shrimpken Shawarma", category: "premium", image: "/images/food/wrap.jpg", tag: "Premium", prices: { regular: 4800, special: 5300, jumbo: 5800 } },
  { id: "lamb", name: "Lamb Shawarma", category: "premium", image: "/images/food/closeup.jpg", prices: { regular: 4000, special: 4700, jumbo: 5100 } },
];

const comboTreats: MenuItem[] = [
  { id: "cb1", name: "Chicken 'n Beef Shawarma", category: "combo", image: "/images/food/platter.jpg", prices: { regular: 3200, jumbo: 4700 } },
  { id: "cb2", name: "Suya 'n Beef Shawarma", category: "combo", image: "/images/food/closeup.jpg", prices: { regular: 3400, jumbo: 4900 } },
  { id: "cb3", name: "Chicken 'n Goat Shawarma", category: "combo", image: "/images/food/wrap.jpg", prices: { regular: 3600, jumbo: 5100 } },
  { id: "cb4", name: "Chicken 'n Lamb Shawarma", category: "combo", image: "/images/food/platter.jpg", prices: { regular: 3800, jumbo: 5400 } },
  { id: "cb5", name: "Chicken 'n Turkey Shawarma", category: "combo", image: "/images/food/closeup.jpg", prices: { regular: 4300, jumbo: 5800 } },
  { id: "cb6", name: "Turkey 'n Lamb Shawarma", category: "combo", image: "/images/food/wrap.jpg", prices: { regular: 4400, jumbo: 5700 } },
];

const classicTreats: MenuItem[] = [
  { id: "cl1", name: "Lingtonsaur Shawarma", category: "classic", image: "/images/food/platter.jpg", tag: "NEW", prices: { regular: 8900 } },
  { id: "cl2", name: "Spencer Mix Shawarma", category: "classic", image: "/images/food/closeup.jpg", tag: "Popular", prices: { regular: 5400 } },
  { id: "cl3", name: "Mini Shawarma", category: "classic", image: "/images/food/wrap.jpg", prices: { regular: 1750 } },
  { id: "cl4", name: "Veggies Shawarma", category: "classic", image: "/images/food/closeup.jpg", prices: { regular: 1900 } },
  { id: "cl5", name: "Vegan Shawarma", category: "classic", image: "/images/food/platter.jpg", prices: { regular: 1800 } },
];

const extras = [
  { id: "ex1", name: "Extra Meat Protein", price: 500 },
  { id: "ex2", name: "Extra Sausage", price: 400 },
  { id: "ex3", name: "Extra Spice", price: 300 },
  { id: "ex4", name: "Extra Veggies", price: 300 },
  { id: "ex5", name: "Extra Wrap", price: 400 },
  { id: "ex6", name: "Extra Cream", price: 300 },
  { id: "ex7", name: "Cheese", price: 2000 },
];

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Anjola",
    location: "Akure",
    order: "Chicken Jumbo + fries",
    quote: "This is the kind of shawarma that makes you stop talking after the first bite. The wrap was heavy, hot, and packed properly.",
    accent: "bg-[#fff1e8]",
  },
  {
    id: "t2",
    name: "Tobi",
    location: "FUTA South Gate",
    order: "Suya Special",
    quote: "The suya version had real heat and the cream balanced it well. I ordered once and it turned into my default late-night order.",
    accent: "bg-[#fff7dc]",
  },
  {
    id: "t3",
    name: "Mide",
    location: "Alagbaka",
    order: "Chicken and Beef Combo",
    quote: "The combo did not feel small or rushed. You can tell the fillings are generous, and it still arrived looking clean.",
    accent: "bg-[#eef7ef]",
  },
  {
    id: "t4",
    name: "Feyisayo",
    location: "Ijapo Estate",
    order: "Turkey Special",
    quote: "Their turkey shawarma tastes premium. It feels like the kind of order you make when you actually want to enjoy your money.",
    accent: "bg-[#f6f0ff]",
  },
];

const deals: Deal[] = [
  {
    slug: "jumbo-chicken-rush",
    title: "Jumbo Chicken Rush",
    status: "ongoing",
    startsAt: "2026-03-12T09:00:00.000Z",
    endsAt: "2026-03-28T22:00:00.000Z",
    heroImage: "/images/food/platter.jpg",
    productName: "Chicken Shawarma",
    size: "jumbo",
    originalPrice: 3900,
    dealPrice: 3200,
    maxQuantity: 3,
    badge: "Ongoing Deal",
    teaser: "Save big on the most ordered jumbo wrap in Akure.",
    description:
      "Claim the Jumbo Chicken Rush and lock in a lower jumbo price. The wrap stays fixed at Jumbo size so the value is clean, the order is fast, and the customer sees exactly what they are getting.",
  },
  {
    slug: "suya-special-week",
    title: "Suya Special Week",
    status: "ongoing",
    startsAt: "2026-03-15T09:00:00.000Z",
    endsAt: "2026-03-21T22:00:00.000Z",
    heroImage: "/images/food/wrap.jpg",
    productName: "Suya Shawarma",
    size: "special",
    originalPrice: 3800,
    dealPrice: 3200,
    maxQuantity: 3,
    badge: "Ongoing Deal",
    teaser: "Pepper-forward deal for people who want heat without paying full special price.",
    description:
      "Suya Special Week drops the Special size to a sharper price. It is claimable now, quantity-limited, and designed to move people straight into ordering without extra decision fatigue.",
  },
  {
    slug: "combo-night-drop",
    title: "Combo Night Drop",
    status: "coming-soon",
    startsAt: "2026-03-20T17:00:00.000Z",
    heroImage: "/images/food/closeup.jpg",
    productName: "Shawarma Combo Box",
    size: "regular",
    originalPrice: 5200,
    dealPrice: 4600,
    maxQuantity: 3,
    badge: "Coming Soon",
    teaser: "A tighter combo price for evening orders starting in June 2026.",
    description:
      "This upcoming combo deal goes live soon. The offer is fixed, capped, and visible exactly as it will be ordered so customers cannot alter the deal contents.",
  },
  {
    slug: "turkey-weekend-fire",
    title: "Turkey Weekend Fire",
    status: "coming-soon",
    startsAt: "2026-03-27T12:00:00.000Z",
    heroImage: "/images/food/platter.jpg",
    productName: "Turkey Shawarma",
    size: "special",
    originalPrice: 4200,
    dealPrice: 3600,
    maxQuantity: 3,
    badge: "Coming Soon",
    teaser: "Weekend-only turkey special running from July 2026.",
    description:
      "Turkey Weekend Fire is a scheduled offer with a locked special-size build. Customers can preview it now, but ordering only opens once it becomes active.",
  },
  {
    slug: "beef-lunch-sprint",
    title: "Beef Lunch Sprint",
    status: "sold-out",
    startsAt: "2026-03-16T11:00:00.000Z",
    endsAt: "2026-03-18T16:00:00.000Z",
    heroImage: "/images/food/closeup.jpg",
    productName: "Beef Shawarma",
    size: "special",
    originalPrice: 3200,
    dealPrice: 2700,
    maxQuantity: 2,
    badge: "Sold Out",
    teaser: "Lunch crowd cleared this one early. Keep it visible so customers know what just moved.",
    description:
      "Beef Lunch Sprint reached its allocation before the timer closed. Customers can still inspect the locked details, but checkout is disabled until the next drop.",
  },
  {
    slug: "mini-wrap-flash",
    title: "Mini Wrap Flash",
    status: "expired",
    startsAt: "2026-03-01T10:00:00.000Z",
    endsAt: "2026-03-05T20:00:00.000Z",
    heroImage: "/images/food/wrap.jpg",
    productName: "Mini Shawarma",
    size: "regular",
    originalPrice: 1750,
    dealPrice: 1400,
    maxQuantity: 3,
    badge: "Expired",
    teaser: "Previous flash promo now closed, kept here to show the kind of drops customers can expect.",
    description:
      "Mini Wrap Flash has ended. It remains visible as a past promotion so visitors can see the cadence and style of previous Chillington drops.",
  },
];

function formatCurrency(value: number) {
  return `N${value.toLocaleString("en-NG")}`;
}

function formatDealDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDealDateTime(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function dealSavings(deal: Deal) {
  return Math.max(0, deal.originalPrice - deal.dealPrice);
}

function getDealWindowLabel(deal: Deal) {
  if (deal.status === "ongoing" && deal.endsAt) {
    return `Ends ${formatDealDate(deal.endsAt)}`;
  }

  if (deal.status === "coming-soon") {
    return `Starts ${formatDealDate(deal.startsAt)}`;
  }

  if (deal.status === "sold-out") {
    return "Allocation finished";
  }

  return "Offer closed";
}

function getDealStatusTone(status: DealStatus) {
  if (status === "ongoing") {
    return {
      badge: "bg-orange-500 text-white",
      chip: "bg-green-100 text-green-700",
      card: "border-orange-100 bg-white",
      panel: "bg-orange-50",
    };
  }

  if (status === "coming-soon") {
    return {
      badge: "bg-slate-950/85 text-white",
      chip: "bg-slate-100 text-slate-700",
      card: "border-slate-200 bg-white",
      panel: "bg-slate-50",
    };
  }

  if (status === "sold-out") {
    return {
      badge: "bg-amber-500 text-white",
      chip: "bg-amber-100 text-amber-800",
      card: "border-amber-200 bg-[#fffaf1]",
      panel: "bg-amber-50",
    };
  }

  return {
    badge: "bg-neutral-800 text-white",
    chip: "bg-neutral-200 text-neutral-700",
    card: "border-neutral-200 bg-[#f8f6f3]",
    panel: "bg-neutral-100",
  };
}

function lineId(itemId: string, size: MenuSize) {
  return `${itemId}:${size}`;
}

function firstSize(item: MenuItem) {
  return (Object.keys(item.prices)[0] ?? "regular") as MenuSize;
}

export function ChillingtonShowcase() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, MenuSize>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [dealCheckout, setDealCheckout] = useState<Deal | null>(null);
  const [dealQuantity, setDealQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const allItems = useMemo(() => [...premiumTreats, ...comboTreats, ...classicTreats], []);

  const filteredItems = useMemo(() => {
    const base =
      activeTab === "All"
        ? allItems
        : activeTab === "Premium Treat"
          ? premiumTreats
          : activeTab === "Combo Treats"
            ? comboTreats
            : classicTreats;

    if (!query.trim()) {
      return base;
    }

    const normalized = query.trim().toLowerCase();
    return base.filter((item) => item.name.toLowerCase().includes(normalized));
  }, [activeTab, allItems, query]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const ongoingDeals = deals.filter((deal) => deal.status === "ongoing");
  const upcomingDeals = deals.filter((deal) => deal.status === "coming-soon");
  const pausedDeals = deals.filter((deal) => deal.status === "sold-out" || deal.status === "expired");

  function getSelectedSize(item: MenuItem) {
    return selectedSizes[item.id] ?? firstSize(item);
  }

  function setSelectedSize(itemId: string, size: MenuSize) {
    setSelectedSizes((current) => ({ ...current, [itemId]: size }));
  }

  function addToCart(item: MenuItem, size: MenuSize) {
    const price = item.prices[size];
    if (!price) {
      return;
    }

    setCart((current) => {
      const existing = current.find((entry) => lineId(entry.id, entry.size) === lineId(item.id, size));
      if (existing) {
        return current.map((entry) =>
          lineId(entry.id, entry.size) === lineId(item.id, size) ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }

      return [...current, { id: item.id, name: item.name, image: item.image, size, price, quantity: 1 }];
    });
  }

  function removeFromCart(itemId: string, size: MenuSize) {
    setCart((current) => {
      const existing = current.find((entry) => lineId(entry.id, entry.size) === lineId(itemId, size));
      if (!existing) {
        return current;
      }

      if (existing.quantity === 1) {
        return current.filter((entry) => lineId(entry.id, entry.size) !== lineId(itemId, size));
      }

      return current.map((entry) =>
        lineId(entry.id, entry.size) === lineId(itemId, size) ? { ...entry, quantity: entry.quantity - 1 } : entry,
      );
    });
  }

  function openDealCheckout(deal: Deal) {
    setSelectedDeal(null);
    setDealCheckout(deal);
    setDealQuantity(1);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
  }

  function submitDealOrder() {
    if (!dealCheckout) {
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      return;
    }

    const total = dealCheckout.dealPrice * dealQuantity;
    const message = [
      `Hello, I want to claim this deal: ${dealCheckout.title}`,
      "",
      `Product: ${dealCheckout.productName}`,
      `Deal size: ${sizeLabels[dealCheckout.size]}`,
      `Locked deal price: ${formatCurrency(dealCheckout.dealPrice)}`,
      `Quantity: ${dealQuantity}`,
      `Total: ${formatCurrency(total)}`,
      "",
      `Name: ${customerName}`,
      `Phone: ${customerPhone}`,
      `Address: ${customerAddress}`,
    ].join("\n");

    window.open(`https://wa.me/2347041249727?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-[#faf8f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">Chillington</p>
              <p className="text-lg font-black uppercase tracking-tight text-neutral-950">Bites V2</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.22em] text-neutral-500 md:flex">
            <a href="#deals" className="transition hover:text-orange-500">Deals</a>
            <a href="#about" className="transition hover:text-orange-500">About</a>
            <a href="#footer" className="transition hover:text-orange-500">Contact</a>
          </div>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:border-orange-300 hover:text-orange-600"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-orange-500 px-1.5 py-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Akure's shawarma spot
            </span>

            <h1 className="mt-6 max-w-xl text-5xl font-black leading-none text-slate-950 sm:text-6xl">
              Hot wraps.
              <br />
              Big flavour.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Loaded shawarma, rich fillings, proper heat, and fast delivery across Akure. Order your favourite wrap, catch live deals, and send your order straight to us on WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className="rounded-[1.35rem] bg-orange-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-orange-600">
                Shop now
              </a>
              <a
                href="https://wa.me/2347041249727"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.35rem] border border-orange-200 bg-orange-50 px-6 py-4 text-base font-semibold text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
              >
                Contact us
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] bg-orange-50 p-4">
                <p className="text-2xl font-black text-slate-950">7+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Proteins</p>
              </div>
              <div className="rounded-[1.4rem] bg-orange-50 p-4">
                <p className="text-2xl font-black text-slate-950">6</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Combo builds</p>
              </div>
              <div className="rounded-[1.4rem] bg-orange-50 p-4">
                <p className="text-2xl font-black text-slate-950">100%</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Local assets</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-orange-200 bg-slate-950">
              <Image src="/images/food/platter.jpg" alt="Large platter of shawarma, fries and dips" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-[1.6rem] border border-white/10 bg-black/35 p-5 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Signature Stack</p>
                  <h2 className="mt-3 text-3xl font-black text-white">Chicken jumbo with extra cream.</h2>
                  <p className="mt-3 text-sm leading-6 text-orange-50/90">Big wrap, loaded filling, fast decision path.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[2rem] border border-orange-200 bg-[#fff4eb]">
                <Image src="/images/food/closeup.jpg" alt="Close-up shawarma with visible filling" width={800} height={960} className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-orange-200 bg-[#fff4eb]">
                <Image src="/images/food/wrap.jpg" alt="Freshly wrapped shawarma ready to eat" width={800} height={960} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="deals" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-600">Best Deals</p>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Ongoing and upcoming offers, locked and ready</h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              These deals are read-only. Customers can inspect the exact offer, then proceed with the fixed deal order without changing the size, price, or structure.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-black uppercase tracking-[0.18em] text-slate-900">Ongoing Deals</h3>
              <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                Live now
              </span>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {ongoingDeals.map((deal) => (
                <article key={deal.slug} className={`overflow-hidden rounded-[2rem] border shadow-sm ${getDealStatusTone(deal.status).card}`}>
                  <div className="relative h-64">
                    <Image src={deal.heroImage} alt={deal.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${getDealStatusTone(deal.status).badge}`}>{deal.badge}</span>
                      <div className="flex flex-wrap justify-end gap-2">
                        <span className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
                          Save {formatCurrency(dealSavings(deal))}
                        </span>
                        <span className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
                          Max {deal.maxQuantity}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">{deal.productName}</p>
                      <h4 className="mt-2 text-3xl font-black">{deal.title}</h4>
                    </div>
                  </div>
                  <div className="space-y-5 p-5">
                    <p className="text-sm leading-7 text-slate-600">{deal.teaser}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${getDealStatusTone(deal.status).chip}`}>
                        {getDealWindowLabel(deal)}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                        {formatDealDateTime(deal.startsAt)}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between rounded-[1.3rem] px-4 py-4 ${getDealStatusTone(deal.status).panel}`}>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Deal price</p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-2xl font-black text-slate-950">{formatCurrency(deal.dealPrice)}</span>
                          <span className="text-sm font-semibold text-slate-400 line-through">{formatCurrency(deal.originalPrice)}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700">
                        {sizeLabels[deal.size]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedDeal(deal)}
                        className="rounded-[1.2rem] border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
                      >
                        View deal
                      </button>
                      <button
                        type="button"
                        onClick={() => openDealCheckout(deal)}
                        className="rounded-[1.2rem] bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                      >
                        Proceed with order
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-black uppercase tracking-[0.18em] text-slate-900">Upcoming Deals</h3>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
                Preview only
              </span>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {upcomingDeals.map((deal) => (
                <article key={deal.slug} className={`overflow-hidden rounded-[2rem] border shadow-sm ${getDealStatusTone(deal.status).card}`}>
                  <div className="relative h-52">
                    <Image src={deal.heroImage} alt={deal.title} fill className="object-cover grayscale-[0.1]" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute left-5 top-5">
                      <span className={`rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${getDealStatusTone(deal.status).badge}`}>{deal.badge}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h4 className="text-2xl font-black">{deal.title}</h4>
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="text-sm leading-7 text-slate-600">{deal.teaser}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${getDealStatusTone(deal.status).chip}`}>
                        {getDealWindowLabel(deal)}
                      </span>
                      <span className="rounded-full bg-orange-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
                        Save {formatCurrency(dealSavings(deal))}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between rounded-[1.3rem] px-4 py-4 ${getDealStatusTone(deal.status).panel}`}>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Expected deal price</p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-2xl font-black text-slate-950">{formatCurrency(deal.dealPrice)}</span>
                          <span className="text-sm font-semibold text-slate-400 line-through">{formatCurrency(deal.originalPrice)}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                        {sizeLabels[deal.size]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedDeal(deal)}
                        className="rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
                      >
                        View deal
                      </button>
                      <span className="rounded-[1.2rem] bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-500">
                        Not orderable yet
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-black uppercase tracking-[0.18em] text-slate-900">Paused Deals</h3>
              <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
                Sold out or expired
              </span>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {pausedDeals.map((deal) => (
                <article key={deal.slug} className={`overflow-hidden rounded-[2rem] border shadow-sm ${getDealStatusTone(deal.status).card}`}>
                  <div className="relative h-52">
                    <Image src={deal.heroImage} alt={deal.title} fill className="object-cover grayscale-[0.2]" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${getDealStatusTone(deal.status).badge}`}>{deal.badge}</span>
                      <span className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
                        Save {formatCurrency(dealSavings(deal))}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h4 className="text-2xl font-black">{deal.title}</h4>
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="text-sm leading-7 text-slate-600">{deal.teaser}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${getDealStatusTone(deal.status).chip}`}>
                        {getDealWindowLabel(deal)}
                      </span>
                      {deal.endsAt ? (
                        <span className="rounded-full bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                          Ended {formatDealDate(deal.endsAt)}
                        </span>
                      ) : null}
                    </div>
                    <div className={`flex items-center justify-between rounded-[1.3rem] px-4 py-4 ${getDealStatusTone(deal.status).panel}`}>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Deal price</p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-2xl font-black text-slate-950">{formatCurrency(deal.dealPrice)}</span>
                          <span className="text-sm font-semibold text-slate-400 line-through">{formatCurrency(deal.originalPrice)}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                        {sizeLabels[deal.size]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedDeal(deal)}
                        className="rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
                      >
                        View deal
                      </button>
                      <span className="rounded-[1.2rem] bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-500">
                        Checkout disabled
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-600">Menu</p>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Built for quick cravings, not endless clicks</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Filter by menu type, switch sizes inline, and keep your cart live while you browse.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-orange-500 text-white"
                      : "border border-orange-200 bg-white text-slate-700 hover:border-orange-400 hover:text-orange-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search shawarma"
                className="w-full rounded-full border border-orange-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 md:w-72"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => {
              const selected = getSelectedSize(item);
              const sizes = Object.keys(item.prices) as MenuSize[];
              const price = item.prices[selected] ?? 0;

              return (
                <article key={item.id} className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-44 overflow-hidden bg-neutral-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
                    {item.tag ? (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-neutral-900">
                        {item.tag}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-base font-black text-neutral-900">{item.name}</h3>

                    {sizes.length > 1 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(item.id, size)}
                            className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all ${
                              selected === size
                                ? "border-orange-500 bg-orange-500 text-white"
                                : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-orange-300"
                            }`}
                          >
                            {sizeLabels[size]}
                          </button>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-auto flex items-center justify-between pt-5">
                      <span className="text-xl font-black text-neutral-900">{formatCurrency(price)}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(item, selected)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:bg-slate-800"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {!filteredItems.length ? (
            <div className="rounded-[2rem] border border-dashed border-orange-200 bg-white px-6 py-16 text-center">
              <p className="text-2xl font-black text-slate-900">Nothing matches that search yet.</p>
              <p className="mt-2 text-sm text-slate-600">Try another keyword or jump back to all menu groups.</p>
            </div>
          ) : null}

          <div className="rounded-[2rem] border border-orange-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Extras</p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">Customise your wrap</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
              {extras.map((extra) => (
                <div key={extra.id} className="rounded-[1.4rem] border border-orange-100 bg-orange-50 px-4 py-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-700">{extra.name}</p>
                  <p className="mt-3 text-lg font-black text-orange-600">{formatCurrency(extra.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-orange-100 bg-[#fffaf4] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-600">Testimonials</p>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Swipe through what people say after the first bite</h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Built to scroll naturally on touch screens. Drag sideways, swipe on mobile, or trackpad through the reviews before you hit the about section.
            </p>
          </div>

          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className={`min-w-[84%] snap-center rounded-[2rem] border border-white/70 p-6 shadow-sm sm:min-w-[30rem] lg:min-w-[24rem] ${testimonial.accent}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-black text-slate-950">{testimonial.name}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{testimonial.location}</p>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
                    Verified order
                  </div>
                </div>

                <p className="mt-6 text-xl font-black leading-9 text-slate-950">&ldquo;{testimonial.quote}&rdquo;</p>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200/70 pt-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Ordered</p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">{testimonial.order}</p>
                  </div>
                  <div className="flex gap-1 text-orange-500">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] bg-[#1e293b]">
              <Image src="/images/food/platter.jpg" alt="Shawarma platter with fries" width={800} height={960} className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-[#1e293b]">
              <Image src="/images/food/closeup.jpg" alt="Detailed shawarma close-up" width={800} height={960} className="h-full w-full object-cover" />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-300">About Us</p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Pharm. Joseph
              <br />
              <span className="text-orange-500">Chillington&apos;s</span>
              <br />
              signature recipe.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
              This V2 route is now fully self-contained in your codebase. No remote design embeds, no third-party image links, and no dependency on outside hosts to render the page.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Halal-certified meats sourced fresh daily",
                "House marinades mixed fresh every morning",
                "Built for Akure cravings and fast WhatsApp checkout",
                "Wraps prepared hot, filled generously, and packed clean",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer id="footer" className="border-t border-orange-100 bg-white px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-3">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">Chillington</p>
                  <p className="text-lg font-black uppercase tracking-tight text-neutral-950">Bites V2</p>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                A local-only recreation route for Chillington Bites. Same mood, same ordering flow, no external image or design dependency.
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/ChillingtonShawarma" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-neutral-100 p-3 text-neutral-600 transition hover:bg-orange-500 hover:text-white">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com/chillington_bites" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-neutral-100 p-3 text-neutral-600 transition hover:bg-orange-500 hover:text-white">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.22em] text-slate-900">Contact &amp; Hours</h3>
              <ul className="mt-6 space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                  <span>No.1 HACO Building, Ori-Eguru Street, Arakale, Akure, Ondo State</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 flex-shrink-0 text-orange-500" />
                  <span>Open daily. WhatsApp confirms delivery windows.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.22em] text-slate-900">Quick Order</h3>
              <p className="mt-6 text-sm leading-7 text-slate-600">Use the cart flow here locally, then send your final order through WhatsApp.</p>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-[1.35rem] bg-green-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                <ShoppingBag className="h-4 w-4" />
                Open cart
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-orange-100 pt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 md:flex-row">
            <p>© 2026 Chillington Bites.</p>
            <p>Local V2 route ready for testing.</p>
          </div>
        </div>
      </footer>

      {cartCount ? (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-3 rounded-full bg-slate-950 px-5 py-4 text-sm font-bold text-white shadow-2xl lg:hidden"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{cartCount}</span>
          <span>{formatCurrency(cartTotal)}</span>
        </button>
      ) : null}

      {selectedDeal ? (
        <div className="fixed inset-0 z-[60]">
          <button type="button" aria-label="Close deal details" onClick={() => setSelectedDeal(null)} className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute left-1/2 top-1/2 w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="relative h-72">
              <Image src={selectedDeal.heroImage} alt={selectedDeal.title} fill className="object-cover" sizes="760px" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedDeal(null)}
                className="absolute right-5 top-5 rounded-full bg-white/90 p-2 text-slate-700 transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">{selectedDeal.badge}</p>
                <h3 className="mt-2 text-3xl font-black">{selectedDeal.title}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-100">
                  {selectedDeal.productName} · {sizeLabels[selectedDeal.size]}
                </p>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${getDealStatusTone(selectedDeal.status).chip}`}>
                  {getDealWindowLabel(selectedDeal)}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                  Save {formatCurrency(dealSavings(selectedDeal))}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                  Starts {formatDealDateTime(selectedDeal.startsAt)}
                </span>
                {selectedDeal.endsAt ? (
                  <span className="rounded-full bg-slate-100 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
                    Ends {formatDealDateTime(selectedDeal.endsAt)}
                  </span>
                ) : null}
              </div>

              <div className="rounded-[1.4rem] border border-orange-100 bg-orange-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Locked deal details</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Deal size</p>
                    <p className="mt-1 text-lg font-black text-slate-950">{sizeLabels[selectedDeal.size]}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Original</p>
                    <p className="mt-1 text-lg font-black text-slate-400 line-through">{formatCurrency(selectedDeal.originalPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Deal price</p>
                    <p className="mt-1 text-lg font-black text-orange-600">{formatCurrency(selectedDeal.dealPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">You save</p>
                    <p className="mt-1 text-lg font-black text-slate-950">{formatCurrency(dealSavings(selectedDeal))}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-600">{selectedDeal.description}</p>

              <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Important</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Customers cannot edit this deal. The product, size, and price are fixed. The only adjustable part during checkout is quantity, up to {selectedDeal.maxQuantity}.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedDeal.status === "ongoing" ? (
                  <button
                    type="button"
                    onClick={() => openDealCheckout(selectedDeal)}
                    className="rounded-[1.2rem] bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Proceed with order
                  </button>
                ) : selectedDeal.status === "coming-soon" ? (
                  <span className="rounded-[1.2rem] bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-500">Deal not active yet</span>
                ) : selectedDeal.status === "sold-out" ? (
                  <span className="rounded-[1.2rem] bg-amber-100 px-5 py-3 text-sm font-semibold text-amber-800">Deal sold out</span>
                ) : (
                  <span className="rounded-[1.2rem] bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-600">Deal expired</span>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedDeal(null)}
                  className="rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {dealCheckout ? (
        <div className="fixed inset-0 z-[70]">
          <button type="button" aria-label="Close deal checkout" onClick={() => setDealCheckout(null)} className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute left-1/2 top-1/2 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="border-b border-orange-100 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Deal Checkout</p>
                  <h3 className="mt-2 text-2xl font-black text-slate-950">{dealCheckout.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Fixed offer: {dealCheckout.productName} · {sizeLabels[dealCheckout.size]}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDealCheckout(null)}
                  className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-orange-300 hover:text-orange-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="space-y-4">
                <div className="relative h-64 overflow-hidden rounded-[1.5rem]">
                  <Image src={dealCheckout.heroImage} alt={dealCheckout.title} fill className="object-cover" sizes="320px" />
                </div>
                <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Order details</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <div className="flex items-center justify-between">
                      <span>Product</span>
                      <span className="font-semibold">{dealCheckout.productName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Size</span>
                      <span className="font-semibold">{sizeLabels[dealCheckout.size]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deal price</span>
                      <span className="font-semibold text-orange-600">{formatCurrency(dealCheckout.dealPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Original price</span>
                      <span className="font-semibold line-through text-slate-400">{formatCurrency(dealCheckout.originalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>You save</span>
                      <span className="font-semibold text-slate-950">{formatCurrency(dealSavings(dealCheckout))}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="deal-quantity" className="mb-2 block text-sm font-semibold text-slate-700">Quantity</label>
                  <div className="flex items-center justify-between rounded-[1.3rem] border border-orange-200 bg-white px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setDealQuantity((current) => Math.max(1, current - 1))}
                      className="rounded-full bg-orange-50 p-2 text-orange-600 transition hover:bg-orange-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="text-center">
                      <p id="deal-quantity" className="text-2xl font-black text-slate-950">{dealQuantity}</p>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Max {dealCheckout.maxQuantity}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDealQuantity((current) => Math.min(dealCheckout.maxQuantity, current + 1))}
                      className="rounded-full bg-orange-50 p-2 text-orange-600 transition hover:bg-orange-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="deal-name" className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
                  <input
                    id="deal-name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-[1.3rem] border border-orange-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label htmlFor="deal-phone" className="mb-2 block text-sm font-semibold text-slate-700">Phone</label>
                  <input
                    id="deal-phone"
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                    placeholder="0803 123 4567"
                    className="w-full rounded-[1.3rem] border border-orange-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                  />
                </div>

                <div>
                  <label htmlFor="deal-address" className="mb-2 block text-sm font-semibold text-slate-700">Address</label>
                  <textarea
                    id="deal-address"
                    value={customerAddress}
                    onChange={(event) => setCustomerAddress(event.target.value)}
                    placeholder="House number, street, area"
                    rows={4}
                    className="w-full rounded-[1.3rem] border border-orange-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                  />
                </div>

                <div className="rounded-[1.4rem] bg-slate-950 px-5 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Total</p>
                    <p className="text-3xl font-black">{formatCurrency(dealCheckout.dealPrice * dealQuantity)}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={submitDealOrder}
                  disabled={!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()}
                  className="w-full rounded-[1.3rem] bg-orange-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Proceed with order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {cartOpen ? (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="absolute inset-0 bg-slate-950/55" />
          <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-orange-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Your order</p>
                  <h3 className="text-lg font-black text-slate-950">Cart</h3>
                </div>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-orange-300 hover:text-orange-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {!cart.length ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="rounded-full bg-orange-50 p-5">
                  <ShoppingBag className="h-8 w-8 text-orange-500" />
                </div>
                <p className="mt-5 text-2xl font-black text-slate-950">Your cart is empty</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">Pick a shawarma, switch a size, then come back here to review it.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-6">
                  {cart.map((item) => (
                    <div key={lineId(item.id, item.size)} className="flex gap-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/60 p-3">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[1.1rem] bg-white">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-sm font-black text-slate-950">{item.name}</p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                            {sizeLabels[item.size]} · {formatCurrency(item.price)}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full bg-white p-1">
                            <button type="button" onClick={() => removeFromCart(item.id, item.size)} className="rounded-full p-2 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-5 text-center text-sm font-black text-slate-950">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const source = allItems.find((entry) => entry.id === item.id);
                                if (source) {
                                  addToCart(source, item.size);
                                }
                              }}
                              className="rounded-full p-2 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className="text-sm font-black text-slate-950">{formatCurrency(item.quantity * item.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-orange-100 bg-orange-50/60 p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Subtotal</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Delivery</span>
                      <span>To confirm</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-orange-100 pt-3 text-lg font-black text-slate-950">
                      <span>Total</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/2347041249727?text=${encodeURIComponent(
                      [
                        "Hello, I want to order:",
                        "",
                        ...cart.map((item) => `- ${item.name} (${sizeLabels[item.size]}) x${item.quantity}`),
                        "",
                        `Total: ${formatCurrency(cartTotal)}`,
                      ].join("\n"),
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 rounded-[1.35rem] bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Send order to WhatsApp
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>
      ) : null}
    </main>
  );
}
