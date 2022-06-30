const express = require("express");
const CustomerController = require("../controller/CustomerController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post(
  "/create",
  auth,
  checkRole("admin"),
  CustomerController.addCustomer
);
router.get("/read", auth, CustomerController.viewCustomer);
router.patch(
  "/update/:id",
  auth,
  checkRole("admin"),
  CustomerController.updateCustomer
);
router.delete(
  "/delete/:id",
  auth,
  checkRole("admin"),
  CustomerController.deleteCustomer
);

module.exports = router;
