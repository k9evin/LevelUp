'use client';
import { cn } from '@/lib/utils';
import { Chapter } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useToast } from './ui/use-toast';
import { set } from 'zod';
import { Loader2 } from 'lucide-react';

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
  ({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {
    const { toast } = useToast();
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post('/api/chapter/getInfo', {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });

    const addChapterIdToSet = React.useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [setCompletedChapters, chapter.id]);

    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet();
      }
    }, [chapter.videoId, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }
        getChapterInfo(undefined, {
          onSuccess: () => {
            console.log('success');
            setSuccess(true);
            addChapterIdToSet();
          },
          onError: () => {
            console.log('error');
            setSuccess(false);
            toast({
              title: 'Error',
              description: 'There was an error loading the chapter.',
              variant: 'destructive',
            });
            addChapterIdToSet();
          },
        });
      },
    }));
    return (
      <div
        className={cn(
          {
            'bg-secondary': success === null,
            ' bg-green-500/80': success === true,
            'bg-red-500/80': success === false,
          },
          'px-4 py-2 mt-2 rounded flex justify-between'
        )}
        key={chapterIndex}
      >
        <h5>
          {chapter.name}
        </h5>
        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    );
  }
);

ChapterCard.displayName = 'ChapterCard';

export default ChapterCard;
