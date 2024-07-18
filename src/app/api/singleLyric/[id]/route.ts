// pages/api/singleLyric/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDataBase } from '@/lib/dbConnect';
import Music from '@/models/Music'; // Adjust import path as per your project structure

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDataBase(); // Ensure database connection is established
        
        const { id } = req.query;
        console.log("this is id ",id);
        // Validate if ID is provided
        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        // Fetch the music entry by ID using Mongoose model
        const musicEntry = await Music.findById(id);

        // Check if music entry exists
        if (!musicEntry) {
            return res.status(404).json({ message: 'Music entry not found' });
        }

        // Return the found music entry as JSON response
        res.status(200).json(musicEntry);

    } catch (error:any) {
        console.error("Error fetching music:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
