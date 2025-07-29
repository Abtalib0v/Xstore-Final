// "use client";

// import { useCart } from "@/app/Providers/CardProviders";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function CartPage() {
//   const { cartItems, removeFromCart } = useCart();

//   const totalPrice = cartItems.reduce(
//     (total:any, item:any) => total + item.price * (item.quantity || 1),
//     0
//   );

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-gray-500">Your cart is empty.</div>
//       ) : (
//         <div className="space-y-6">
//           {cartItems.map((item:any) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between border-b pb-4"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <div className="font-medium">{item.name}</div>
//                   <div className="text-sm text-gray-600">
//                     ${item.price.toFixed(2)}
//                   </div>
//                 </div>
//               </div>
//               <Button
//                 variant="outline"
//                 className="text-red-600 border-red-400 hover:bg-red-50"
//                 onClick={() => removeFromCart(item._id)}
//               >
//                 Remove
//               </Button>
//             </div>
//           ))}

//           <div className="flex justify-between pt-6 border-t mt-6 text-lg font-bold">
//             <div>Total:</div>
//             <div>${totalPrice.toFixed(2)}</div>
//           </div>

//           <div className="pt-4 flex justify-end">
//             <Link href="/checkout">
//               <Button className="bg-green-600 hover:bg-green-700 text-white">
//                 Proceed to Checkout
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
