import {Router} from "express";
import {UserController}from "../controller/user.controller";
import { VideoController } from "../controller/video.controller";
import { getTokens } from "./token/route.token.get-tokens";
import {upload} from "../utils/multer";

const router = Router();
const userController = new UserController()
const videoController = new VideoController()

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.get('/refresh', userController.refresh);
router.get('/tokens', getTokens);
router.post('/upload/:id', upload.single('file'), videoController.uploadVideo);
//router.get('/users/:id/videos', videoController.getUserVideos)
router.get('/remove/:id', videoController.deleteVideo);
router.get('/access/:id', videoController.getAccess);

    
export default router;