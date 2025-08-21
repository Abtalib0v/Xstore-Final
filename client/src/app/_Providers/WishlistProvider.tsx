"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

type Ctx = {
  items: WishlistItem[];
  isInWishlist: (id: string) => boolean;
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  toggle: (item: WishlistItem) => void;
  clear: () => void;
};

const WishlistContext = createContext<Ctx | null>(null);

const getUserKey = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const u = JSON.parse(raw);
    const uid = u?._id || u?.id || u?.email || null;
    return uid ? `wishlist:${uid}` : null;
  } catch {
    return null;
  }
};

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    if (typeof window === "undefined") return [];
    const key = getUserKey();
    if (!key) return [];
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = getUserKey();
    if (key) localStorage.setItem(key, JSON.stringify(items));
  }, [items]);

  const isInWishlist = (id: string) => items.some(i => i.id === id);

  const add = (item: WishlistItem) => {
    if (typeof window === "undefined") return;
    const hasUser = !!localStorage.getItem("user");
    if (!hasUser) {
      console.warn("Please login/register to use wishlist.");
      return;
    }
    setItems(prev => (prev.some(i => i.id === item.id) ? prev : [...prev, item]));
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const toggle = (item: WishlistItem) => {
    if (typeof window === "undefined") return;
    const hasUser = !!localStorage.getItem("user");
    if (!hasUser) {
      console.warn("Please login/register to use wishlist.");
      return;
    }
    setItems(prev => (prev.some(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item]));
  };

  const clear = () => setItems([]);

  const value = useMemo(
    () => ({ items, isInWishlist, add, remove, toggle, clear }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};
