const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, AutherizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/create").post(isAuthenticatedUser,AutherizeRoles("admin"),createProduct);
router.route("/products/:id").get(getProductDetails)
.put(isAuthenticatedUser,AutherizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,AutherizeRoles("admin"),deleteProduct);

module.exports = router;
