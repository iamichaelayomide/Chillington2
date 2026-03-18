"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  Clock3,
  Facebook,
  Flame,
  Instagram,
  Menu,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
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

type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  location: string;
  note: string;
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, MenuSize>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeMenuSection, setActiveMenuSection] = useState("premium");
  const [cartStep, setCartStep] = useState<"review" | "details">("review");
  const [cartMessage, setCartMessage] = useState("");
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    location: "",
    note: "",
  });
  const [customerErrors, setCustomerErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

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

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    setCartStep("review");
  }, [cartOpen]);

  useEffect(() => {
    if (!cartMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCartMessage(""), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [cartMessage]);

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

    setCartMessage(`${item.name} added to cart`);
  }

  function increaseCartItem(itemId: string, size: MenuSize) {
    setCart((current) =>
      current.map((entry) =>
        lineId(entry.id, entry.size) === lineId(itemId, size) ? { ...entry, quantity: entry.quantity + 1 } : entry,
      ),
    );
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

  function deleteFromCart(itemId: string, size: MenuSize) {
    setCart((current) => current.filter((entry) => lineId(entry.id, entry.size) !== lineId(itemId, size)));
  }

  function updateCustomerDetail(field: keyof CustomerDetails, value: string) {
    setCustomerDetails((current) => ({ ...current, [field]: value }));
    setCustomerErrors((current) => ({ ...current, [field]: "" }));
  }

  function validateCustomerDetails() {
    const nextErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (customerDetails.name.trim().length < 2) {
      nextErrors.name = "Enter a valid name.";
    }

    if (!customerDetails.email.trim() || !customerDetails.email.includes("@")) {
      nextErrors.email = "Enter a valid email.";
    }

    if (customerDetails.phone.trim().length < 10) {
      nextErrors.phone = "Enter a reachable phone number.";
    }

    if (customerDetails.location.trim().length < 5) {
      nextErrors.location = "Enter your delivery location.";
    }

    setCustomerErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function continueToOrder() {
    setCartStep("details");
  }

  function openWhatsAppOrder() {
    if (!validateCustomerDetails()) {
      return;
    }

    const message = [
      "Hello, I want to order:",
      "",
      `Name: ${customerDetails.name}`,
      `Email: ${customerDetails.email}`,
      `Phone: ${customerDetails.phone}`,
      `Location: ${customerDetails.location}`,
      customerDetails.note ? `Note: ${customerDetails.note}` : null,
      "",
      "Order details:",
      ...cart.map((item) => `- ${item.name} (${sizeLabels[item.size]}) x${item.quantity} - ${formatCurrency(item.quantity * item.price)}`),
      "",
      `Total: ${formatCurrency(cartTotal)}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/2347032891651?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-[#edf2f7] text-neutral-900">
      {cartMessage ? (
        <div className="fixed bottom-5 right-4 z-[70] pointer-events-none sm:bottom-6 sm:right-6">
          <div className="max-w-[18rem] rounded-[1.4rem] border border-green-200 bg-white px-5 py-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Check className="h-4 w-4" />
            </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">Added to cart</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{cartMessage}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
            <Link href="/deals" className="border-b-2 border-transparent pb-1 transition hover:border-orange-300 hover:text-orange-500">Deals</Link>
            <a href="#about" className="border-b-2 border-transparent pb-1 transition hover:border-orange-300 hover:text-orange-500">About</a>
            <a href="#footer" className="border-b-2 border-transparent pb-1 transition hover:border-orange-300 hover:text-orange-500">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition hover:border-orange-300 hover:text-orange-600 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:border-orange-300 hover:text-orange-600"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-orange-500 px-1.5 py-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

      </header>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileNavOpen(false)}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
          />
          <aside className="absolute inset-x-4 top-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-500">Navigation</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">Browse the site on mobile</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-300 hover:text-orange-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {[
                { href: "#menu", label: "Shop now" },
                { href: "/deals", label: "Deals", link: true },
                { href: "#about", label: "About" },
                { href: "#footer", label: "Contact" },
              ].map((item) =>
                item.link ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>

            <div className="mt-4 grid gap-2">
              <Link
                href="/deals/jumbo-chicken-rush"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-[1.2rem] bg-orange-500 px-4 py-4 text-center text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                Buy live deal
              </Link>
              <a
                href="https://wa.me/2347032891651"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-[1.2rem] border border-green-200 bg-green-50 px-4 py-4 text-center text-sm font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100"
              >
                Contact us
              </a>
            </div>
          </aside>
        </div>
      ) : null}

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
              <Link
                href="/deals/jumbo-chicken-rush"
                className="rounded-[1.35rem] border border-green-200 bg-green-50 px-6 py-4 text-base font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100"
              >
                Buy live deal
              </Link>
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
                <p className="text-2xl font-black text-slate-950">Fast</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">WhatsApp flow</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Live deal</p>
                  <p className="mt-2 text-lg font-black text-slate-950">Buy 1, get 1 drink</p>
                  <p className="mt-1 text-sm text-slate-600">Tap through to the deals page and order the active offer.</p>
                </div>
                <Link
                  href="/deals"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-orange-50"
                >
                  View deals
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#120d0a] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
            <Image src="/images/food/platter.jpg" alt="Large platter of shawarma, fries and dips" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex justify-between gap-3">
              <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
                Rich flavour
              </div>
              <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
                Live deals
              </div>
            </div>
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
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b1512] shadow-[0_25px_60px_rgba(0,0,0,0.4)] sm:min-h-[440px] lg:min-h-[520px]">
            <Image
              src="/images/food/platter.jpg"
              alt="Shawarma platter with fries"
              fill
              className="object-cover saturate-[1.18] contrast-[1.06]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-300">About Us</p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Pharm. Joseph
              <br />
              <span className="text-orange-400">Chillington&apos;s</span>
              <br />
              signature recipe.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
              Chillington Bites keeps it simple: proper shawarma, generous fillings, clean prep, and fast ordering for Akure customers who already know what good wraps should taste like.
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
                Fresh wraps, fast WhatsApp ordering, and a cleaner storefront built around what people actually come for.
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
              <h3 className="text-sm font-black uppercase tracking-[0.22em] text-white">Quick Order</h3>
              <p className="mt-6 text-sm leading-7 text-white/58">Need to confirm delivery, ask a question, or place a direct order? Reach out on WhatsApp.</p>
              <a
                href="https://wa.me/2347032891651"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-[1.35rem] bg-emerald-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                <ShoppingBag className="h-4 w-4" />
                Contact us
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white/35 md:flex-row">
            <p>&copy; 2026 Chillington Bites.</p>
            <p>Local V2 route ready for testing.</p>
          </div>
        </div>
      </footer>

      {cartCount ? (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-3 rounded-full bg-white px-5 py-4 text-sm font-bold text-[#110b08] shadow-[0_18px_50px_rgba(0,0,0,0.45)] lg:hidden"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{cartCount}</span>
          <span>{formatCurrency(cartTotal)}</span>
        </button>
      ) : null}

      {cartOpen ? (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/70" />
          <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col border-l border-orange-100 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-orange-100 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center gap-3">
                {cartStep === "details" ? (
                  <button
                    type="button"
                    onClick={() => setCartStep("review")}
                    className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-orange-300 hover:text-orange-600"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </button>
                ) : (
                  <ShoppingBag className="h-5 w-5 text-orange-500" />
                )}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Your order</p>
                  <h3 className="text-base font-black text-slate-950 sm:text-lg">{cartStep === "review" ? "Review your cart" : "Delivery details"}</h3>
                </div>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-orange-300 hover:text-orange-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {!cart.length ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-8">
                <div className="rounded-full bg-orange-50 p-5">
                  <ShoppingBag className="h-8 w-8 text-orange-500" />
                </div>
                <p className="mt-5 text-2xl font-black text-slate-950">Your cart is empty</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">Pick a shawarma, switch a size, then come back here to review it.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
                  {cartStep === "review" ? (
                    <>
                  {cart.map((item) => (
                    <div key={lineId(item.id, item.size)} className="flex gap-3 rounded-[1.35rem] border border-orange-100 bg-orange-50/60 p-3 sm:gap-4 sm:rounded-[1.5rem]">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-[1rem] bg-white sm:h-20 sm:w-20 sm:rounded-[1.1rem]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-black text-slate-950">{item.name}</p>
                            <button
                              type="button"
                              onClick={() => deleteFromCart(item.id, item.size)}
                              className="rounded-full p-1.5 text-slate-400 transition hover:bg-white hover:text-red-500"
                              aria-label={`Delete ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 sm:text-xs">
                            {sizeLabels[item.size]} / {formatCurrency(item.price)}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 rounded-full bg-white p-1">
                            <button type="button" onClick={() => removeFromCart(item.id, item.size)} className="rounded-full p-2 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-5 text-center text-sm font-black text-slate-950">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => increaseCartItem(item.id, item.size)}
                              className="rounded-full p-2 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className="text-sm font-black text-slate-950 sm:text-base">{formatCurrency(item.quantity * item.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4 sm:rounded-[1.5rem]">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Review your order</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Adjust quantity, delete any item you do not want, then continue to the next screen for delivery details.</p>
                  </div>
                    </>
                  ) : (
                    <>
                  <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4 sm:rounded-[1.5rem]">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Order summary</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      {cart.map((item) => (
                        <div key={`summary-${lineId(item.id, item.size)}`} className="flex items-center justify-between gap-3">
                          <span>{item.name} ({sizeLabels[item.size]}) x{item.quantity}</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(item.quantity * item.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.35rem] border border-orange-100 bg-orange-50/60 p-4 sm:rounded-[1.5rem]">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Customer details</p>
                      <p className="mt-2 text-sm text-slate-600">Enter your details before sending the order to customer care.</p>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Full name</span>
                      <input
                        value={customerDetails.name}
                        onChange={(event) => updateCustomerDetail("name", event.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 sm:rounded-[1.2rem] sm:py-4"
                      />
                      {customerErrors.name ? <p className="mt-2 text-xs font-semibold text-red-500">{customerErrors.name}</p> : null}
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Email</span>
                      <input
                        value={customerDetails.email}
                        onChange={(event) => updateCustomerDetail("email", event.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 sm:rounded-[1.2rem] sm:py-4"
                      />
                      {customerErrors.email ? <p className="mt-2 text-xs font-semibold text-red-500">{customerErrors.email}</p> : null}
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Phone</span>
                      <input
                        value={customerDetails.phone}
                        onChange={(event) => updateCustomerDetail("phone", event.target.value)}
                        placeholder="0800 000 0000"
                        className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 sm:rounded-[1.2rem] sm:py-4"
                      />
                      {customerErrors.phone ? <p className="mt-2 text-xs font-semibold text-red-500">{customerErrors.phone}</p> : null}
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Location / address</span>
                      <textarea
                        value={customerDetails.location}
                        onChange={(event) => updateCustomerDetail("location", event.target.value)}
                        placeholder="Delivery address in Akure"
                        rows={3}
                        className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 sm:rounded-[1.2rem] sm:py-4"
                      />
                      {customerErrors.location ? <p className="mt-2 text-xs font-semibold text-red-500">{customerErrors.location}</p> : null}
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Extra note</span>
                      <textarea
                        value={customerDetails.note}
                        onChange={(event) => updateCustomerDetail("note", event.target.value)}
                        placeholder="Optional note for delivery or spice preference"
                        rows={2}
                        className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-400 sm:rounded-[1.2rem] sm:py-4"
                      />
                    </label>

                  </div>
                    </>
                  )}
                </div>

                <div className="border-t border-orange-100 bg-orange-50/60 p-4 sm:p-6">
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

                  <div className="mt-5 grid gap-3">
                    {cartStep === "review" ? (
                      <button
                        type="button"
                        onClick={continueToOrder}
                        className="flex w-full items-center justify-center gap-2 rounded-[1.2rem] bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 sm:rounded-[1.35rem]"
                      >
                        Continue with order
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={openWhatsAppOrder}
                        className="flex w-full items-center justify-center gap-2 rounded-[1.2rem] bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:rounded-[1.35rem]"
                      >
                        Send message to WhatsApp
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      ) : null}
    </main>
  );
}




