const express = require("express");
const infoController = require("../controller/infoController");
const { uploadSingle } = require("../middleware/multer");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post(
  "/create",
  uploadSingle,
  auth,
  checkRole("admin"),
  infoController.addInfo
);
router.get("/read", auth, infoController.viewInfo);
router.patch(
  "/update/:id",
  uploadSingle,
  auth,
  checkRole("admin"),
  infoController.updateInfo
);
router.delete(
  "/delete/:id",
  auth,
  checkRole("admin"),
  infoController.deleteInfo
);

module.exports = router;
