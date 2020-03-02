import express from "express";
import routes from "../routes";
import { uploadVideo, onlyPriveate } from "../middlewares";
import {
    videoDetail,
    getEditVideo,
    deleteVideo,
    getUpload,
    postUpload,
    postEditVideo
} from "../controllers/videoController";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, onlyPriveate, getUpload);
videoRouter.post(routes.upload, onlyPriveate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPriveate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPriveate, postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPriveate, deleteVideo);

export default videoRouter;
