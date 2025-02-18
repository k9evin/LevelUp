import { prisma } from '@/lib/db';
import { strict_output } from '@/lib/gpt';
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from '@/lib/youtube';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      return NextResponse.json(
        { success: false, error: 'Chapter not found' },
        { status: 404 }
      );
    }

    const videoId = await searchYoutube(chapter.youtubeSearchQuery);
    let transcript = await getTranscript(videoId);
    let max_length = 500;
    transcript = transcript.split(' ').slice(0, max_length).join(' ');

    const { summary }: { summary: string } = await strict_output(
      'You are an AI capable of summarising a youtube transcript',
      'Summarise the provided transcript in 250 words or less, focusing solely on the main content. Exclude any mentions of sponsors, unrelated topics, or introductory phrases. Ensure the summary is concise and directly related to the core subject matter.\n' +
        transcript,
      { summary: 'summary of the transcript' }
    );

    const questions = await getQuestionsFromTranscript(
      transcript,
      chapter.name
    );

    const questionData = questions.map((question) => {
      let options = [
        question.answer,
        question.option1,
        question.option2,
        question.option3,
      ];
      options = options.sort(() => Math.random() - 0.5);
      return {
        question: question.question,
        answer: question.answer,
        options: JSON.stringify(options),
        chapterId: chapterId,
      };
    });

    await prisma.$transaction([
      prisma.question.createMany({ data: questionData }),
      prisma.chapter.update({
        where: { id: chapterId },
        data: { videoId, summary },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'invalid body' },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'internal server error' },
        { status: 500 }
      );
    }
  }
}
