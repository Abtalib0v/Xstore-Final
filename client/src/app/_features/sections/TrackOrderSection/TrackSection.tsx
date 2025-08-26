"use client";
import { useCart } from "@/app/_Providers/CardProviders";
import React, { useState } from "react";

const TrackSection: React.FC = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState<any | null>(undefined);
  const [result, setResult] = useState<any | null>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, email }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setEmail(data.email || "");
      } else {
        setResult(null);
        console.error(data.error);}
    } catch (err) {
      console.error("Fetch error:", err);
      setResult(null);
    }
  };
const {truncateText } = useCart();
  return (
    <div
      className="bg-cover bg-top px-4 md:px-0  mb-[100px]"
      style={{
        backgroundImage:
          "url('https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/04_Form.jpeg')",
      }}
    >
      <div className="w-full pt-[3%] mb-[6%] mx-auto max-w-[928px] text-center rounded-2xl pb-[101.6px]">
        <h1 className="text-[40px] font-medium mb-2">Track Order</h1>
        <p className=" text-[#444444] mb-[20px] text-[18px]">
          To track your order please enter your Order ID in the box below and
          press the "Track" button. This was given to you on your receipt and in
          the confirmation email you should have received.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" mb-[1.43rem]">
            <h1 className="text-[18px] text-[#444444]">Order ID</h1>
            <input
              type="text"
              placeholder="Found in your order confirmation email."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-4 py-1 border focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <div className=" mb-[1.43rem]">
            <h1 className="text-[18px] text-[#444444]">Billing email</h1>
            <input
              type="email"
              placeholder="Email you used during checkout."
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-1 border focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <div className=" mb-[1.43rem]">
            <button
              type="submit"
              className=" bg-black px-[2.2rem] py-2 text-white font-medium rounded-full hover:bg-gray-800 transition"
            >
              Track
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 text-left bg-white p-4 rounded-lg shadow max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2">
              Order Status: {result.status}
            </h2>
            {result.products ? (
              <ul className="space-y-2">
                {result.products.map((p: any, idx: number) => (
                  <li key={idx} className="border p-2 rounded flex">
                    <img
                      src={p.image}
                      width={50}
                      height={50}
                      className=""
                      alt=""
                    />
                    <div>
                       {truncateText(p.name, 40)}
                    <div>({p.quantity} adet) — {p.price}$ </div>
                    </div>
                    
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found</p>
            )}
          </div>
        )}
        {result === null && (
          <p className="mt-6 text-red-500">Order not found</p>
        )}
      </div>
    </div>
  );
};

export default TrackSection;
