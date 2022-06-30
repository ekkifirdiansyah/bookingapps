const express = require("express");
const imageController = require("../controller/imageController");
const itemController = require("../controller/itemController");
const { uploadMultiple, uploadSingle } = require("../middleware/multer");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post(
  "/create",
  uploadMultiple,
  auth,
  checkRole("admin"),
  itemController.addItem
);
router.get("/read", itemController.viewItem);
router.patch(
  "/update/:id",
  auth,
  checkRole("admin"),
  itemController.updateItem
);
router.delete(
  "/delete/:id",
  auth,
  checkRole("admin"),
  itemController.deleteItem
);

// add image  id = itemId._id
router.post(
  "/add-image/:id",
  uploadSingle,
  auth,
  checkRole("admin"),
  imageController.addImageItem
);

// delete image
router.delete(
  "/delete-image/:itemId/:id",
  auth,
  checkRole("admin"),
  imageController.deleteImageItem
);

module.exports = router;
