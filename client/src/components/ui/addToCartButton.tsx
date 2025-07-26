"use client";

import { useCart } from "@/app/Providers/CardProviders";
import { Button } from "@/components/ui/button";

type Props = {
  item: any;
};

export default function AddToCartButton({ item }: Props) {
  const { addToCart } = useCart();
  const handleAdd = () => {
    addToCart(item);
  };

  return (
    <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white">
      Add to Cart
    </Button>
  );
}
