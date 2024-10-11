// /api/course/createChapters

import { NextResponse } from 'next/server';
import { createChaptersSchema } from '@/validators/course';
import { ZodError } from 'zod';
import { strict_output } from '@/lib/gpt';
import { getUnsplashImage } from '@/lib/unsplash';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { checkSubscription } from '@/lib/subscription';

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse('unauthorized', { status: 401 });
    }
    const isPremium = await checkSubscription();
    if (!isPremium && session.user.credits < 1) {
      return new NextResponse('not enough credits', { status: 402 });
    }
    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];

    let output_units: outputUnits = await strict_output(
      'You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant YouTube videos for each chapter',
      new Array(units.length).fill(
        `Create a course about ${title}. For each unit, provide detailed chapter titles and YouTube search queries that yield informative educational videos.`
      ),
      {
        title: 'title of the unit',
        chapters:
          'an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object',
      }
    );

    const imageSearchTerm = await strict_output(
      'You are an AI capable of finding the most relevant image for a course',
      `Provide a good image search term for the title of a course about ${title}. This search term will be fed into the Unsplash API, ensuring it returns good results.`,
      {
        image_search_term: 'a good search term for the title of the course',
      }
    );

    const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );

    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
      },
    });

    const unitPromises = output_units.map(async (unit) => {
      const prismaUnit = await prisma.unit.create({
        data: {
          name: unit.title,
          courseId: course.id,
        },
      });
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => ({
          name: chapter.chapter_title,
          youtubeSearchQuery: chapter.youtube_search_query,
          unitId: prismaUnit.id,
        })),
      });
    });

    await Promise.all(unitPromises);

    if (!isPremium) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });
    }

    return NextResponse.json({ course_id: course.id });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse('invalid body', { status: 400 });
    }
    console.error(error);
    return new NextResponse('internal server error', { status: 500 });
  }
}
