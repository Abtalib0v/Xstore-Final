"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>(null);
export const CardProvider = ({children}: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<any[]>(() => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
});


useEffect(() => {

    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}, [cart]);

const addToCart = (item:any) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(cartItem => cartItem.id === item._id);

    if (existingItem) {
      // zaten varsa üzerine ekle
      return prevCart.map(cartItem =>
        cartItem.id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
          : cartItem
      );
    }

    // yoksa yeni ekle
    return [...prevCart, { ...item, id: item._id, quantity: item.quantity || 1 }];
  });
};


const truncateText = (text: string, maxLength = 40) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};



const removeFromCart = (id: string) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === id);

    if (!existingItem) return prevCart;

    // Əgər say 1-dən böyükdürsə, quantity-ni azaldır
    if (existingItem.quantity > 1) {
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }

    // Əks halda tam silir
    return prevCart.filter((item) => item.id !== id);
  });
};

const clearCart = () => {
    setCart([]);
};
const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const getCartItems = () => {
  return cart.map((item) => ({
    ...item,
    totalPrice: item.price * item.quantity,
  }));
};

  const getCartSummary = () => {
    return {
      totalItems: getTotalItems(),
      totalPrice: getTotalPrice(),
      items: getCartItems(),
    };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getCartItems,
        getCartSummary,
        truncateText,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
