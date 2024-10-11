import GalleryCourseCard from '@/components/GalleryCourseCard';
import { prisma } from '@/lib/db';
import React from 'react';

type Props = {};

const GalleryPage = async (props: Props) => {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div className="px-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {courses.map((course) => {
          return <GalleryCourseCard key={course.id} course={course} />;
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
