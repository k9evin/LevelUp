import { Chapter, Course, Unit } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const GalleryCourseCard = async ({ course }: Props) => {
  return (
    <Card>
      <div className="relative">
        <Link
          href={`/course/${course.id}/0/0`}
          className="relative block w-fit"
        >
          <Image
            src={course.image || ''}
            width={400}
            height={200}
            alt="course image"
            className="object-cover rounded-t-lg "
          />
          <span className="absolute px-2 py-1 text-white capitalize rounded-md bg-black/60 w-fit bottom-2 left-2 right-2">
            {course.name}
          </span>
        </Link>
        <div className="p-4">
          <h4 className="text-secondary-foreground/60 mb-2">Units</h4>
          <div className="space-y-2">
            {course.units.map((unit, unitIndex) => {
              return (
                <Link
                  href={`/course/${course.id}/${unitIndex}/0`}
                  className="block w-fit underline text-base hover:text-black/70"
                  key={unit.id}
                >
                  {unit.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GalleryCourseCard;
