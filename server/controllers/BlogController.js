const BlogSchema = require("../Models/Blog/BlogSchema");
const BlogCategorySchema = require("../Models/Blog/BlogCategorySchema");
// const UserSchema = require("../models/User/UserSchema");
// const OrderSchema = require("../models/Order/OrderSchema");

const getAllBlogs = async (req, res) => {
  const blogs = await BlogSchema.find()
    .populate("categories")
    // .populate("star")
    // .populate("colors");
  if (!blogs || blogs.length === 0) {
    return res.status(404).json({
      message: "No blogs found",
    });
  }
  return res.status(200).json({
    data: blogs,
  });
};
const getAllCategories = async (req, res) => {
  const categories = await BlogCategorySchema.find();
  if (!categories || categories.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json({
    data: categories,
  });
};
const getCategoryById = async (req, res) => {
  const id = req.params.id;
  const category = await BlogCategorySchema.findById(id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  return res.json(category);
};
const getBlogById = async (req, res) => {
  const id = req.params.id;
  const blog = await BlogSchema.findById(id);
  if (!blog) {
    return res.status(404).json({ message: 'blog not found' });
  }
  return res.json(blog);
};
const deleteAPiWithParams = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const deletedFunction =  (await BlogCategorySchema.findByIdAndDelete(id)) || (await BlogSchema.findByIdAndDelete(id));
    if (!deletedFunction) {
      return res.status(404).json({ message: "not found" });
    }
    return res.status(204).json({ message: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createBlogCategory = async (req, res) => {
  const { name } = req.body;
  const exsistingCategory = await BlogCategorySchema.findOne({
    name: name,
  });
  if (exsistingCategory) {
    return res.status(400).json({
      message: "Category already exists",
    });
  }
  const newCategory = new BlogCategorySchema({
    name: name,
  });
  await newCategory.save();
  return res.status(201).json({
    message: "Category created successfully",
    data: newCategory,
  });
};

const createBlog = async (req, res) => {
  const { name, description, categories,createdAt } =
    req.body;
  const exsistingBlog = await BlogSchema.findOne({ name: name });
  if (exsistingBlog) {
    return res.status(400).json({
      message: "Blog already exists",
    });
  }
  const newBlog = new BlogSchema({
    name: name,
    description: description,
    imageUrl: req.file.path ,
    categories: categories,
    createdAt: createdAt
  });
  await newBlog.save();
  return res.status(201).json({
    message: "Blog created successfully",
    data: newBlog,
  });
};

const createOrder = async (req, res) => {
  const { user, blogs, totalAmount, status, address } = req.body;
  try {
    const foundUser = await UserSchema.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const blogIds = blogs.map((blog) => blog.blog);
    const foundBlogs = await BlogSchema.find({
      _id: { $in: blogIds },
    });
    if (!foundBlogs || foundBlogs.length !== blogIds.length) {
      return res
        .status(404)
        .json({ message: "One or more blogs not found" });
    }
    const newOrder = new OrderSchema({
      user: user,
      blogs: blogs,
      totalAmount: totalAmount,
      status: status || "pending",
      address: address,
    });
    await newOrder.save();
    return res.status(201).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  const userId = req.query.user;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const orders = await OrderSchema.find({ user: userId })
      .populate("user")
      .populate("blogs.blog");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    return res.status(200).json({
      data: orders,
      message: "User's orders fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllOrdersInDashboard = async (req, res) => {
  try {
    const orders = await OrderSchema.find()
      .populate("user")
      .populate("blogs.blog");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json({
      data: orders,
      message: "All orders fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  try {
    const order = await OrderSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order status updated", data: order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllBlogs,
  createOrder,
  getAllCategories,
  createBlogCategory,
  createBlog,
  getAllOrders,
  getAllOrdersInDashboard,
  updateOrderStatus,
  getCategoryById,
  getBlogById,
  deleteAPiWithParams,
};
