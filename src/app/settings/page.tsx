import SubscriptionButton from '@/components/SubscriptionButton';
import { checkSubscription } from '@/lib/subscription';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const SettingsPage = async (props: Props) => {
  const isPremium = await checkSubscription();
  return (
    <div className="p-8 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Subscription</h1>
      {isPremium ? <p>You are a premium user.</p> : <p>You are a free user.</p>}

      <SubscriptionButton isPremium={isPremium} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Subscription Perks</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Free User</CardTitle>
              <CardDescription className="text-gray-600">
                Basic features for getting started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Access to basic course creation tools</li>
                <li>Limited course customization options</li>
                <li>Basic analytics and reporting</li>
                <li>Community support</li>
              </ul>
              <p className="mt-4 text-lg font-bold text-gray-800">$0/month</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Premium User
              </CardTitle>
              <CardDescription className="text-gray-600">
                Advanced features for enhanced experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Full access to advanced course creation tools</li>
                <li>Unlimited course customization options</li>
                <li>Advanced analytics and reporting</li>
                <li>Priority support</li>
                <li>Exclusive content and updates</li>
              </ul>
              <p className="mt-4 text-lg font-bold text-gray-800">
                $19.99/month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
