const express = require("express");
const ConnectDb = require("../db/ConnectDb");
const { addToCart, getCart } = require("../controllers/UserController");

ConnectDb();
const {
  getAllProducts,
  getAllSizes,
  getAllColors,
  getAllCategories,
  createProductSize,
  createProductColor,
  createProductCategory,
  createProduct,
  createOrder,
  getAllOrders,
  getAllOrdersInDashboard,
  updateOrderStatus,
  getCategoryById,
  getColorById,
  deleteAPiWithParams,
} = require("../controllers/ProductController");
const multer = require("multer");
const { storage } = require("../lib/cloudinaryConfig");
const { mongo, default: mongoose } = require("mongoose");
const { getProductById } = require("../controllers/ProductController");
const { authProtectMiddleware } = require("../middleware/authProtectMiddleware");
const { createOrderAfterPayment } = require("../controllers/ProductController");

const upload = multer({ storage: storage });  
const router = express.Router();

router.get("/products",  getAllProducts);

router.post("/product/create", upload.single("file"), createProduct);
// router.get("/products/sizes", getAllSizes);
// router.post("/products/create/size", createProductSize);
router.get("/products/colors", getAllColors);
router.get("/products/colors/:id",getColorById);
router.post("/products/create/color", createProductColor);
router.delete("/products/colors/:id", deleteAPiWithParams);
router.delete("/products/:id", deleteAPiWithParams);
router.post("/cart", authProtectMiddleware, addToCart);
router.get("/cart", authProtectMiddleware, getCart);


router.post("/products/create/category", createProductCategory);
router.get("/products/categories", getAllCategories);
router.get("/products/categories/:id",getCategoryById);
router.delete("/products/categories/:id", deleteAPiWithParams);
// router.post("/create/order", createOrder);
router.post("/create/order/after-payment", createOrderAfterPayment);

router.get("/orders", authProtectMiddleware, getAllOrders);
router.get("/admin/orders", authProtectMiddleware, getAllOrdersInDashboard);
router.patch("/orders/:id/status", updateOrderStatus);
router.get("/products/:id",  getProductById);

module.exports = router;
