"use client";

import { useState } from "react";
import QuickShop from "@/app/_common/QuickShop";
import { Button } from "@/components/ui/button";

export type QuickShopProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;
};

type Props = QuickShopProduct & {
  buttonText?: string;
  className?: string;
};

export default function QuickShopButton({ id, name, price, imageUrl, quantity = 1, buttonText = "Quick Shop", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<QuickShopProduct | null>(null);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setProduct({ id, name, price, imageUrl, quantity });
    setOpen(true);
  };

  return (
    <div className="w-full flex">
      <Button onClick={onClick} className={className || "bg-[#000000] flex text-white py-[23px] w-full px-[22px] rounded-full text-[18px] font-medium"}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 8.592v0c-4.728-4.704-12.384-4.704-17.088 0l-3.384 3.36 3.456 3.456c2.28 2.28 5.328 3.552 8.568 3.552s6.288-1.248 8.568-3.552l3.312-3.36-3.432-3.456zM12 8.376c1.992 0 3.624 1.632 3.624 3.624s-1.632 3.624-3.624 3.624-3.624-1.608-3.624-3.624 1.632-3.624 3.624-3.624zM6.528 12c0 2.040 1.128 3.816 2.784 4.752-1.68-0.456-3.264-1.32-4.56-2.64l-2.16-2.184 2.136-2.136c1.392-1.392 3.072-2.28 4.848-2.712-1.8 0.912-3.048 2.784-3.048 4.92zM17.472 12c0-2.136-1.248-4.008-3.048-4.896 1.776 0.432 3.456 1.344 4.848 2.712l2.16 2.184-2.136 2.136c-1.344 1.32-2.952 2.208-4.656 2.664 1.68-0.936 2.832-2.736 2.832-4.8z"></path>
            </svg>
            {buttonText}
      </Button>
      {open && (
        <QuickShop open={open} setOpen={setOpen} product={product} />
      )}
    </div>
  );
}
