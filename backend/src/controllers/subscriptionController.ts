import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe("your-stripe-secret-key", { apiVersion: "2022-11-15" });

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Premium Subscription" },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send("Error processing payment");
  }
};
