import { connectToDataBase } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Music from '@/models/Music'; 
import { verifyAccessToken } from "@/utils/jwt";


export async function POST(req: NextRequest) {
  await connectToDataBase();

  try {
      const { title, lyrics, userEmail } = await req.json();
      const existingMusicTitle = await Music.findOne({ title });

      if (!existingMusicTitle) {
          const newMusic = new Music({ title, lyrics, userEmail });
          await newMusic.save();
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
        const accessToken = req.headers.get('authorization')?.split(' ')[1];
        if (!accessToken) {
          return new NextResponse('Unauthorized', { status: 401 });
        }
        const payload = verifyAccessToken(accessToken);
        console.log("this is payload : ",payload)
        const userEmail = payload.email
         const allMusic = await Music.find({userEmail});
         console.log("all music ", allMusic);
         return new NextResponse(JSON.stringify(allMusic),{status:200})
        
    } catch (error) {
        console.log(`this is err : `,error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}