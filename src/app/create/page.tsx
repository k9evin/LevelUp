import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AlertCircle, InfoIcon, Terminal, Waves } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import React from 'react';
import CreateCourseForm from '@/components/CreateCourseForm';
import { checkSubscription } from '@/lib/subscription';

type Props = {};

const CreatePage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/gallery');
  }
  const isPremium = await checkSubscription();
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-5xl">
        Start Your Journey
      </h1>
      <Alert className="mt-5 w-full">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Start by entering a course title or the subject you wish to explore.
          Then, specify the particular units or topics you would like to include
          in your course. Our AI will craft a tailor-made course just for you,
          making the learning experience as personalized as possible.
        </AlertDescription>
      </Alert>
      <CreateCourseForm isPremium={isPremium} />
    </div>
  );
};

export default CreatePage;
