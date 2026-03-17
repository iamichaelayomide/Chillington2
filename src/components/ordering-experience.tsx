"use client";

import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { ProductCard } from "@/components/menu/product-card";
import { ProductModal } from "@/components/menu/product-modal";
import { PromoBanner } from "@/components/sections/promo-banner";
import { formatCurrency } from "@/lib/format";
import { getCartTotals, useCartStore } from "@/store/cart-store";
import type { Deal, Extra, Product, ProductCategory, Promotion } from "@/types/domain";

export function OrderingExperience({
  products,
  extras,
  promotion,
  claimedDeal,
}: {
  products: Product[];
  extras: Extra[];
  promotion: Promotion | null;
  claimedDeal?: Deal | null;
}) {
  const initialProduct = claimedDeal ? products.find((product) => product.id === claimedDeal.product_id) ?? null : null;
  const initialCategory = initialProduct?.category ?? "Chicken";
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProduct);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const items = useCartStore((state) => state.items);

  const visibleProducts = useMemo(
    () => products.filter((product) => product.category === activeCategory && product.is_available),
    [activeCategory, products],
  );
  const totals = getCartTotals(items);

  return (
    <>
      <PromoBanner promotion={promotion} />
      <section id="menu" className="px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">Menu</p>
              <h2 className="font-heading text-3xl font-black text-slate-900 sm:text-4xl">
                Built for fast cravings and messy first bites
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Browse by protein, open a product, choose your size, add extras and keep the cart live while you order.
              </p>
            </div>
            <button
              type="button"
              onClick={openDrawer}
              className="flex w-full items-center justify-between rounded-[1.5rem] border border-white/10 bg-[#121212] px-5 py-4 text-left shadow-[0_20px_45px_rgba(0,0,0,0.22)]"
            >
              <span className="flex items-center gap-3">
                <span className="rounded-full bg-orange-500 p-3 text-white">
                  <ShoppingBag className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Open cart</span>
                  <span className="text-sm font-semibold text-white">{totals.quantity} item(s)</span>
                </span>
              </span>
              <span className="font-heading text-2xl font-black text-white">{formatCurrency(totals.total)}</span>
            </button>
            {claimedDeal ? (
              <div className="rounded-[1.5rem] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(19,66,45,0.96),rgba(12,18,15,0.98))] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100/80">Claimed deal</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <p className="font-heading text-2xl font-black text-white">{claimedDeal.title}</p>
                  <span className="rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                    Max {claimedDeal.max_quantity}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/85">
                  This claim is locked to {claimedDeal.product_name} ({claimedDeal.size}) at {formatCurrency(claimedDeal.deal_price)}.
                  You can add up to {claimedDeal.max_quantity} before checkout.
                </p>
              </div>
            ) : null}
            <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />
            {visibleProducts.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-orange-200 bg-white px-6 py-16 text-center">
                <p className="font-heading text-2xl font-black text-slate-900">Nothing live in {activeCategory} yet.</p>
                <p className="mt-2 text-sm text-slate-600">Check another category or publish products from the admin panel.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onOpen={setSelectedProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <ProductModal
        key={`${selectedProduct?.id ?? "product-modal"}:${claimedDeal?.slug ?? "standard"}`}
        product={selectedProduct}
        extras={extras.filter((extra) => extra.is_active)}
        claimedDeal={claimedDeal}
        onClose={() => setSelectedProduct(null)}
      />
      <CartDrawer />
    </>
  );
}
