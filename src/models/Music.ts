import mongoose, { Schema, Document, Model } from 'mongoose';

interface IMusic extends Document {
    title: string;
    lyrics: string;
}

const MusicSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    lyrics: { type: String, required: true },
});

const Music: Model<IMusic> = mongoose.models.Music || mongoose.model<IMusic>('Music', MusicSchema);

export default Music;