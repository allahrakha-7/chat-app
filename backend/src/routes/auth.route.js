import express from 'express';

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("Sign Up Route");
});

router.get("/login", (req, res) => {
    res.send("Login Route");
});

router.get("/forget-password", (req, res) => {
    res.send("Forget Password Route");
});

export default router;