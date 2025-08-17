import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useCart } from "@/app/_Providers/CardProviders";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { removeFromCart } from "@/app/Providers/CardProviders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/app/_features/Login/components/LoginForm";
import RegisterForm from "@/app/_features/Register/components/RegisterForm";
import { FaRegUser } from "react-icons/fa6";
type DrawerSectionProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode;
};
export default function AccountDrawerSection({
  open,
  setOpen,
  children,
}: DrawerSectionProps) {
  const { getCartItems, removeFromCart, truncateText } = useCart();
  const cartItems = getCartItems();
  return (
    <div className="flex z-10">
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
       <Tabs defaultValue="account" className="w-[400px] px-[30px] py-[20px]">
        <div className="flex items-center justify-center text-[#444444] border-b gap-1 mb-[15px] pb-[15px]">
            
                    <FaRegUser size={23} />
                    <h1 className="text-[23px]">SIGN IN</h1>

        </div>
  <TabsList className="flex w-full bg-white rounded-none border-b border-black/20">
  
    <TabsTrigger
      className=" rounded-none text-[14px] border-0 border-b-2 !shadow-none border-transparent data-[state=active]:border-black px-[5px] pb-[10px]"
      value="account"
    >
      LOGIN
    </TabsTrigger>
    <TabsTrigger
      className="  rounded-none border-0 border-b-2 !shadow-none border-transparent data-[state=active]:border-black px-[5px] pb-[10px]"
      value="password"
    >
      REGISTER
    </TabsTrigger>
  </TabsList>

  <TabsContent value="account">
    <LoginForm/>
  </TabsContent>
  <TabsContent value="password">
    <RegisterForm/>
  </TabsContent>
</Tabs>
      </Drawer>
    </div>
  );
}
