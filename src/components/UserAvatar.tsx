import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { User } from 'next-auth';

type Props = {
  user: User;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      <AvatarImage
        src={user?.image || undefined} 
        alt="user profile"
        referrerPolicy="no-referrer"
      />
      <AvatarFallback>User</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
