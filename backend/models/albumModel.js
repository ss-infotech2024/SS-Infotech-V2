import mongoose from 'mongoose';



const albumsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fullTitle: { type: String, required: true },
    color: { type: String, required: true },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumsSchema);




export default Album;