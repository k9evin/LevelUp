import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

const settingsUrl = process.env.NEXTAUTH_URL + '/settings';

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // cancel at the billing portal
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // first time subscription
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      billing_address_collection: 'auto',
      customer_email: session.user.email ?? '',
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'LevelUp Premium',
              description: 'Get your unlimited course generation!',
            },
            unit_amount: 1999,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('[STRIPE ERROR]', error);
    return new NextResponse('internal server error', { status: 500 });
  }
}
