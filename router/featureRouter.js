const express = require("express");
const featureController = require("../controller/featureController");
const { uploadSingle } = require("../middleware/multer");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post(
  "/create",
  uploadSingle,
  auth,
  checkRole("admin"),
  featureController.addFeature
);
router.get("/read", auth, featureController.viewFeature);
router.patch(
  "/update/:id",
  uploadSingle,
  auth,
  checkRole("admin"),
  featureController.updateFeature
);
router.delete(
  "/delete/:id",
  auth,
  checkRole("admin"),
  featureController.deleteFeature
);

module.exports = router;
