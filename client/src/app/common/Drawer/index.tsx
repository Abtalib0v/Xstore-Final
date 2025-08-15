import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useCart } from "@/app/Providers/CardProviders";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CheckoutPage from "@/app/(main)/checkout/page";
// import { removeFromCart } from "@/app/Providers/CardProviders";
type DrawerSectionProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode; // Buraya children ekledik
  product?: any; // Eğer product kullanıyorsan ekle
};
export default function DrawerSection({
  open,
  setOpen,
  children,
}: DrawerSectionProps) {
  const { getCartItems, removeFromCart, truncateText } = useCart();
  const cartItems = getCartItems();
  return (
    <div className="flex z-10">
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400 }} role="presentation" className="p-[20px]">
          <h1 className="text-[18px] font-bold mb-[10px]">Cart Items</h1>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center ">
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
                className="flex gap-4 border-b pb-4 mb-4 items-center"
              >
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-[80px] h-[80px] object-cover rounded-md"
                />
                <div>
                  <div className="font-semibold text-[13px]">
                    {truncateText(item.name, 30)}
                  </div>
                  <div className="flex gap-1.5 py-2 items-center text-gray-600 text-[13px]">
                    <p>{item.quantity}</p> ×<div>${item.price}</div>
                  </div>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
                <div className="ml-auto text-lg font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
              </div>
              
              
            ))
            
          ) || (
            <div className="flex flex-col items-center justify-center ">
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
          )}
          {
            <div className="flex flex-col gap-4">
              <Button variant="default" className="text-[#2a74ed]">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          }
          
          
        </Box>
      </Drawer>
    </div>
  );
}
