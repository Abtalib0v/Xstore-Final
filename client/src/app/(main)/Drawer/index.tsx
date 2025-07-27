import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useCart } from "@/app/Providers/CardProviders";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { removeFromCart } from "@/app/Providers/CardProviders";
type DrawerSectionProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode;  // Buraya children ekledik
  product?: any;               // Eğer product kullanıyorsan ekle
};
export default function DrawerSection({
    
  open,
  setOpen,
  children,
}: DrawerSectionProps) {

 const { getCartItems, removeFromCart } = useCart();
  const cartItems = getCartItems();
  return (
    <div className="flex z-10">
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400 }} role="presentation" className="p-[20px]">
          <h1 className="text-[18px] font-bold mb-[10px]">Cart Items</h1>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Sepetiniz boş</p>
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
                  <div className="font-semibold text-[13px]">{item.name}</div>
                  <div className="text-gray-600 text-[13px]">${item.price}</div>
                  <p>{item.quantity}</p>
                  <Button
            variant="destructive"
            size="icon"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash className="w-4 h-4" />
          </Button>
                </div>
              </div>
            ))
          )}
        </Box>
      </Drawer>
    </div>
  );
}
