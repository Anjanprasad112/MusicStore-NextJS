"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Dash from '@/components/dashComp/page';

interface User {
  email: string;
  // Add other properties as needed
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get('/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Pass user as props to Dash */}
      <Dash user={user} />
    </div>
  );
}
