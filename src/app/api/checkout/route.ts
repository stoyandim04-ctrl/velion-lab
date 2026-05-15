// === Stripe Checkout Session — API route ===
// POST /api/checkout { planId: "foundation" | "complete" | "elite" }
// → връща { url } към Stripe Checkout. Ако STRIPE_SECRET_KEY липсва,
// връща mock URL към /checkout/success?demo=1 (за UI тестване).
//
// За пускане в реален режим:
//   1. npm install stripe
//   2. Сложи STRIPE_SECRET_KEY в .env.local
//   3. Декомментирай блока по-долу (createStripeSession)

import { NextResponse } from "next/server";
import { getPlan } from "@/lib/plans";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(request: Request) {
  let body: { planId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Невалидна заявка." },
      { status: 400 },
    );
  }

  const planId = body.planId;
  if (!planId) {
    return NextResponse.json(
      { error: "Липсва избран план." },
      { status: 400 },
    );
  }

  const plan = getPlan(planId);
  if (!plan) {
    return NextResponse.json(
      { error: "Непознат план." },
      { status: 400 },
    );
  }

  // === Реален Stripe режим ===
  if (STRIPE_SECRET_KEY) {
    try {
      const url = await createStripeSession({ plan, siteUrl: SITE_URL });
      return NextResponse.json({ url });
    } catch (err) {
      console.error("Stripe session error:", err);
      return NextResponse.json(
        { error: "Грешка при свързване със Stripe." },
        { status: 500 },
      );
    }
  }

  // === Demo режим — Stripe не е свързан ===
  // Връщаме URL към success страницата с demo flag, за да виждаш цялата
  // потребителска пътека без истинско плащане.
  const demoUrl = `${SITE_URL}/checkout/success?demo=1&plan=${plan.id}`;
  return NextResponse.json({ url: demoUrl, demo: true });
}

// === Истинско Stripe Checkout създаване ===
// Декомментирай след npm install stripe. Кода е готов и завършен.
async function createStripeSession({
  plan,
  siteUrl,
}: {
  plan: ReturnType<typeof getPlan> & object;
  siteUrl: string;
}): Promise<string> {
  // const Stripe = (await import("stripe")).default;
  // const stripe = new Stripe(STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
  //
  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   line_items: [
  //     {
  //       quantity: 1,
  //       price_data: {
  //         currency: "bgn",
  //         unit_amount: plan.price * 100, // в стотинки
  //         product_data: {
  //           name: `Velion Lab · ${plan.name}`,
  //           description: plan.tagline,
  //         },
  //       },
  //     },
  //   ],
  //   success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${siteUrl}/checkout/cancel`,
  //   metadata: { plan_id: plan.id },
  // });
  //
  // if (!session.url) throw new Error("Stripe session created without URL");
  // return session.url;

  // Placeholder докато не е инсталиран Stripe SDK
  throw new Error(
    "Stripe SDK не е инсталиран. Изпълни: npm install stripe и декомментирай кода в /api/checkout/route.ts",
  );
}
