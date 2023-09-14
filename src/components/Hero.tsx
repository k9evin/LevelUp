import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Hero = ({}) => {
  return (
    <div className="px-6 lg:px-8 h-[calc(100vh-64px)] overflow-auto">
      <div className="mx-auto max-w-2xl py-20">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-lg py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            <span>The new experience of learning 🚀</span>
          </div>
        </div>
        <div className="text-center mt-32 sm:mt-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Introducing
            <br />
            <span className="text-purple-600">LevelUp, </span>
            <br /> the next-generation AI-powered learning platform.
          </h1>
          <Link href="https://github.com/k9evin/LevelUp" target="blank">
            <FaGithub className="inline-block w-8 h-8 mt-8 text-secondary-foreground/60 hover:text-gray-800 transition-all hover:-translate-y-[1px] " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
