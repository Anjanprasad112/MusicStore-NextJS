import { NextRequest, NextResponse } from 'next/server';
import { connectToDataBase } from '@/lib/dbConnect';
import Music from '@/models/Music'; 

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDataBase(); 

        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }

        const musicEntry = await Music.findById(id);

        if (!musicEntry) {
            return NextResponse.json({ message: 'Music entry not found' }, { status: 404 });
        }

        return NextResponse.json(musicEntry, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching music:", error.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
