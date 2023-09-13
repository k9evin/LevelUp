import SubscriptionButton from '@/components/SubscriptionButton';
import { checkSubscription } from '@/lib/subscription';
import React from 'react';

type Props = {};

const SettingsPage = async (props: Props) => {
  const isPremium = await checkSubscription();
  return (
    <div className="p-8 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Subscription</h1>
      {isPremium ? <p>You are a premium user.</p> : <p>You are a free user.</p>}

      <SubscriptionButton isPremium={isPremium} />
    </div>
  );
};

export default SettingsPage;
