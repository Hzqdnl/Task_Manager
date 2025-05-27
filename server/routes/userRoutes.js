import express from 'express';
import { isAdminRoute, protectRoute } from '../middlewares/authMiddlewares.js';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser)
// router.post('/login', loginUser)
// router.post('/logout', logoutUser)

// router.get('/get-team', protectRoute, isAdminRoute, getTeamList);
// router.get('/notifications', protectRoute, getNotificationList);

// router.put('/profile', protectRoute, updateUserProfile);
// router.put('/read-noti', protectRoute, markNotificationRead);
// router.put('/change-password', protectRoute, changeUserPassword);

// //for admin only - admin routes
// router
//     .route('/id')
//     .put(protectRoute, isAdminRoute, activateUserProfile)
//     .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;