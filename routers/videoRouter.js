import express from "express";
import routes from "../routes";
import { uploadVideo } from "../middlewares";
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
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
