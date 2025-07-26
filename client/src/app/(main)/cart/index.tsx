import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DrawerSection from "../Drawer";

const Card = ({
  item,
  id,
  idx,
  name,
  star,
  price,
  categories,
  imageUrl,
  addToCart,
}: {
  item: any;
  id: any;
  idx: number;
  name: string;
  star: string;
  price: string;
  categories: string;
  imageUrl: string;
  addToCart: () => void;
}) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<any>(null);

  const handleAddCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    addToCart();
    setSelectProduct({ id, name, price, imageUrl });
    setOpenDrawer(true); // drawerı aç
  };

  return (
    <div>
      <Link href={`/detail/${id}`}>
        <div className="w-full py-4 flex justify-center">
          <div className="group">
            <div className="mx-0 flex w-full">
              <div>
                <div className="p-[15px] flex flex-col z-20 hover:scale-105 hover:shadow-[0px_0px_11px_1px_rgba(0,_0,_0,_0.1)] duration-300 bg-white border border-[#e1e1e1] rounded-[20px]">
                  <div className="flex flex-col object-cover aspect-square items-center justify-center rounded-xl">
                    <img
                      className="w-[345px] flex object-cover"
                      src={imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="font-medium">{name}</div>
                  <div>{star}</div>
                  <div>{price}</div>
                  <Button onClick={handleAddCard} variant="outline">
                    <ShoppingBag />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Drawer gösterme */}
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
};

export default Card;
