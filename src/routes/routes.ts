import {Router} from "express";
import {UserController}from "../controller/user.controller";
import { VideoController } from "../controller/video.controller";
import { authMiddleware } from "../middleware/auth.middleware";
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


router.post('/upload/:id', upload.single('file'), videoController.uploadVideo);
router.get('/users/:id/videos/', videoController.getVideos);
router.post('/video/:id', videoController.updateVideo);
router.get('/delete/:id', videoController.deleteVideo);
router.get('/users/:user_id/videos/:video_id/', videoController.stream)
router.get('/access/:id', videoController.getAccess);
router.post('/access/:id', videoController.setAccess)
    
export default router;