import express from "express";

import publisherRoute from "./publishers";
import topicRoute from "./topics";
import userRoute from "./users";

const router = express.Router();

router.use("/publisher", publisherRoute);
router.use("/topic", topicRoute);
router.use("/user", userRoute);

export default router;
