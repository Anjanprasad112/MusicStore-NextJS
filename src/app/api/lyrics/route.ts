import { connectToDataBase } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Music from '@/models/Music';

export async function POST(req: NextRequest) {
  await connectToDataBase();

  const { title, lyrics } = await req.json();

  try {
    const existingMusicTitle = await Music.findOne({ title });

    if (!existingMusicTitle) {
      const newLyrics = new Music({ title, lyrics });
      await newLyrics.save();
      return new NextResponse("Successfully created", { status: 201 });
    }

    return new NextResponse("Title already present", { status: 401 });
  } catch (error: any) {
    console.error("Error creating lyrics:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest){
    try {
        await connectToDataBase();
         const allMusic = await Music.find({});
         return new NextResponse(JSON.stringify(allMusic),{status:200})
        
    } catch (error) {
        console.log(`this is err : `,error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}