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
                <div className="p-[15px] flex flex-col z-20  bg-white border border-[#e1e1e1] rounded-[20px]">
                  <div className="flex flex-col object-cover aspect-square items-center justify-center rounded-xl">
                    <img
                      className="w-[345px] flex object-cover"
                      src={imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="font-medium">{truncateText(name)}</div>
                  <div className="flex">
                    {Array.from({ length: Number(star) || 0 }).map((_, i) => (
                      <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
                    ))}
                  </div>
                  <div>${price}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <AddToCartButton id={id} name={name} price={price} imageUrl={imageUrl} />
    </div>
//     <div className="border border-solid border-[#e5e5e5] rounded-[20px] px-[5px] pt-[5px] pb-[25px]">
//   <div className="relative group">
//     <img
//       src="https://xstore.8theme.com/elementor/demos/minimal-electronics/wp-content/uploads/sites/71/2022/02/28_1-1-366x366.jpeg"
//       alt=""
//     />
//     <div className="absolute top-[10px] right-[10px] opacity-0 transition-all group-hover:opacity-100">
//       <i className="ri-heart-line text-[18px]"></i>
//     </div>
//     <div className="absolute w-full bottom-[10px]">
//       <button className="transform translate-y-[60%] opacity-0 flex items-center p-10px bg-black text-white rounded-[20px] text-[18px] transition-all group-hover:transform group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible">
//         <i className="ri-eye-line"></i> Quick shop
//       </button>
//     </div>
//   </div>
//   <div className="flex flex-col items-center justify-center">
//     <h2 className="text-[#222222] text-[16px] font-medium mb-[15px]">
//       Amazon Echo Dot (3rd Gen) Smart
//     </h2>
//     <p className="mb-[10px] text-[#888888]">Brand 7</p>
//     <div className="stars">
//       <i className="ri-star-s-fill"></i>
//       <i className="ri-star-s-fill"></i>
//       <i className="ri-star-s-fill"></i>
//       <i className="ri-star-s-fill"></i>
//       <i className="ri-star-s-fill"></i>
//     </div>
//     <h3>$805.00</h3>
//     <button className="text-[16px] font-bold transform-none rounded">
//       Add to cart
//     </button>
//   </div>
// </div>
  );
};


export default Card;

