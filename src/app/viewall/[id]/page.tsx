"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Lyric = {
  id: number;
  title: string;
  lyrics: string;
};

const LyricPage = () => {
  const { id } = useParams();
  const [lyric, setLyric] = useState<Lyric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchLyric = async () => {
      

      try {
        const response = await axios.get(`/api/lyrics/${id}`);
        setLyric(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLyric();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
  if (!lyric) return <div className="flex items-center justify-center h-screen">Lyric not found</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">{lyric.title}</h1>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{lyric.lyrics}</p>
      </div>
    </div>
  );
};

export default LyricPage;
