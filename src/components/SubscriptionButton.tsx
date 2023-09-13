'use client';
import React from 'react';
import { Button } from './ui/button';
import axios from 'axios';

type Props = {
  isPremium: boolean;
};

const SubscriptionButton = ({ isPremium }: Props) => {
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      console.log('stripe billing error', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button className="mt-4" disabled={loading} onClick={handleSubscribe}>
      {isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}
    </Button>
  );
};

export default SubscriptionButton;
