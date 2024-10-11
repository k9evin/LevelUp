'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useSession } from 'next-auth/react';
import SignInButton from './SignInButton';
import UserAccountNav from './UserAccountNav';
import { ThemeToggle } from './ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={200} height={50} />
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/gallery" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Explore
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {session?.user && (
                <NavigationMenuItem>
                  <Link href="/create" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Create Course
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </nav>
  );
}
