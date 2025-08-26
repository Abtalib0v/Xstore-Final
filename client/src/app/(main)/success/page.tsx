"use client";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const [orderId, setOrderId] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");
      if (!sessionId) return;

      try {
        const res = await fetch("/api/track-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: sessionId }),
        });

        const data = await res.json();
        if (res.ok) {
          setOrderId(sessionId);
          setProducts(data.products || []);
          setStatus(data.status);
          setEmail(data.email || "");
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-3xl p-12 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold text-green-600">
          Payment Successful!
        </h1>

        {orderId ? (
          <>
            <p className="mb-2 text-lg text-gray-700">Order ID: <strong>{orderId}</strong></p>
            <p className="mb-4 text-lg text-gray-700">Status: {status}</p>
            <p className="mb-4 text-lg text-gray-700">Email: {email}</p>

            <ul className="mb-8">
              {products.map((p, idx) => (
                <li key={idx} className="flex items-center mb-2 text-gray-700">
                  {p.image && (
                    <img src={p.image} alt={p.name} className="w-16 h-16 mr-4 object-cover" />
                  )}
                  <span>
                    {p.name} — {p.quantity} adet — ${p.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mb-8 text-xl text-gray-700">Loading your order details...</p>
        )}

        <div className="mt-12">
          <a
            href="/track-order"
            className="inline-block px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
