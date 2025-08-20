"use client";

import DrawerSection from "@/app/_common/Drawer";
import { useCart } from "@/app/_Providers/CardProviders";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity?: number;
};

export default function AddToCartButton({ id, name, price, imageUrl, quantity=1 }: Props) {
  const { addToCart } = useCart();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<any>(null);

  const handleAddCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    addToCart({ _id: id, name, price, imageUrl, quantity });
    setSelectProduct({ id, name, price, imageUrl, quantity });
    setOpenDrawer(true);
  };

  return (
    <div>
      <Button
      
        onClick={handleAddCard}
        
        className="bg-[#2a74ed] hover:bg-[#000000] text-white py-[22px] hover:text-white px-[30px] rounded-[50px] text-[16px] font-semibold"
      >
        <h1 className="flex items-center gap-2 ">
                  Add to Cart

        </h1>
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
                <Image
                  width={120}
                  height={120}
                  loading="lazy"
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
                <div>Quantity:{selectProduct.quantity}</div>
              </div>
            </div>
          </div>
        </DrawerSection>
      )}
    </div>
  );
}
