import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useCart } from "@/app/_Providers/CardProviders";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoX } from "react-icons/go";

type DrawerSectionProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode;
  product?: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity?: number;
  } | null;
};

export default function QuickShop({
  open,
  setOpen,
  children,
  product,
}: DrawerSectionProps) {
  const { addToCart } = useCart();

  return (
    <div className="flex z-10 overflow-hidden">
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 370 }}
          role="presentation"
          className="py-[20px] px-[30px] flex flex-col h-full overflow-hidden"
        >
          <div className="flex items-center justify-between mb-[6px]">
            <h1 className="text-[18px] font-bold">Quick Shop</h1>
            <Button
              onClick={() => setOpen(false)}
              className="bg-transparent text-[#444] shadow-none hover:bg-transparent"
            >
              <GoX className="text-[20px]" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {!product ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500 mb-[20.02px]">No product selected.</p>
                <Link
                  href="/shop"
                  className="rounded-[50px] px-[30.8px] py-[10.5px] bg-[#2a74ed] text-[16px] text-[#ffffff]"
                >
                  Return To Shop
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-start">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="w-[120px] h-[120px] object-cover rounded-md"
                  />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="font-semibold text-[16px] text-[#121212]">
                      {product.name}
                    </div>
                    <div className="text-[15px]">${product.price}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => {
                      addToCart({
                        _id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        quantity: product.quantity || 1,
                      });
                      setOpen(false);
                    }}
                    className="bg-[#2a74ed] hover:bg-[#000000] text-white py-[10px] rounded-full font-medium"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
