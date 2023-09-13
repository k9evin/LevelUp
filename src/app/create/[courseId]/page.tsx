import ConfirmChapters from '@/components/ConfirmChapters';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    courseId: string;
  };
};

const createChapters = async ({ params: { courseId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/gallery');
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect('/create');
  }

  return (
    <div className="flex flex-col items-start mx-auto max-w-xl my-18 p-4">
      <h5 className="text-sm uppercase text-secondary-foreground/60">
        Course Name
      </h5>
      <h1 className="text-4xl font-bold sm:text-5xl">{course.name}</h1>
      <Alert className="mt-4 w-full">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Please review the chapters generated for each of your units. Once
          you&apos;ve done that, simply click the &apos;Save and Continue&apos; button to proceed.
        </AlertDescription>
      </Alert>
      <ConfirmChapters course={course} />
    </div>
  );
};

export default createChapters;
