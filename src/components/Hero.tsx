import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Hero = ({}) => {
  return (
    <div className="px-6 lg:px-8 h-[calc(100vh-64px)] overflow-auto flex flex-col justify-center items-center">
      <div className="mx-auto max-w-2xl py-20">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-lg py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            <span>The new experience of learning 🚀</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Introducing
            <br />
            <span className="text-purple-600">LevelUp, </span>
            <br /> the next-generation AI-powered learning platform.
          </h1>
          <Link href="https://github.com/k9evin/LevelUp" target="blank">
            <FaGithub className="inline-block w-8 h-8 mt-8 text-secondary-foreground/60 hover:text-gray-800 transition-all hover:-translate-y-[1px]" />
          </Link>
        </div>
      </div>
      <div className="relative z-10 mt-14 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg flex items-center">
            <img
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              alt="Jane Doe"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-700">
                "LevelUp has revolutionized the way I learn. The AI-powered
                features are incredibly helpful!"
              </p>
              <p className="mt-2 text-gray-500">- Jane Doe</p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg flex items-center">
            <img
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              alt="John Smith"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-700">
                "I love the interactive lessons and the community support.
                LevelUp is a game-changer!"
              </p>
              <p className="mt-2 text-gray-500">- John Smith</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
