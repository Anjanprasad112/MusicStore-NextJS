"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Lyric = {
  _id: string;
  title: string;
  lyrics: string;
};

const Page = () => {
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await axios.get('/api/lyrics');
        setLyrics(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLyrics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lyrics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lyrics.map((item,index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition transform hover:scale-105"
            onClick={() => router.push(`/viewall/${item._id}`)}
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.lyrics.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
