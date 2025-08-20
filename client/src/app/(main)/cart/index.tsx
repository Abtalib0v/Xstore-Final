import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/ui/addToCartButton";
import { useCart } from "@/app/_Providers/CardProviders";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAPi } from "@/app/_http/api";
import { QueryKeys } from "@/app/_constant/QueryKeys";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
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
  viewMode, // 👈 eklenen prop
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
  viewMode: 'grid' | 'list';
}) => {
  const { truncateText } = useCart();
const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe not loaded");
      return;
    }
    const response = await fetch("/api/checkout-sessions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: [
          {
            name: name, // Replace with actual product name
            image: imageUrl, // Replace with actual image URL
            price: price, // Replace with actual price
            quantity: 1, // Adjust quantity as needed
          },
        ],
        returnUrl: window.location.origin,
      }),
    });
    if (!response.ok) {
      console.error("Failed to create checkout session");
      return;
    }
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
    if (result.error) {
      console.error("Stripe checkout error:", result.error.message);
    }
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: QueryKeys.products.All,
    queryFn: async () => await getAPi("/products"),
  });
  return (
    <div
      className={`border border-[#e1e1e1] rounded-[20px] overflow-hidden ${
        viewMode === 'list' ? 'flex 2xl:flex-row flex-col gap-4 p-[5]  h-[302]' : 'p-[5px] h-full pb-[25px]'
      } `}
    >
      {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    ) : (
      <>
      <div  className="w-full h-full">
        <div
          className={`${
            viewMode === 'list'
              ? 'flex 2xl:flex-row flex-col 2xl:items-center 2xl:gap-4 h-full'
              : 'flex flex-col items-center'
          } h-full`}
        >
          <Link
          href={`/detail/${id}`}
          prefetch
            className={`${
              viewMode === 'list'
                ? '2xl:max-w-[400px] 2xl:h-full'
                : 'w-full aspect-square'
            } h-full`}
          >
            <Image
              src={imageUrl}
              width={500}
              height={500}
              alt={imageUrl || "Blog Image"}
              loading="lazy"
              className="flex object-cover h-full rounded-xl"
            />
          </Link>

          <div
            className={`${
              viewMode === 'list' ? 'flex flex-col' : 'flex flex-col items-center  mt-4'
            } gap-[15px]`}
          >
            <Link href={`/detail/${id}`} className="font-medium">{truncateText(name)}</Link>
            <div className="text-sm text-gray-500">{categories}</div>
            <div className="flex">
              {Array.from({ length: Number(star) || 0 }).map((_, i) => (
                <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
              ))}
            </div>
            <div className="text-lg font-semibold">${price}</div>
            <div className={`${viewMode === 'list' ? 'self-center' : 'mt-4'}z-20`}>
              <AddToCartButton
          id={id}
          name={name}
          price={price}
          imageUrl={imageUrl}
        />
            </div>
            {/* <Button onClick={handleCheckout} variant="default">
            Buy Now
          </Button> */}
          </div>
        </div>
      </div>
      </>
    )}

      {/* Sepete Ekle */}
    </div>
  );
};
export default Card;

