import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

interface Props {
  user: {
    email: string;
  };
}

const Dash: React.FC<Props> = ({ user }) => {
  const [greeting, setGreeting] = useState<string>("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const mailUsr = user.email;


  useEffect(() => {
    const getGreeting = async () => {
      let d = new Date();
      let hour = d.getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good Afternoon");
      } else if (hour >= 18 && hour < 20) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };
    
    getGreeting();
  }, []);
  console.log("usr email : ",user.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/lyrics", {
        title: title,
        lyrics: lyrics,
        userEmail: mailUsr
      });
      console.log("Response:", response.data);
      toast.success("Successfully Created");
    } catch (error: any) {
      console.error("Error submitting data:", error);
      toast.error("Failed to create lyrics");
    } finally {
      setLoading(false);
      setLyrics("");
      setTitle("");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-8">
        {greeting}, {user.email}
      </h1>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full max-w-lg"
      >
        <div className="bg-white p-4 rounded-lg shadow-lg w-full my-2">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Music Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="bg-white p-4 my-2 rounded-lg shadow-lg w-full">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Music Lyrics"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            rows={12}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 my-2"
        >
          {loading ? <Spinner /> : "Submit"}
        </button>
        <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 my-2">
          <Link href={`/viewall`}>View All</Link>
        </div>
      </form>
    </div>
  );
};

export default Dash;
