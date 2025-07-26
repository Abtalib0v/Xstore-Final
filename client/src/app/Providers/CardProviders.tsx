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

const addToCart = (item: any) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(
      (cartItem) => cartItem.id === item._id
    );

    if (existingItem) {
      return prevCart.map((cartItem) =>
        cartItem.id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }

    // item._id varsa onu id olarak ata
    return [...prevCart, { ...item, id: item._id, quantity: 1 }];
  });
};


const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId));
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
