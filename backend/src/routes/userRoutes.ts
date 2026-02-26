import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";



router.post("/sync", requireAuth(), async (req, res) => {
  const { userId } = req.auth;
  ...
});
