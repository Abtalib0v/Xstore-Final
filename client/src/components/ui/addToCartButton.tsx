"use client";

import DrawerSection from "@/app/(main)/Drawer";
import { useCart } from "@/app/Providers/CardProviders";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function AddToCartButton({ id, name, price, imageUrl }: Props) {
  const { addToCart } = useCart();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<any>(null);

  const handleAddCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    addToCart({ _id: id, name, price, imageUrl });
    setSelectProduct({ id, name, price, imageUrl });
    setOpenDrawer(true);
  };

  return (
    <div>
      <Button
      
        onClick={handleAddCard}
        variant="outline"
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Add to Cart
      </Button>
      {openDrawer && selectProduct && (
        <DrawerSection
          open={openDrawer}
          setOpen={setOpenDrawer}
          product={selectProduct}
        >
          <div className="p-[20px]">
            <h1 className="text-[16px] text-[#121212] font-medium">
              Item added to your cart
            </h1>
            <div className="flex gap-[30px] px-[20px]">
              <div>
                <img
                  className="w-[120px]"
                  src={selectProduct.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="font-bold text-[#121212bf] text-[16px]">
                  {selectProduct.name}
                </div>
                <div>${selectProduct.price}</div>
              </div>
            </div>
          </div>
        </DrawerSection>
      )}
    </div>
  );
}
