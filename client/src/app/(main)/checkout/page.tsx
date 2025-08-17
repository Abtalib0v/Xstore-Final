"use client";

import { useCart } from "@/app/_Providers/CardProviders";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { getCartItems, getTotalPrice } = useCart();
  const cartItems = getCartItems();
  const totalAmount = getTotalPrice();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const handleCheckout = async () => {
    if (!user || !user._id) {
      setError("Zəhmət olmasa, əvvəlcə daxil olun.");
      return;
    }
    if (!cartItems.length) {
      setError("Səbət boşdur.");
      return;
    }

    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe yüklenmedi");

      const response = await fetch("/api/checkout-sessions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cartItems.map((item:any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.imageUrl,
          })),
          returnUrl: window.location.origin,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });

      if (result.error) throw new Error(result.error.message);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-xl py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Səbət boşdur.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map((item:any) => (
              <li key={item.id} className="flex justify-between border-b py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold mb-4">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          {error && <div className="text-red-600 mb-2">{error}</div>}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Yönlendiriliyor..." : "Sifarişi Tamamla"}
          </button>
        </>
      )}
    </div>
  );
}
