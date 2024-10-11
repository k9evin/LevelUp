'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { CreditCard, LogOut, UserIcon } from 'lucide-react';
import UserAvatar from './UserAvatar';
import Link from 'next/link';

type Props = {
  user: User;
};

const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user?.name && <DropdownMenuLabel>{user.name}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CreditCard className="w-4 h-4 mr-2" />
          <Link href="/settings">Subscription</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            signOut();
          }}
          className="cursor-pointer text-red-500"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
