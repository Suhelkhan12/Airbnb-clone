import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import db from "@/utils/db";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const bookingId = session.metadata?.bookingId;

    if (session.status !== "complete" || !bookingId) {
      throw new Error("Something went wrong.");
    }

    await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        paymentStatus: true,
      },
    });
     return NextResponse.redirect(new URL("/bookings", req.url));
  } catch (err) {
    console.log(err);
    return Response.json(null, {
      status: 500,
      statusText: "Internal server error",
    });
  }
};
