"use client";

import { useWishlist } from "@/app/_Providers/WishlistProvider";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type Props = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  withText?: boolean;
  onToggled?: (active: boolean) => void; // fires with the new active state
};

export default function WishlistButton({ id, name, price, imageUrl, className = "", withText = false, onToggled }: Props) {
  const { isInWishlist, toggle } = useWishlist();
  const active = isInWishlist(id);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // Block when not logged in (same behavior as Add to Cart)
    if (typeof window !== "undefined") {
      const hasUser = !!localStorage.getItem("user");
      if (!hasUser) {
        console.warn("Please login/register to use wishlist.");
        return;
      }
    }
    const nextActive = !active;
    toggle({ id, name, price, imageUrl });
    if (onToggled) onToggled(nextActive);
  };

  return (
    <Button
      onClick={onClick}
      className={className || "flex items-center gap-2 bg-transparent text-[#222] shadow-none hover:bg-transparent"}
    >
      {active ? <FaHeart className="text-[#2A74ED]" /> : <FaRegHeart />}
      {withText && (active ? "Wishlisted" : "Wishlist")}
    </Button>
  );
}
