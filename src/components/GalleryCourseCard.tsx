import { Chapter, Course, Unit } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

export default function GalleryCourseCard({ course }: Props) {
  return (
    <Card className="flex flex-row overflow-hidden">
      <div className="w-1/3 relative">
        <Link href={`/course/${course.id}/0/0`} className="block h-full">
          <Image
            src={course.image || '/placeholder.svg?height=400&width=300'}
            alt="course image"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className="w-2/3 p-6">
        <h3 className="text-2xl font-semibold mb-4">{course.name.toUpperCase()}</h3>
        <h4 className="text-secondary-foreground/60 mb-2">Units</h4>
        <div className="space-y-2">
          {course.units.map((unit, unitIndex) => (
            <Link
              key={unit.id}
              href={`/course/${course.id}/${unitIndex}/0`}
              className="block w-fit text-primary hover:underline"
            >
              {unit.name}
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
