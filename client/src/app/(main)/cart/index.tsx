import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/ui/addToCartButton";
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
  const { truncateText } = useCart();

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
                  <div className="flex">{Array.from({ length: Number(star) || 0 }).map((_, i) => (
              <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
            ))}</div>
                  <div>${price}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <AddToCartButton
        id={id}
        name={name}
        price={price}
        imageUrl={imageUrl}
      />
    </div>
  );
};

export default Card;