import { stripe } from "@/lib/stripe";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {itemIds} = req.body

  if(req.method !== 'POST') {
    return res.status(405).json({error: "Method not allowed."})
  }

  if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
    return res.status(400).json({ error: "Price not found." })
  }

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancel_url = `${process.env.NEXT_URL}`

  try {
    const lineItems = itemIds.map(item => ({
      price: item.priceId,
      quantity: item.quantity
    }))

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url,
      cancel_url,
      mode: 'payment',
      line_items: lineItems,
    })

    return res.status(201).json({
      checkoutUrl: checkoutSession.url
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create checkout session." });
  }
}