import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Checkout Session'ı çek ve line_items içindeki product'ları expand et
    const session = await stripe.checkout.sessions.retrieve(orderId, {
      expand: ["line_items.data.price.product"],
    });

    // Ürünleri map et, eğer product objesi gelmezse Stripe API’dan al
    const products = await Promise.all(
      session.line_items?.data.map(async (item) => {
        let productObj: Stripe.Product | null = null;

        if (typeof item.price?.product === "string") {
          productObj = await stripe.products.retrieve(item.price.product);
        } else {
          productObj = item.price?.product as Stripe.Product;
        }

        return {
          name: item.description,
          quantity: item.quantity,
          price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
          image: productObj?.images?.[0] || "",
        };
      }) || []
    );

    return NextResponse.json({
      status: session.payment_status,
      email: session.customer_details?.email || "",
      products,
    });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
