import { getAlbums,createAlbum,deleteAlbum,updateAlbum, } from "../controllers/albumController.js";
import express from 'express';
import { images } from '../middleware/upload.js';

const router = express.Router();
router.get('/album-getall',getAlbums); 

router.post("/album-post", images.array("images", 10), createAlbum);
router.patch('/album/:id', images.array('images', 10), updateAlbum);
router.delete('/album/:id',deleteAlbum );

export default router;