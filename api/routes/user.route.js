//if we write routes in index.js iw ould be long file to avoid this ..created thia folder
import express from "express";
import { test } from "../controllers/user.controller.js";

const router=express.Router();

router.get('/test',test)

export default router;