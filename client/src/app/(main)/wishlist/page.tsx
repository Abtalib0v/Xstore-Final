"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/app/_Providers/WishlistProvider";
import { useCart } from "@/app/_Providers/CardProviders";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    items.forEach((p) =>
      addToCart({ _id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, quantity: 1 })
    );
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 mb-6">No products in your wishlist.</p>
          <Link href="/shop" className="rounded-full px-6 py-2 bg-[#2a74ed] text-white">Return To Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Wishlist ({items.length})</h1>
        <div className="flex gap-3">
          <Button onClick={handleAddAllToCart} className="bg-[#2a74ed] hover:bg-[#000000] text-white rounded-full">Add all to Cart</Button>
          <Button onClick={clear} className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full">Clear All</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 flex flex-col gap-4">
            <Image src={p.imageUrl} alt={p.name} width={320} height={220} className="w-full h-48 object-cover rounded-md" />
            <div className="flex-1">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600">${p.price}</div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => addToCart({ _id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, quantity: 1 })}
                className="bg-[#2a74ed] hover:bg-[#000] text-white rounded-full"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => remove(p.id)}
                className="bg-transparent text-[#222] shadow-none hover:bg-gray-100 rounded-full"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
