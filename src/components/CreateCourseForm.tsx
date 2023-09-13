'use client';
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { createChaptersSchema } from '@/validators/course';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Plus, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import SubscriptionAction from './SubscriptionAction';

type Props = {
  isPremium: boolean;
};

type Input = z.infer<typeof createChaptersSchema>;

const CreateCourseForm = ({ isPremium }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post('/api/course/createChapters', {
        title,
        units,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: '',
      units: ['', '', ''],
    },
  });

  const onSubmit = (data: Input) => {
    if (data.units.some((unit) => unit === '')) {
      toast({
        title: 'Error',
        description: 'Please fill out all the units.',
        variant: 'destructive',
      });
      return;
    }
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: 'Success',
          description: 'Course created successfully.',
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row my-2">
                <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                <FormControl className="flex-[6]">
                  <Input
                    placeholder="Enter a title of the course"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <AnimatePresence>
            {form.watch('units').map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  opacity: { duration: 0.15 },
                  height: { duration: 0.15 },
                }}
              >
                <FormField
                  control={form.control}
                  name={`units.${i}`}
                  key={i}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row my-2">
                      <FormLabel className="flex-1 text-xl">
                        {`Unit ${i + 1}`}
                      </FormLabel>
                      <FormControl className="flex-[6]">
                        <Input
                          placeholder="Enter a topic you want to explore"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                className="font-semibold mr-4"
                variant="secondary"
                onClick={() => {
                  form.setValue('units', [...form.getValues().units, '']);
                }}
              >
                Add Unit
                <Plus className="h-4 w-4 ml-2 text-green-500" />
              </Button>
              <Button
                type="button"
                className="font-semibold"
                variant="secondary"
                onClick={() => {
                  form.setValue('units', form.getValues().units.slice(0, -1));
                }}
              >
                Remove Unit
                <Trash className="h-4 w-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-4"
            size="lg"
            onClick={() => {
              if (isLoading) {
                toast({
                  title: 'Notificaiton 🔔',
                  description:
                    'It might take a few seconds to generate the course.',
                });
              }
            }}
          >
            Lets Go!
          </Button>
        </form>
      </Form>
      {!isPremium && <SubscriptionAction />}
    </div>
  );
};

export default CreateCourseForm;
