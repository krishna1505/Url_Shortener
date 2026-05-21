import { Router } from "express";
import {
  postURLShortener,
  getShortenerPage,
  redirectToShortLink,
  getShortenerEditPage,
  postShortenerEditPage,
  deleteShortCode,
} from "../controllers/postshortener.controller.js";

const router = Router();

router.get("/", getShortenerPage);

router.post("/", postURLShortener);



router.route("/edit/:id").get(getShortenerEditPage).post(postShortenerEditPage);

router.route("/delete/:id").post(deleteShortCode);

router.get("/:shortCode", redirectToShortLink);

//default export
// export default router;

// Named exports
export const shortenerRoutes = router;
