import { connectToDataBase } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Music from '@/models/Music';

export async function GET(req: NextRequest) {
    try {
        await connectToDataBase(); // Connect to your MongoDB database

        // Extract the ID parameter from the request query
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        // Validate if ID is provided
        if (!id) {
            return new NextResponse("Missing ID parameter", { status: 400 });
        }

        // Fetch the music entry by ID using your Mongoose model
        const musicEntry = await Music.findById(id);

        // Check if music entry exists
        if (!musicEntry) {
            return new NextResponse("Music entry not found", { status: 404 });
        }

        // Return the found music entry as JSON response
        return new NextResponse(JSON.stringify(musicEntry), { status: 200 });

    } catch (error: any) {
        console.error("Error fetching music:", error.message);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

