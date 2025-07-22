const express = require("express");
const ConnectDb = require("../db/ConnectDb");
ConnectDb();
const {
  getAllblogs,
  getAllCategories,
  createBlogCategory,
  createBlog,
  createOrder,
  getAllOrders,
  getAllOrdersInDashboard,
  updateOrderStatus,
  getCategoryById,
  deleteAPiWithParams,
  getAllBlogs,
} = require("../controllers/BlogController");
const multer = require("multer");
const { storage } = require("../lib/cloudinaryConfig");
const { mongo, default: mongoose } = require("mongoose");
const { getBlogById } = require("../controllers/BlogController");
// const {
//   authProtectMiddleware,
// } = require("../middleware/authProtectMiddleware");
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/blogs",  getAllBlogs);

router.post("/blog/create", upload.single("file"), createBlog);
// router.get("/blogs/sizes", getAllSizes);
// router.post("/blogs/create/size", createblogsize);
router.delete("/blogs/:id", deleteAPiWithParams);

router.post("/blogs/create/category", createBlogCategory);
router.get("/blogs/categories", getAllCategories);
router.get("/blogs/categories/:id",getCategoryById);
router.delete("/blogs/categories/:id", deleteAPiWithParams);
// router.post("/create/order", createOrder);
// router.get("/orders", getAllOrders);
// router.get("/admin/orders", authProtectMiddleware, getAllOrdersInDashboard);
router.patch("/orders/:id/status", updateOrderStatus);
router.get("/blogs/:id",  getBlogById);

module.exports = router;
