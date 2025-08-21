import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoX } from "react-icons/go";
import { useWishlist } from "@/app/_Providers/WishlistProvider";
import { useCart } from "@/app/_Providers/CardProviders";

export type WishlistDrawerProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function WishlistDrawer({ open, setOpen }: WishlistDrawerProps) {
  const { items, remove, clear } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    items.forEach((p) => {
      addToCart({ _id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, quantity: 1 });
    });
  };

  return (
    <div className="flex z-10 overflow-hidden">
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 370 }} role="presentation" className="py-[20px] px-[30px] flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-[6px]">
            <h1 className="text-[18px] font-bold">Wishlist</h1>
            <Button onClick={() => setOpen(false)} className="bg-transparent text-[#444] shadow-none hover:bg-transparent">
              <GoX className="text-[20px]" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500 mb-[20.02px]">No products in your wishlist.</p>
                <Link href="/shop" className="rounded-[50px] px-[30.8px] py-[10.5px] bg-[#2a74ed] text-[16px] text-[#ffffff]">Return To Shop</Link>
              </div>
            ) : (
              items.map((p) => (
                <div key={p.id} className="flex gap-4 overflow-hidden border-b py-[16px] px-[12px] items-center">
                  <Image src={p.imageUrl} alt={p.name} width={80} height={80} className="w-[80px] h-[80px] object-cover rounded-md" />
                  <div className="flex-1">
                    <div className="font-medium text-[14.56px]">{p.name}</div>
                    <div className="text-[13px] text-gray-600">${p.price}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-[#2a74ed] hover:bg-[#000000] text-white h-8 rounded-full px-3"
                      onClick={() => addToCart({ _id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, quantity: 1 })}
                    >
                      Add
                    </Button>
                    <Button className="bg-transparent text-gray-600 hover:bg-transparent h-8 px-3" onClick={() => remove(p.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="mt-auto py-[14px] flex flex-col gap-3">
              <div className="flex gap-3">
                <Button onClick={handleAddAllToCart} className="bg-[#2a74ed] hover:bg-[#000000] text-white rounded-full w-full">
                  Add all to Cart
                </Button>
                <Button onClick={clear} className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-full">
                  Clear All
                </Button>
              </div>
              <Link href="/wishlist" className="text-center text-[#2a74ed] hover:underline">
                Go to Wishlist
              </Link>
            </div>
          )}
        </Box>
      </Drawer>
    </div>
  );
}
