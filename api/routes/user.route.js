//if we write routes in index.js iw ould be long file to avoid this ..created thia folder
import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();

router.get('/test',test)
router.post('/update/:id',verifyToken,updateUser)

export default router;