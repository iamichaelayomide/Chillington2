"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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

type Testimonial = {
  id: string;
  name: string;
  location: string;
  order: string;
  quote: string;
  accent: string;
};

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


function formatCurrency(value: number) {
  return `N${value.toLocaleString("en-NG")}`;
}


function lineId(itemId: string, size: MenuSize) {
  return `${itemId}:${size}`;
}

function firstSize(item: MenuItem) {
  return (Object.keys(item.prices)[0] ?? "regular") as MenuSize;
}

export function ChillingtonShowcase() {
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, MenuSize>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeMenuSection, setActiveMenuSection] = useState("premium");

  const allItems = useMemo(() => [...premiumTreats, ...comboTreats, ...classicTreats], []);

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matches = (item: MenuItem) => !normalized || item.name.toLowerCase().includes(normalized);

    return [
      {
        id: "premium",
        label: "Premium Treats",
        description: "Single-protein wraps and signature crowd favourites.",
        items: premiumTreats.filter(matches),
      },
      {
        id: "combo",
        label: "Combo Treats",
        description: "Double-protein combinations for heavier cravings.",
        items: comboTreats.filter(matches),
      },
      {
        id: "classic",
        label: "Classic Treats",
        description: "House specials, minis, and lighter options.",
        items: classicTreats.filter(matches),
      },
    ].filter((section) => section.items.length > 0);
  }, [query]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  useEffect(() => {
    const sectionIds = ["premium", "combo", "classic", "extras"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const updateActiveSection = () => {
      const marker = window.scrollY + 180;
      let current = sections[0]?.id ?? "premium";

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveMenuSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [filteredSections.length]);

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

  return (
    <main className="min-h-screen bg-[#edf2f7] text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#edf2f7]/95 backdrop-blur">
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
            <a href="/deals" className="transition hover:text-orange-500">Deals</a>
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
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
                className="rounded-[1.35rem] border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-800 transition hover:border-orange-300 hover:text-orange-600"
              >
                Contact us
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] bg-slate-100 p-4">
                <p className="text-2xl font-black text-slate-950">7+</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Proteins</p>
              </div>
              <div className="rounded-[1.4rem] bg-slate-100 p-4">
                <p className="text-2xl font-black text-slate-950">6</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Combo builds</p>
              </div>
              <div className="rounded-[1.4rem] bg-slate-100 p-4">
                <p className="text-2xl font-black text-slate-950">100%</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Local assets</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <span className="rounded-full bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-orange-700">
                Fast delivery
              </span>
              <span className="rounded-full bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-orange-700">
                Freshly made
              </span>
              <span className="rounded-full bg-white px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-orange-700">
                Akure orders daily
              </span>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950">
            <Image src="/images/food/platter.jpg" alt="Large platter of shawarma, fries and dips" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="max-w-md rounded-[1.6rem] border border-white/10 bg-black/35 p-5 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Signature Stack</p>
                <h2 className="mt-3 text-3xl font-black text-white">Chicken jumbo with extra cream.</h2>
                <p className="mt-3 text-sm leading-6 text-orange-50/90">Big wrap, loaded filling, proper heat, and the kind of finish that keeps people ordering again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-600">Menu</p>
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Organized for quick ordering</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Browse by section, compare sizes inside each card, and move from premium wraps to combos and classics without losing your place.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex flex-wrap gap-3 lg:hidden">
              {[
                { href: "#premium", label: "Premium" },
                { href: "#combo", label: "Combo" },
                { href: "#classic", label: "Classic" },
                { href: "#extras", label: "Extras" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-400 hover:text-orange-600"
                >
                  {link.label}
                </a>
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

          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
            <aside className="hidden lg:sticky lg:top-24 lg:block">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Browse menu</p>
                <div className="mt-4 space-y-2">
                  {[
                    { href: "#premium", label: "Premium Treats", note: "Signature proteins" },
                    { href: "#combo", label: "Combo Treats", note: "Double-protein picks" },
                    { href: "#classic", label: "Classic Treats", note: "House specials and minis" },
                    { href: "#extras", label: "Extras", note: "Wrap add-ons" },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`block rounded-[1.2rem] border px-4 py-3 transition ${
                        activeMenuSection === link.href.slice(1)
                          ? "border-orange-300 bg-orange-50"
                          : "border-slate-200 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      <p className={`text-sm font-semibold ${activeMenuSection === link.href.slice(1) ? "text-orange-700" : "text-slate-900"}`}>{link.label}</p>
                      <p className="mt-1 text-xs text-slate-500">{link.note}</p>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-8">
              {filteredSections.map((section) => (
                <div key={section.id} id={section.id} className="space-y-4">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">{section.label}</p>
                      <p className="mt-2 text-sm text-slate-600">{section.description}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
                      {section.items.length} items
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {section.items.map((item) => {
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
                            <h3 className="text-base font-bold text-neutral-900">{item.name}</h3>

                            {sizes.length > 1 ? (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {sizes.map((size) => (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedSize(item.id, size)}
                                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest transition-all ${
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
                                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-slate-800"
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
                </div>
              ))}

              {!filteredSections.length ? (
                <div className="rounded-[2rem] border border-dashed border-orange-200 bg-white px-6 py-16 text-center">
                  <p className="text-2xl font-black text-slate-900">Nothing matches that search yet.</p>
                  <p className="mt-2 text-sm text-slate-600">Try another keyword or jump back to all menu groups.</p>
                </div>
              ) : null}

              <div id="extras" className="rounded-[2rem] border border-orange-200 bg-white p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Extras</p>
                    <h3 className="mt-2 text-2xl font-black text-slate-950">Customise your wrap</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                  {extras.map((extra) => (
                    <div key={extra.id} className="rounded-[1.4rem] border border-orange-100 bg-orange-50 px-4 py-5 text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-700">{extra.name}</p>
                      <p className="mt-3 text-lg font-black text-orange-600">{formatCurrency(extra.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-orange-100 bg-[#fffaf4] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-600">Testimonials</p>
            <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Swipe through what people say after the first bite</h2>
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
                    <p className="text-lg font-semibold text-slate-950">{testimonial.name}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{testimonial.location}</p>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-orange-700">
                    Verified order
                  </div>
                </div>

                <p className="mt-6 text-xl font-medium leading-9 text-slate-950">&ldquo;{testimonial.quote}&rdquo;</p>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200/70 pt-5">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">Ordered</p>
                    <p className="mt-2 text-sm font-medium text-slate-700">{testimonial.order}</p>
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
          <div className="overflow-hidden rounded-[2rem] bg-[#1e293b]">
            <Image src="/images/food/platter.jpg" alt="Shawarma platter with fries" width={1000} height={1180} className="h-full w-full object-cover" />
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
              <p className="mt-6 text-sm leading-7 text-slate-600">Need to confirm delivery, ask a question, or place a direct order? Reach out on WhatsApp.</p>
              <a
                href="https://wa.me/2347041249727"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-[1.35rem] bg-green-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                <ShoppingBag className="h-4 w-4" />
                Contact us
              </a>
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


