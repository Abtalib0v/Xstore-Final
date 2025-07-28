import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DrawerSection from "../Drawer";
import AddToCartButton from "@/components/ui/addToCartButton";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAPi } from "@/app/http/api";
import { useCart } from "@/app/Providers/CardProviders";

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
  price: number;
  categories: string;
  imageUrl: string;
  addToCart: () => void;
}) => {
  const params = useParams();
    const {data}=useQuery({
        queryKey:["product",params.id],
        queryFn:()=>getAPi(`/products/${params.id}`)
    })
     const { truncateText} = useCart();
    
  // const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  // const [selectProduct, setSelectProduct] = useState<any>(null);

  // const handleAddCard = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   addToCart();
  //   setSelectProduct({ id, name, price, imageUrl });
  //   setOpenDrawer(true); // drawerı aç
  // };

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
                  <div className="font-medium">{truncateText(name)}</div>
                  <div>{star}</div>
                  <div>{price}</div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link><AddToCartButton
  id={id}
  name={name}
  price={price}
  imageUrl={imageUrl}
/>
    </div>
  );
};

export default Card;
