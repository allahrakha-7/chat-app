import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);

router.get("/login", (req, res) => {
    res.send("Login Route");
});

router.get("/forget-password", (req, res) => {
    res.send("Forget Password Route");
});

export default router;