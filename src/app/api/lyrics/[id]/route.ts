import { NextRequest, NextResponse } from 'next/server';
import { connectToDataBase } from '@/lib/dbConnect';
import Music from '@/models/Music'; // Adjust import path as per your project structure

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDataBase(); // Ensure database connection is established

        const { id } = params;
        console.log("this is id ", id);

        // Validate if ID is provided
        if (!id) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }

        // Fetch the music entry by ID using Mongoose model
        const musicEntry = await Music.findById(id);

        // Check if music entry exists
        if (!musicEntry) {
            return NextResponse.json({ message: 'Music entry not found' }, { status: 404 });
        }

        // Return the found music entry as JSON response
        return NextResponse.json(musicEntry, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching music:", error.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
