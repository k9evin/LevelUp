'use client';
import { cn } from '@/lib/utils';
import { Chapter, Question } from '@prisma/client';
import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { Card } from './ui/card';

type Props = {
  chapter: Chapter & {
    questions: Question[];
  };
};

const QuizCards = ({ chapter }: Props) => {
  const [answer, setAnswer] = React.useState<Record<string, string>>({});
  const [questionState, setQuestionState] = React.useState<
    Record<string, boolean | null>
  >({});

  const checkAnswer = React.useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.questions.forEach((question) => {
      const user_answer = answer[question.id];
      if (!user_answer) {
        return;
      }
      if (user_answer === question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }
      setQuestionState(newQuestionState);
    });
  }, [answer, chapter.questions, questionState]);

  return (
    <div className="flex-[1] mt-8 sm:ml-8">
      <h1 className="text-2xl font-bold">Pop Quiz</h1>
      <div className="mt-2">
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options) as string[];
          return (
            <Card
              key={question.id}
              className={cn('p-3 mt-4 border border-secondary rounded-lg', {
                'bg-green-100 border-green-500':
                  questionState[question.id] === true,
                'bg-red-100 border-red-500':
                  questionState[question.id] === false,
                'bg-secondary-foreground/10 border-secondary-foreground/10':
                  questionState[question.id] === null,
              })}
            >
              <h1 className="font-semibold">{question.question}</h1>
              <div className="mt-1">
                <RadioGroup
                  onValueChange={(e) => {
                    setAnswer((prev) => ({
                      ...prev,
                      [question.id]: e,
                    }));
                  }}
                >
                  {options.map((option, i) => {
                    return (
                      <div key={i} className="flex items-center mt-2 space-x-2">
                        <RadioGroupItem
                          value={option}
                          id={question.id + i.toString()}
                        />
                        <label
                          className="text-sm"
                          htmlFor={question.id + i.toString()}
                        >
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </Card>
          );
        })}
      </div>
      <Button className="w-full mt-2" size="lg" onClick={checkAnswer}>
        Check Answer
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default QuizCards;
