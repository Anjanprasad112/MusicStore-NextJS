"use client";
import React, { useEffect, useState } from 'react';

interface Props {
  user: {
    email: string;
  };
}

const Dash: React.FC<Props> = ({ user }) => {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const getGreeting = async () => {
      let d = new Date();
      let hour = d.getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting('Good Morning');
      } else if (hour >= 12 && hour < 18) {
        setGreeting('Good Afternoon');
      } else if(hour >= 18 && hour<20){
        setGreeting('Good Evening');
      } else{
        setGreeting('Good Night');
      }
    };

    getGreeting();
  }, []);

  return (
    <div className='bg-black min-h-screen'>
      <h1 className='text-xl font-bold text-center text-white'>{greeting}, {user.email}</h1>
    </div>
  );
};

export default Dash;
