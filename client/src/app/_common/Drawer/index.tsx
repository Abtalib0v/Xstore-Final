import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useCart } from "@/app/_Providers/CardProviders";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoX } from "react-icons/go";

type DrawerSectionProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode;
  product?: any;
};

export default function DrawerSection({
  open,
  setOpen,
  children,
}: DrawerSectionProps) {
  const { getCartItems, removeFromCart, truncateText } = useCart();
  const cartItems = getCartItems();

  // Subtotal hesaplama
  const subtotal = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex z-10 overflow-hidden">
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 370 }}
          role="presentation"
          className="py-[20px] px-[30px] flex flex-col h-full overflow-hidden"
        >
          <h1 className="text-[18px] font-bold mb-[10px]">Cart Items</h1>
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500 mb-[20.02px]">
                  No products in the cart.
                </p>
                <Link
                  href="/shop"
                  className="rounded-[50px] px-[30.8px] py-[10.5px] bg-[#2a74ed] text-[16px] text-[#ffffff]"
                >
                  Return To Shop
                </Link>
              </div>
            ) : (
              cartItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 overflow-hidden border-b py-[20px] px-[12px] items-center hover:bg-[#f7f7f7] transition-all duration-200 ease-in-out relative group"
                >
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-[80px] h-[80px] object-cover rounded-md"
                  />
                  <div>
                    <div className="font-medium text-[14.56px]">
                      {truncateText(item.name, 23)}
                    </div>
                    <div className="flex gap-1.5 py-2 items-center text-gray-600 text-[13px]">
                      <p>{item.quantity}</p> × <div>${item.price}</div>
                    </div>
                    <div className="absolute right-[-50px] top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out group-hover:right-0">
                      <Button
                        className="bg-transparent shadow-none text-gray-600 hover:bg-transparent hover:shadow-none"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <GoX className=" text-[#444444] hover:text-[#000000]" />
                      </Button>
                    </div>
                  </div>
                  {/* <div className="ml-auto text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div> */}
                </div>
              ))
            )}
          </div>

          {/* Subtotal ve Checkout */}
          {cartItems.length > 0 && (
            <div>
              <div className="mt-auto py-[14px] border-t border-b flex flex-col gap-4 text-[#444444]">
                <div className="flex justify-between text-[14px] font-normal uppercase">
                  <span>Subtotal:</span>
                  <span className="text-[15.96px]">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-auto py-[14px] flex flex-col gap-4">
                <Link
                  href="/checkout"
                  className="bg-[#2a74ed] hover:bg-[#222222]  hover:opacity-[.8] transition-all duration-200 text-center text-white py-[10px] rounded-full font-medium"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </Box>
      </Drawer>
    </div>
  );
}
